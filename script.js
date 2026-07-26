function updatePageScale() {
  const page = document.querySelector(".page");
  const viewport = document.querySelector(".viewport");
  if (!page || !viewport) return;

  const designWidth = 2800;
  const scale = Math.min(1, window.innerWidth / designWidth);

  if (scale < 1) {
    page.style.transform = `scale(${scale})`;
    viewport.style.height = `${page.offsetHeight * scale}px`;
  } else {
    page.style.transform = "";
    viewport.style.height = "";
  }
}

updatePageScale();
window.addEventListener("resize", updatePageScale);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

if (document.fonts) {
  document.fonts.ready.then(updatePageScale);
}

window.addEventListener("load", updatePageScale);
