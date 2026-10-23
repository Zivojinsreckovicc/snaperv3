"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/components/hooks/use-reduced-motion";
import {
  ArrowClockwise,
  ArrowUpRight,
  ClosedCaptioning,
  Pause,
  Play,
  SpeakerHigh,
  SpeakerSlash,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/* Minimal slice of the YouTube IFrame Player API that this player uses. */
type YTPlayer = {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  getPlayerState(): number;
  getCurrentTime(): number;
  getDuration(): number;
  getIframe(): HTMLIFrameElement;
  setOption(module: string, option: string, value: object): void;
  destroy(): void;
};

type YTNamespace = {
  Player: new (
    el: HTMLElement,
    options: {
      videoId: string;
      host?: string;
      width?: string;
      height?: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: () => void;
        onStateChange?: (e: { data: number }) => void;
        onError?: () => void;
      };
    }
  ) => YTPlayer;
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const UNSTARTED = -1;
const ENDED = 0;
const PLAYING = 1;
const PAUSED = 2;
const BUFFERING = 3;

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve(window.YT!);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        apiPromise = null;
        reject(new Error("YouTube IFrame API failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

type Status = "idle" | "playing" | "paused" | "ended" | "error";

type InViewVideoProps = {
  youtubeId: string;
  title: string;
  poster: string;
  className?: string;
};

/**
 * YouTube player that plays only while it is on screen. It autoplays with
 * sound once at least half of it is visible and pauses as soon as it is not.
 * Browsers block unmuted autoplay until the visitor has interacted with the
 * page, so in that case it falls back to muted playback with a "Tap for
 * sound" prompt and unmutes on the visitor's next click. YouTube's own
 * controls are hidden in favor of a minimal custom bar; the iframe loads
 * shortly before the player scrolls into view. Under prefers-reduced-motion
 * nothing autoplays.
 */
export function InViewVideo({
  youtubeId,
  title,
  poster,
  className,
}: InViewVideoProps) {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const checkTimer = useRef<number | undefined>(undefined);

  const readyRef = useRef(false);
  const inViewRef = useRef(false);
  // Mirrors `armed` for the player callbacks.
  const armedRef = useRef(false);
  const userPausedRef = useRef(false);
  const userMutedRef = useRef(false);
  // Muted by the browser's autoplay policy rather than by the visitor.
  const autoMutedRef = useRef(false);
  const endedRef = useRef(false);
  // The video ships auto-captions that YouTube shows by default; keep the
  // picture clean unless the visitor turns them on with the CC button.
  const captionsRef = useRef(false);

  const [shouldLoad, setShouldLoad] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [autoMuted, setAutoMuted] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [userArmed, setUserArmed] = useState(false);
  const [captions, setCaptions] = useState(false);
  // Armed = allowed to play: autoplay is on, or the visitor pressed play.
  const armed = userArmed || !reduceMotion;

  const wantsPlay = () =>
    armedRef.current &&
    inViewRef.current &&
    !document.hidden &&
    !userPausedRef.current &&
    !endedRef.current;

  const setAutoMutedState = (value: boolean) => {
    autoMutedRef.current = value;
    setAutoMuted(value);
    setMuted(value || userMutedRef.current);
  };

  // Start playback, preferring sound. If the browser refuses (the player
  // never reaches PLAYING), retry muted; if even that fails, show a play button.
  const play = useCallback((fromUser = false) => {
    const player = playerRef.current;
    if (!player || !readyRef.current) return;

    const canTrySound =
      !userMutedRef.current &&
      (!autoMutedRef.current || navigator.userActivation?.hasBeenActive !== false);
    if (canTrySound) {
      player.unMute();
      setAutoMutedState(false);
    } else {
      player.mute();
    }
    player.playVideo();

    window.clearTimeout(checkTimer.current);
    let waited = 0;
    let retriedMuted = !canTrySound;
    const check = () => {
      if (!wantsPlay()) return;
      const state = player.getPlayerState();
      if (state === PLAYING) {
        setBlocked(false);
        return;
      }
      waited += 400;
      if (state === BUFFERING && waited < 4000) {
        checkTimer.current = window.setTimeout(check, 400);
        return;
      }
      if (!retriedMuted) {
        retriedMuted = true;
        waited = 0;
        player.mute();
        setAutoMutedState(true);
        player.playVideo();
        checkTimer.current = window.setTimeout(check, 600);
        return;
      }
      setBlocked(true);
      // Even muted playback was refused after a click: send them to YouTube.
      if (fromUser) setStatus("error");
    };
    checkTimer.current = window.setTimeout(check, 700);
  }, []);

  const sync = useCallback(() => {
    const player = playerRef.current;
    if (!player || !readyRef.current) return;
    const state = player.getPlayerState();
    const active = state === PLAYING || state === BUFFERING;
    if (wantsPlay()) {
      if (!active) play();
    } else if (active) {
      player.pauseVideo();
    }
  }, [play]);

  useEffect(() => {
    armedRef.current = armed;
    sync();
  }, [armed, sync]);

  const unmute = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    userMutedRef.current = false;
    player.unMute();
    setAutoMutedState(false);
    // Safari may pause a video that is unmuted from outside the iframe; if
    // that happens, go back to muted playback rather than stopping.
    window.setTimeout(() => {
      if (wantsPlay() && player.getPlayerState() !== PLAYING) {
        player.mute();
        setAutoMutedState(true);
        player.playVideo();
      }
    }, 600);
  }, []);

  // Load the API and iframe shortly before the player reaches the viewport.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !hostRef.current) return;
    const host = hostRef.current;
    const mount = document.createElement("div");
    host.appendChild(mount);
    let cancelled = false;
    let progressTimer: number | undefined;

    const updateProgress = () => {
      const player = playerRef.current;
      const bar = progressRef.current;
      if (!player || !bar) return;
      const duration = player.getDuration();
      if (duration > 0) {
        bar.style.transform = `scaleX(${Math.min(player.getCurrentTime() / duration, 1)})`;
      }
    };

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        playerRef.current = new YT.Player(mount, {
          videoId: youtubeId,
          host: "https://www.youtube-nocookie.com",
          width: "100%",
          height: "100%",
          playerVars: {
            controls: 0,
            rel: 0,
            playsinline: 1,
            iv_load_policy: 3,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              const iframe = playerRef.current?.getIframe();
              if (iframe) {
                iframe.title = title;
                iframe.tabIndex = -1;
              }
              readyRef.current = true;
              sync();
            },
            onStateChange: ({ data }) => {
              window.clearInterval(progressTimer);
              if (data === PLAYING) {
                playerRef.current?.setOption(
                  "captions",
                  "track",
                  captionsRef.current ? { languageCode: "en" } : {}
                );
                endedRef.current = false;
                setStatus("playing");
                setStarted(true);
                setBlocked(false);
                progressTimer = window.setInterval(updateProgress, 250);
              } else if (data === PAUSED) {
                setStatus("paused");
                updateProgress();
              } else if (data === ENDED) {
                endedRef.current = true;
                setStatus("ended");
                if (progressRef.current) progressRef.current.style.transform = "scaleX(1)";
              } else if (data === UNSTARTED) {
                setStatus((s) => (s === "playing" ? "paused" : s));
              }
            },
            onError: () => setStatus("error"),
          },
        });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      window.clearInterval(progressTimer);
      window.clearTimeout(checkTimer.current);
      readyRef.current = false;
      playerRef.current?.destroy();
      playerRef.current = null;
      host.replaceChildren();
    };
  }, [shouldLoad, youtubeId, title, sync]);

  // Play while at least half the player is visible, pause otherwise.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.intersectionRatio >= 0.5;
        sync();
      },
      { threshold: [0, 0.5] }
    );
    observer.observe(frame);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [sync]);

  // The visitor's first click anywhere on the page lifts the autoplay
  // restriction, so use it to turn the sound on.
  useEffect(() => {
    if (!autoMuted || status !== "playing") return;
    const onPointerDown = (e: PointerEvent) => {
      if (frameRef.current?.contains(e.target as Node)) return;
      if (!userMutedRef.current) unmute();
    };
    window.addEventListener("pointerdown", onPointerDown, { capture: true });
    return () =>
      window.removeEventListener("pointerdown", onPointerDown, { capture: true });
  }, [autoMuted, status, unmute]);

  const togglePlay = () => {
    const player = playerRef.current;
    if (status === "playing") {
      userPausedRef.current = true;
      player?.pauseVideo();
      return;
    }
    userPausedRef.current = false;
    armedRef.current = true;
    setUserArmed(true);
    if (endedRef.current) {
      endedRef.current = false;
      player?.seekTo(0, true);
    }
    if (!shouldLoad) setShouldLoad(true);
    play(true);
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;
    if (muted) {
      unmute();
    } else {
      userMutedRef.current = true;
      player.mute();
      setAutoMutedState(false);
    }
  };

  const toggleCaptions = () => {
    captionsRef.current = !captionsRef.current;
    setCaptions(captionsRef.current);
    playerRef.current?.setOption(
      "captions",
      "track",
      captionsRef.current ? { languageCode: "en" } : {}
    );
  };

  // Clicking the picture unmutes a policy-muted video, otherwise toggles play.
  const onSurfaceClick = () => {
    if (autoMuted && status === "playing") unmute();
    else togglePlay();
  };

  const playing = status === "playing";
  const showPoster = !started || status === "ended" || status === "error";
  const showCenterButton =
    status === "paused" ||
    status === "ended" ||
    (status === "idle" && (blocked || !armed));
  const showBar = started && status !== "ended" && status !== "error";
  const pinBar = !playing || muted;

  return (
    // Outer shell
    <div
      className={cn(
        "rounded-[1.75rem] border border-border-strong/70 bg-muted/60 p-2 shadow-glow-lg backdrop-blur-sm",
        className
      )}
    >
      {/* Inner core */}
      <div
        ref={frameRef}
        className="group relative aspect-video overflow-hidden rounded-[1.35rem] border border-border bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
      >
        <div
          ref={hostRef}
          className="pointer-events-none absolute inset-0 [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full"
        />

        <Image
          src={poster}
          alt=""
          fill
          sizes="(min-width: 1280px) 1120px, 100vw"
          className={cn(
            "pointer-events-none object-cover transition-opacity duration-700 ease-[var(--ease-quart)]",
            showPoster ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Picture click target (mouse convenience; the bar below is the accessible control) */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={onSurfaceClick}
          className="absolute inset-0 h-full w-full cursor-pointer"
        />

        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-500",
            showCenterButton || showPoster ? "opacity-100" : "opacity-0"
          )}
        />

        {status === "error" ? (
          <a
            href={`https://www.youtube.com/watch?v=${youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-glow-sm transition-transform duration-300 ease-[var(--ease-spring)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Watch on YouTube
            <ArrowUpRight weight="bold" className="h-4 w-4" />
          </a>
        ) : (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={status === "ended" ? `Replay video: ${title}` : `Play video: ${title}`}
            tabIndex={showCenterButton ? 0 : -1}
            className={cn(
              "absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-glow-sm transition-[opacity,transform] duration-300 ease-[var(--ease-spring)] hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:h-20 sm:w-20",
              // The short delay keeps the button from flashing during the
              // brief pause while an autoplay attempt falls back to muted.
              showCenterButton
                ? "opacity-100 delay-300"
                : "pointer-events-none scale-90 opacity-0"
            )}
          >
            {status === "ended" ? (
              <ArrowClockwise weight="bold" className="h-6 w-6 sm:h-7 sm:w-7" />
            ) : (
              <Play weight="fill" className="ml-1 h-6 w-6 sm:h-7 sm:w-7" />
            )}
          </button>
        )}

        {/* Control bar */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 transition-opacity duration-300 [&_button]:pointer-events-auto",
            !showBar
              ? "opacity-0 [&_button]:pointer-events-none"
              : pinBar
                ? "opacity-100"
                : "opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100"
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent sm:h-24"
          />
          <div className="relative flex items-center justify-between gap-3 px-2.5 pb-3 sm:px-5 sm:pb-5">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause video" : "Play video"}
              tabIndex={showBar ? 0 : -1}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-white/20 sm:h-10 sm:w-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {playing ? (
                <Pause weight="fill" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              ) : (
                <Play weight="fill" className="ml-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              )}
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={toggleCaptions}
                aria-label="Captions"
                aria-pressed={captions}
                tabIndex={showBar ? 0 : -1}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-white ring-1 sm:h-10 sm:w-10 backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                  captions
                    ? "bg-white/25 ring-white/40"
                    : "bg-white/10 ring-white/15 hover:bg-white/20"
                )}
              >
                <ClosedCaptioning weight={captions ? "fill" : "regular"} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Turn sound on" : "Mute video"}
                tabIndex={showBar ? 0 : -1}
                className={cn(
                  "flex h-8 items-center justify-center gap-1.5 rounded-full text-white sm:h-10 sm:gap-2 ring-1 backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                  autoMuted
                    ? "bg-accent px-3 text-xs font-medium ring-white/20 shadow-glow-sm hover:bg-brand-600 sm:px-4 sm:text-sm"
                    : "w-8 bg-white/10 ring-white/15 hover:bg-white/20 sm:w-10"
                )}
              >
                {muted ? (
                  <SpeakerSlash weight="fill" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                ) : (
                  <SpeakerHigh weight="fill" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
                {autoMuted ? <span>Tap for sound</span> : null}
              </button>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-white/10 transition-opacity duration-300",
            showBar ? "opacity-100" : "opacity-0"
          )}
        >
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-0 bg-gradient-to-r from-brand-cyan via-brand-violet to-brand-blue transition-transform duration-300 ease-linear"
          />
        </div>
      </div>
    </div>
  );
}
