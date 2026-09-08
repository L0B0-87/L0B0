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

  /* ---- footer year -------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = `© ${new Date().getFullYear()}`;
  }

  /* ---- door hover / focus glitch trigger ------------------------- */
  const doors = document.querySelectorAll(".door");

  doors.forEach((door) => {
    let resetTimer;

    const trigger = () => {
      door.classList.remove("is-glitching");
      // force reflow so the animation can restart on repeated hovers
      void door.offsetWidth;
      door.classList.add("is-glitching");

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => door.classList.remove("is-glitching"), 420);
    };

    door.addEventListener("pointerenter", trigger);
    door.addEventListener("focus", trigger);
  });

  /* ---- cursor-follow crosshair (desktop, pointer-capable only) --- */
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const follower = document.getElementById("cursorFollow");

  if (follower) {
    if (canHover && !reduceMotion) {
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
