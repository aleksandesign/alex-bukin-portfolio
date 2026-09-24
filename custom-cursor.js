(function initCustomCursor() {
  const enabled =
    window.matchMedia("(min-width: 769px) and (hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!enabled) return;

  document.documentElement.classList.add("has-custom-cursor");

  const root = document.createElement("div");
  root.className = "site-cursor";
  root.setAttribute("aria-hidden", "true");

  const follower = document.createElement("div");
  follower.className = "site-cursor__follower";

  const dot = document.createElement("div");
  dot.className = "site-cursor__dot";

  const ring = document.createElement("div");
  ring.className = "site-cursor__ring";

  follower.appendChild(ring);
  follower.appendChild(dot);
  root.appendChild(follower);
  document.body.appendChild(root);

  const INTERACTIVE =
    "a, button, input, textarea, select, label, summary, [role='button'], .case-card, .pub-card, .link-card";

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let x = targetX;
  let y = targetY;
  let visible = false;
  let hovering = false;

  function setHover(state) {
    if (hovering === state) return;
    hovering = state;
    root.classList.toggle("is-hover", state);
  }

  function onMove(event) {
    targetX = event.clientX;
    targetY = event.clientY;
    if (!visible) {
      visible = true;
      root.classList.add("is-visible");
      x = targetX;
      y = targetY;
    }
    setHover(Boolean(event.target.closest(INTERACTIVE)));
  }

  document.addEventListener("mousemove", onMove, { passive: true });

  document.addEventListener(
    "mouseover",
    (event) => {
      setHover(Boolean(event.target.closest(INTERACTIVE)));
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", () => {
    visible = false;
    root.classList.remove("is-visible");
  });

  document.addEventListener("mouseenter", () => {
    if (targetX || targetY) root.classList.add("is-visible");
  });

  function tick() {
    x += (targetX - x) * 0.18;
    y += (targetY - y) * 0.18;
    follower.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
