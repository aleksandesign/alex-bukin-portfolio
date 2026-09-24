document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();
    const lenis = window.__lenis;
    const smooth = window.prefersSmoothScroll?.();
    if (lenis && smooth) {
      lenis.scrollTo(target, { duration: 1.85, offset: 0 });
    } else {
      target.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "start",
      });
    }

    const navGroup = document.getElementById("nav-menu");
    const navToggle = document.querySelector(".nav-toggle");
    if (navGroup?.classList.contains("is-open")) {
      setNavOpen(false);
    }
  });
});

const navToggle = document.querySelector(".nav-toggle");
const navGroup = document.getElementById("nav-menu");

function setNavOpen(isOpen) {
  if (!navToggle || !navGroup) return;

  navGroup.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.textContent = isOpen ? "Закрыть" : "Меню";
}

if (navToggle && navGroup) {
  navToggle.addEventListener("click", () => {
    setNavOpen(!navGroup.classList.contains("is-open"));
  });
}

const pubScroll = document.querySelector(".pub-scroll");

if (pubScroll) {
  pubScroll.scrollLeft = 0;

  window.addEventListener("pageshow", () => {
    pubScroll.scrollLeft = 0;
  });
}

function initHeadingReveal() {
  const mobileQuery = window.matchMedia("(max-width: 768px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mobileQuery.matches || reducedMotion.matches) return;

  document.documentElement.classList.add("reveal-headings");

  const STAGGER_WORD = 0.06;
  const STAGGER_LINE = 0.12;
  const DURATION = 0.9;

  function createMask(innerText, display, delay) {
    const mask = document.createElement("span");
    mask.className =
      display === "block" ? "reveal-mask reveal-mask--block" : "reveal-mask reveal-mask--inline";
    const inner = document.createElement("span");
    inner.className = "reveal-mask__inner";
    inner.textContent = innerText;
    inner.style.transitionDuration = `${DURATION}s`;
    if (delay) inner.style.transitionDelay = `${delay}s`;
    mask.appendChild(inner);
    return mask;
  }

  function revealWords(el) {
    const text = el.textContent;
    el.textContent = "";
    el.classList.add("reveal-heading");
    let wordIndex = 0;
    text.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        el.appendChild(document.createTextNode(part));
        return;
      }
      el.appendChild(createMask(part, "inline", wordIndex * STAGGER_WORD));
      wordIndex += 1;
    });
    return el;
  }

  function revealLine(el, lineIndex) {
    const text = el.textContent;
    el.textContent = "";
    el.classList.add("reveal-heading", "reveal-heading--line");
    el.appendChild(createMask(text, "block", lineIndex * STAGGER_LINE));
    return el;
  }

  document.querySelectorAll(".hero-title__line").forEach((line, i) => revealLine(line, i));
  document.querySelectorAll(".section-title").forEach(revealWords);
  document.querySelectorAll(".case-body h3").forEach(revealWords);
  document.querySelectorAll(".pub-text h3").forEach(revealWords);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-inview");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(".reveal-heading").forEach((el) => {
    if (el.closest(".hero")) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.add("is-inview"));
      });
      return;
    }
    observer.observe(el);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeadingReveal);
} else {
  initHeadingReveal();
}
