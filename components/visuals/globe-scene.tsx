"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* Brand palette (kept in sync with globals.css tokens). */
const VIOLET = new THREE.Color("#8a68f0");
const CYAN = new THREE.Color("#2bd4c0");
const BLUE = new THREE.Color("#3f7df0");

const RADIUS = 2.2;
const MASK_SRC = "/textures/world-mask.jpg";

type City = { lat: number; lng: number };

/* A hub (Belgrade, where the studio is based) radiating routes to clients
   across the world — the literal "we work with clients everywhere" message. */
const HUB: City = { lat: 44.8, lng: 20.5 };
const DESTINATIONS: City[] = [
  { lat: 40.7, lng: -74.0 }, // New York
  { lat: 51.5, lng: -0.12 }, // London
  { lat: 25.2, lng: 55.27 }, // Dubai
  { lat: 1.35, lng: 103.8 }, // Singapore
  { lat: -23.5, lng: -46.6 }, // São Paulo
  { lat: 34.05, lng: -118.24 }, // Los Angeles
  { lat: -33.87, lng: 151.2 }, // Sydney
  { lat: 35.68, lng: 139.7 }, // Tokyo
];

function latLngToVec3(lat: number, lng: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

/** Soft round sprite/point texture (white core fading to transparent). */
function makeGlowTexture(size = 64) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.85)");
  g.addColorStop(0.6, "rgba(255,255,255,0.18)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

type Arc = {
  curve: THREE.QuadraticBezierCurve3;
  line: THREE.Line;
  head: THREE.Sprite;
  count: number;
  tail: number;
  t: number;
  speed: number;
};

export default function GlobeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = mount.clientWidth || 1;
    let height = mount.clientHeight || 1;

    /* ---- Renderer / scene / camera ---- */
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 1s ease";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 7.6);

    /* root carries pointer parallax; globe carries the autonomous spin. */
    const root = new THREE.Group();
    scene.add(root);
    const globe = new THREE.Group();
    globe.rotation.z = 0.41; // ~23deg axial tilt
    root.add(globe);

    const glowTex = makeGlowTexture();
    const disposables: Array<{ dispose: () => void }> = [glowTex];
    let disposed = false;

    /* Theme state. The land dots / markers / arcs glow additively, which only
       reads on a dark sphere; in light mode we flip them to normal blending so
       they stay visible on the light globe body. `themedGlowMats` collects
       every such material so a theme switch can retarget them all at once. */
    let currentIsLight =
      document.documentElement.getAttribute("data-theme") === "light";
    const themedGlowMats: Array<
      THREE.SpriteMaterial | THREE.LineBasicMaterial | THREE.PointsMaterial
    > = [];
    const blendFor = (light: boolean) =>
      light ? THREE.NormalBlending : THREE.AdditiveBlending;

    /* ---- Solid inner core: occludes back-facing dots for a real sphere ---- */
    const coreGeo = new THREE.SphereGeometry(RADIUS * 0.97, 64, 64);
    // Opaque on purpose: an opaque core renders in the opaque pass and writes
    // depth, so the additive land dots in FRONT pass the depth test (visible)
    // while dots behind the sphere fail it (hidden). A transparent core would
    // paint over the front dots, leaving only the rim — the bug we saw.
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#080810"),
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    globe.add(core);
    disposables.push(coreGeo, coreMat);

    /* ---- Faint graticule so the sphere still reads where oceans are empty ---- */
    const wireGeo = new THREE.SphereGeometry(RADIUS * 1.002, 36, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: VIOLET,
      wireframe: true,
      transparent: true,
      opacity: 0.035,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    globe.add(wire);
    disposables.push(wireGeo, wireMat);

    /* ---- City markers ---- */
    const markerPoints = [HUB, ...DESTINATIONS];
    const markerMats: THREE.SpriteMaterial[] = [];
    markerPoints.forEach((city, idx) => {
      const isHub = idx === 0;
      const mat = new THREE.SpriteMaterial({
        map: glowTex,
        color: isHub ? CYAN : VIOLET,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.setScalar(isHub ? 0.34 : 0.22);
      sprite.position.copy(latLngToVec3(city.lat, city.lng, RADIUS * 1.02));
      sprite.userData.base = sprite.scale.x;
      sprite.userData.phase = idx * 0.7;
      globe.add(sprite);
      markerMats.push(mat);
      themedGlowMats.push(mat);
    });
    disposables.push(...markerMats);

    /* ---- Arc routes with traveling comet pulses ("arrows") ---- */
    const arcs: Arc[] = [];
    const SEG = 90;
    const hubVec = latLngToVec3(HUB.lat, HUB.lng, RADIUS);

    DESTINATIONS.forEach((dest, idx) => {
      const start = hubVec.clone();
      const end = latLngToVec3(dest.lat, dest.lng, RADIUS);
      const dist = start.distanceTo(end);
      const mid = start
        .clone()
        .add(end)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(RADIUS + dist * 0.42 + 0.25);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const pts = curve.getPoints(SEG - 1);

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const lineColors = new Float32Array(SEG * 3);
      for (let i = 0; i < SEG; i++) {
        const c = CYAN.clone().lerp(VIOLET, i / (SEG - 1));
        lineColors.set([c.r, c.g, c.b], i * 3);
      }
      geo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

      /* faint full path always visible */
      const baseMat = new THREE.LineBasicMaterial({
        color: VIOLET,
        transparent: true,
        opacity: 0.12,
      });
      const baseLine = new THREE.Line(geo, baseMat);
      globe.add(baseLine);
      disposables.push(baseMat, geo);

      /* bright traveling comet, drawn via a moving draw-range window.
         Needs its own geometry: setDrawRange is per-geometry, so sharing
         with the base path would clip both. */
      const cometGeo = geo.clone();
      const cometMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const comet = new THREE.Line(cometGeo, cometMat);
      globe.add(comet);
      disposables.push(cometMat, cometGeo);
      themedGlowMats.push(cometMat);

      const headMat = new THREE.SpriteMaterial({
        map: glowTex,
        color: CYAN,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const head = new THREE.Sprite(headMat);
      head.scale.setScalar(0.26);
      globe.add(head);
      disposables.push(headMat);
      themedGlowMats.push(headMat);

      arcs.push({
        curve,
        line: comet,
        head,
        count: SEG,
        tail: 12,
        t: idx / DESTINATIONS.length,
        speed: 0.07 + (idx % 3) * 0.018,
      });
    });

    /* ---- Theme: flip the sphere body light/dark and retarget the glow
       materials so the continents/routes stay visible in light mode ---- */
    const applyTheme = (light: boolean) => {
      currentIsLight = light;
      // The opaque core IS the visible sphere body — this is the light/dark flip.
      coreMat.color.set(light ? "#dcdce9" : "#080810");
      // Graticule reads as faint meridians; nudge it darker/stronger on light.
      wireMat.color.set(light ? "#6234d6" : "#8a68f0");
      wireMat.opacity = light ? 0.1 : 0.035;
      const blend = blendFor(light);
      for (const m of themedGlowMats) {
        m.blending = blend;
        m.needsUpdate = true;
      }
    };
    applyTheme(currentIsLight);

    // React to live theme toggles (ThemeProvider sets <html data-theme>).
    const themeObserver = new MutationObserver(() => {
      const light =
        document.documentElement.getAttribute("data-theme") === "light";
      if (light === currentIsLight) return;
      applyTheme(light);
      renderer.render(scene, camera); // repaint even if the loop is paused
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    /* ---- Land dots: sampled from the world mask so they form continents ---- */
    const maskImg = new Image();
    let dotsBuilt = false;
    const buildLandDots = () => {
      if (disposed || dotsBuilt || !maskImg.naturalWidth) return;
      dotsBuilt = true;
      const mw = maskImg.width;
      const mh = maskImg.height;
      const c = document.createElement("canvas");
      c.width = mw;
      c.height = mh;
      const cx = c.getContext("2d", { willReadFrequently: true })!;
      cx.drawImage(maskImg, 0, 0);
      const data = cx.getImageData(0, 0, mw, mh).data;

      // Land is dark in this mask; ocean is white.
      const isLand = (lat: number, lng: number) => {
        const u = (lng + 180) / 360;
        const v = (90 - lat) / 180;
        const ix = Math.min(mw - 1, Math.max(0, Math.floor(u * mw)));
        const iy = Math.min(mh - 1, Math.max(0, Math.floor(v * mh)));
        const i = (iy * mw + ix) * 4;
        return (data[i] + data[i + 1] + data[i + 2]) / 3 < 90;
      };

      const CANDIDATES = 26000;
      const pos: number[] = [];
      const col: number[] = [];
      const golden = Math.PI * (1 + Math.sqrt(5));
      for (let i = 0; i < CANDIDATES; i++) {
        const yN = 1 - (i / (CANDIDATES - 1)) * 2; // -1..1
        const r = Math.sqrt(Math.max(0, 1 - yN * yN));
        const az = golden * i;
        const xN = Math.cos(az) * r;
        const zN = Math.sin(az) * r;

        const lat = Math.asin(yN) * (180 / Math.PI);
        let lng = Math.atan2(zN, -xN) * (180 / Math.PI) - 180;
        if (lng < -180) lng += 360;

        if (!isLand(lat, lng)) continue;
        pos.push(xN * RADIUS, yN * RADIUS, zN * RADIUS);
        const c2 = VIOLET.clone().lerp(CYAN, 0.22 + 0.32 * Math.random());
        c2.lerp(BLUE, 0.1);
        col.push(c2.r, c2.g, c2.b);
      }

      const dotGeo = new THREE.BufferGeometry();
      dotGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(pos), 3)
      );
      dotGeo.setAttribute(
        "color",
        new THREE.BufferAttribute(new Float32Array(col), 3)
      );
      const dotMat = new THREE.PointsMaterial({
        size: 0.07,
        map: glowTex,
        vertexColors: true,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        blending: blendFor(currentIsLight),
        sizeAttenuation: true,
      });
      const dots = new THREE.Points(dotGeo, dotMat);
      globe.add(dots);
      disposables.push(dotGeo, dotMat);
      themedGlowMats.push(dotMat);
      renderer.render(scene, camera);
    };

    maskImg.onload = buildLandDots;
    maskImg.src = MASK_SRC;
    // Cached images (e.g. React StrictMode's second mount) may already be
    // complete, in which case `onload` never fires — build immediately.
    if (maskImg.complete) buildLandDots();

    /* ---- Pointer parallax ---- */
    let targetX = 0;
    let targetY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerleave", onPointerLeave);

    /* ---- Visibility gating (pause when off-screen / tab hidden) ---- */
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduce) loop();
      },
      { threshold: 0.05 }
    );
    io.observe(mount);

    const onVisibility = () => {
      if (document.hidden) visible = false;
      else {
        visible = true;
        if (!reduce) loop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* ---- Resize ---- */
    const ro = new ResizeObserver(() => {
      width = mount.clientWidth || 1;
      height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.render(scene, camera);
    });
    ro.observe(mount);

    /* ---- Animation loop ---- */
    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;
    const tmp = new THREE.Vector3();

    const updateArcs = (dt: number) => {
      for (const arc of arcs) {
        arc.t = (arc.t + dt * arc.speed) % 1;
        const headIdx = arc.t * (arc.count - 1);
        const startIdx = Math.max(0, Math.floor(headIdx - arc.tail));
        const endIdx = Math.min(arc.count - 1, Math.ceil(headIdx));
        arc.line.geometry.setDrawRange(
          startIdx,
          Math.max(0, endIdx - startIdx + 1)
        );
        arc.curve.getPoint(arc.t, tmp);
        arc.head.position.copy(tmp);
      }
    };

    const render = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      globe.rotation.y += dt * 0.1;
      root.rotation.y += (targetX * 0.34 - root.rotation.y) * 0.045;
      root.rotation.x += (targetY * 0.22 - root.rotation.x) * 0.045;
      updateArcs(dt);
      globe.children.forEach((child) => {
        if (child instanceof THREE.Sprite && child.userData.base) {
          const p = 0.85 + Math.sin(t * 2 + child.userData.phase) * 0.15;
          child.scale.setScalar(child.userData.base * p);
        }
      });
      renderer.render(scene, camera);
    };

    const loop = () => {
      if (running) return;
      running = true;
      const tick = () => {
        if (!visible || reduce) {
          running = false;
          return;
        }
        render();
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    /* first paint + fade-in */
    updateArcs(0.0001);
    renderer.render(scene, camera);
    requestAnimationFrame(() => {
      renderer.domElement.style.opacity = "1";
    });
    if (!reduce) loop();

    /* ---- Cleanup ---- */
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
