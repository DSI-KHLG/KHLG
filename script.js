/* =========================
   ELEMENTS
========================= */
const navbar = document.querySelector(".navbar");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileServicesDropdown = document.getElementById(
  "mobileServicesDropdown",
);
const mobileDropdownToggle = document.getElementById("mobileDropdownToggle");

const desktopTopLinks = document.querySelectorAll(".nav-menu > a");
const desktopDropdownToggle = document.querySelector(".dropdown-toggle");
const desktopDropdownLinks = document.querySelectorAll(".dropdown-menu a");

const mobileTopLinks = document.querySelectorAll(".mobile-menu-top > a");
const mobileServicesLink = document.querySelector(".mobile-services-link");
const mobileDropdownLinks = document.querySelectorAll(
  ".mobile-dropdown-menu a",
);

/* =========================
   PAGE DETECTION
========================= */
const currentPath = window.location.pathname.split("/").pop() || "index.html";

const servicePages = [
  "services.html",
  "pagm.html",
  "environmental.html",
  "cae.html",
  "spc.html",
];

/* =========================
   NAVBAR SCROLL EFFECT
========================= */
function updateNavbarScrollState() {
  if (!navbar) return;

  if (
    window.scrollY > 20 ||
    (mobileMenu && mobileMenu.classList.contains("active"))
  ) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

updateNavbarScrollState();
window.addEventListener("scroll", updateNavbarScrollState);

/* =========================
   MOBILE MENU TOGGLE
========================= */
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    const isOpen = mobileMenu.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = isOpen ? "hidden" : "";

    updateNavbarScrollState();
  });
}

/* =========================
   MOBILE SERVICES DROPDOWN TOGGLE
========================= */
if (mobileDropdownToggle && mobileServicesDropdown) {
  mobileDropdownToggle.addEventListener("click", () => {
    mobileServicesDropdown.classList.toggle("active");

    const isExpanded = mobileServicesDropdown.classList.contains("active");
    mobileDropdownToggle.setAttribute(
      "aria-expanded",
      isExpanded ? "true" : "false",
    );
  });
}

/* =========================
   CLEAR ACTIVE CLASSES
========================= */
function clearActive(links) {
  links.forEach((link) => link.classList.remove("active"));
}

/* =========================
   AUTO ACTIVE DESKTOP
========================= */
clearActive(desktopTopLinks);
clearActive(desktopDropdownLinks);

if (desktopDropdownToggle) {
  desktopDropdownToggle.classList.remove("active");
}

desktopTopLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPath) {
    link.classList.add("active");
  }
});

desktopDropdownLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPath) {
    link.classList.add("active");
  }
});

if (desktopDropdownToggle && servicePages.includes(currentPath)) {
  desktopDropdownToggle.classList.add("active");
}

/* =========================
   AUTO ACTIVE MOBILE
========================= */
clearActive(mobileTopLinks);
clearActive(mobileDropdownLinks);

if (mobileServicesLink) {
  mobileServicesLink.classList.remove("active");
}

mobileTopLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPath) {
    link.classList.add("active");
  }
});

mobileDropdownLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPath) {
    link.classList.add("active");
  }
});

if (mobileServicesLink && servicePages.includes(currentPath)) {
  mobileServicesLink.classList.add("active");
}

if (
  mobileServicesDropdown &&
  servicePages.includes(currentPath) &&
  currentPath !== "services.html"
) {
  mobileServicesDropdown.classList.add("active");

  if (mobileDropdownToggle) {
    mobileDropdownToggle.setAttribute("aria-expanded", "true");
  }
}

/* =========================
   CLICK FEEDBACK DESKTOP
========================= */
desktopTopLinks.forEach((link) => {
  link.addEventListener("click", () => {
    clearActive(desktopTopLinks);
    clearActive(desktopDropdownLinks);

    if (desktopDropdownToggle) {
      desktopDropdownToggle.classList.remove("active");
    }

    link.classList.add("active");
  });
});

desktopDropdownLinks.forEach((link) => {
  link.addEventListener("click", () => {
    clearActive(desktopTopLinks);
    clearActive(desktopDropdownLinks);

    if (desktopDropdownToggle) {
      desktopDropdownToggle.classList.add("active");
    }

    link.classList.add("active");
  });
});

if (desktopDropdownToggle) {
  desktopDropdownToggle.addEventListener("click", () => {
    clearActive(desktopTopLinks);
    clearActive(desktopDropdownLinks);
    desktopDropdownToggle.classList.add("active");
  });
}

/* =========================
   CLICK FEEDBACK MOBILE
========================= */
mobileTopLinks.forEach((link) => {
  link.addEventListener("click", () => {
    clearActive(mobileTopLinks);
    clearActive(mobileDropdownLinks);

    if (mobileServicesLink) {
      mobileServicesLink.classList.remove("active");
    }

    link.classList.add("active");
  });
});

mobileDropdownLinks.forEach((link) => {
  link.addEventListener("click", () => {
    clearActive(mobileTopLinks);
    clearActive(mobileDropdownLinks);

    if (mobileServicesLink) {
      mobileServicesLink.classList.add("active");
    }

    link.classList.add("active");
  });
});

if (mobileServicesLink) {
  mobileServicesLink.addEventListener("click", () => {
    clearActive(mobileTopLinks);
    clearActive(mobileDropdownLinks);
    mobileServicesLink.classList.add("active");
  });
}

/* =========================
   CLOSE MOBILE MENU ON LINK CLICK
========================= */
const allMobileLinks = document.querySelectorAll(
  ".mobile-menu a, .mobile-services-link",
);

allMobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menuToggle && mobileMenu) {
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";

      updateNavbarScrollState();
    }
  });
});

/* =========================
   RESET MENU ON RESIZE
========================= */
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    if (menuToggle && mobileMenu) {
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    if (mobileServicesDropdown && !servicePages.includes(currentPath)) {
      mobileServicesDropdown.classList.remove("active");
    }

    if (mobileDropdownToggle) {
      const isExpanded =
        mobileServicesDropdown &&
        mobileServicesDropdown.classList.contains("active");
      mobileDropdownToggle.setAttribute(
        "aria-expanded",
        isExpanded ? "true" : "false",
      );
    }

    updateNavbarScrollState();
  }
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
