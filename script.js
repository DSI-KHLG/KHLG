const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
  navMenu.classList.toggle("active");
});

const contactModal = document.getElementById("contactModal");
const openContactModal = document.getElementById("openContactModal");
const closeContactModal = document.getElementById("closeContactModal");

openContactModal.addEventListener("click", () => {
  contactModal.classList.add("active");
  document.body.style.overflow = "hidden";
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
