// L0B0 — index page behavior

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- live HUD clock -------------------------------------------- */
  const clockEl = document.getElementById("clock");

  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    clockEl.textContent = `${hh}:${mm}:${ss}`;
  }

  updateClock();
  setInterval(updateClock, 1000);

  /* ---- section tracking: nav dots + HUD channel label ------------ */
  const sections = Array.from(document.querySelectorAll(".view"));
  const navDots = Array.from(document.querySelectorAll(".section-nav__dot"));
  const channelLabel = document.getElementById("channelLabel");
  const scroller = document.getElementById("scroller");

  const channelNames = {
    "s-hero": "INDEX",
    "s-music": "MUSIC",
    "s-renders": "RENDERS",
    "s-web": "WEB WORK",
  };

  function setActive(id) {
    navDots.forEach((dot) => {
      dot.classList.toggle("is-active", dot.dataset.target === id);
    });
    const section = document.getElementById(id);
    if (channelLabel && section) {
      const idx = section.dataset.index || "00";
      channelLabel.innerHTML = `<b>${idx} / ${channelNames[id] || "INDEX"}</b>`;
    }
  }

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActive(entry.target.id);
          }
        });
      },
      { root: scroller, threshold: [0.6] }
    );
    sections.forEach((section) => observer.observe(section));
  }

  navDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) {
        target.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    });
  });

  /* ---- cursor-follow crosshair, replaces system cursor ------------ */
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const follower = document.getElementById("cursorFollow");

  if (follower) {
    if (canHover) {
      window.addEventListener("mousemove", (e) => {
        follower.style.opacity = "1";
        follower.style.left = `${e.clientX}px`;
        follower.style.top = `${e.clientY}px`;
      });

      window.addEventListener("mouseleave", () => {
        follower.style.opacity = "0";
      });
    } else {
      follower.style.display = "none";
    }
  }
});
