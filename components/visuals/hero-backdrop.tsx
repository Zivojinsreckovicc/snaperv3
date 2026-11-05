/**
 * Shared hero atmosphere. Static CSS layers only: no assets, animation or
 * client-side work. The bottom fade keeps the hero transition seamless.
 */
export function HeroBackdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-brand-950)_22%,var(--color-background))_0%,var(--color-background)_48%,color-mix(in_oklab,var(--color-brand-blue)_8%,var(--color-background))_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[18rem] top-12 -z-10 h-[34rem] w-[34rem] rounded-full bg-brand-violet/22 blur-[120px] sm:-left-40 sm:h-[42rem] sm:w-[42rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[18rem] top-8 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand-cyan/10 blur-[130px] sm:-right-36 sm:h-[38rem] sm:w-[38rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-[linear-gradient(to_top,var(--color-background),transparent)]"
      />
    </>
  );
}
