const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
  navMenu.classList.toggle("active");
});

const contactModal = document.getElementById("contactModal");
const openContactModal = document.querySelectorAll(".contact-modal-open-btn");
const closeContactModal = document.getElementById("closeContactModal");

openContactModal.forEach((btn) => {
  btn.addEventListener("click", () => {
    contactModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

closeContactModal.addEventListener("click", () => {
  contactModal.classList.remove("active");
  document.body.style.overflow = "";
});

contactModal.addEventListener("click", (e) => {
  if (e.target === contactModal) {
    contactModal.classList.remove("active");
    document.body.style.overflow = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    contactModal.classList.remove("active");
    document.body.style.overflow = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight - 100;

    reveals.forEach((item) => {
      const rect = item.getBoundingClientRect();

      if (rect.top < triggerBottom) {
        item.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});
