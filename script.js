document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

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
