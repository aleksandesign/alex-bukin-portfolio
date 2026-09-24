window.prefersSmoothScroll = function prefersSmoothScroll() {
  return (
    window.matchMedia("(min-width: 769px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
};

(function initLenis() {
  if (!window.prefersSmoothScroll() || typeof Lenis === "undefined") return;

  document.documentElement.classList.add("lenis", "lenis-smooth");

  const lenis = new Lenis({
    lerp: 0.06,
    duration: 1.65,
    smoothWheel: true,
    wheelMultiplier: 0.82,
    touchMultiplier: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  window.__lenis = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
})();
