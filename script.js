// mobile menu

const burger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-menu");

burger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// simple scroll animation

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll("section").forEach((sec) => {
  observer.observe(sec);
});
