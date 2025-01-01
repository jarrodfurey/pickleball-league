// nav.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("nav.js loaded");

  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("navbar");

  if (!hamburger || !nav) {
    console.log("Hamburger or nav not found");
    return;
  }

  hamburger.addEventListener("click", () => {
    console.log("Hamburger clicked");
    nav.classList.toggle("active");

    // Update ARIA attribute for accessibility
    const isActive = nav.classList.contains("active");
    hamburger.setAttribute("aria-expanded", isActive);
  });

  // Allow toggling via keyboard (Enter key)
  hamburger.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      console.log("Hamburger keypress Enter");
      nav.classList.toggle("active");

      // Update ARIA attribute for accessibility
      const isActive = nav.classList.contains("active");
      hamburger.setAttribute("aria-expanded", isActive);
    }
  });
});
