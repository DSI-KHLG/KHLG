document.addEventListener("DOMContentLoaded", () => {
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

  const desktopSearchInput = document.querySelector(".search-box input");
  const mobileSearchInput = document.querySelector(".mobile-search-box input");

  const contactModal = document.getElementById("contactModal");
  const openContactModalBtns = document.querySelectorAll(
    ".contact-modal-open-btn",
  );
  const closeContactModal = document.getElementById("closeContactModal");

  const revealItems = document.querySelectorAll(".reveal");

  const spcSection = document.querySelector(".spc-services");
  const spcItems = document.querySelectorAll(".spc-item");
  const spcContainer = document.querySelector(".spc-services-container");
  const spcPanel = document.querySelector(".spc-panel");
  const spcActiveTitle = document.querySelector(".spc-panel-active-title");
  const spcActiveDesc = document.querySelector(".spc-panel-active-desc");

  /* =========================
     PAGE DETECTION
  ========================= */
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  const servicePages = [
    "services.html",
    "project-and-construction-management.html",
    "environmental-services.html",
    "civil-and-engineering-support.html",
    "scheduling-and-project-controls.html",
  ];

  /* =========================
     HELPERS
  ========================= */
  const clearActive = (links) => {
    links.forEach((link) => link.classList.remove("active"));
  };

  const closeMobileMenu = () => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";

    updateNavbarScrollState();
  };

  const openModal = () => {
    if (!contactModal) return;
    contactModal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!contactModal) return;
    contactModal.classList.remove("active");
    document.body.style.overflow = "";
  };

  /* =========================
     NAV SEARCH HELPERS
  ========================= */
  const allDesktopSearchLinks = [
    ...desktopTopLinks,
    ...(desktopDropdownToggle ? [desktopDropdownToggle] : []),
    ...desktopDropdownLinks,
  ];

  const allMobileSearchLinks = [
    ...mobileTopLinks,
    ...(mobileServicesLink ? [mobileServicesLink] : []),
    ...mobileDropdownLinks,
  ];

  const syncSearchInputs = (value, source) => {
    if (source !== "desktop" && desktopSearchInput) {
      desktopSearchInput.value = value;
    }

    if (source !== "mobile" && mobileSearchInput) {
      mobileSearchInput.value = value;
    }
  };

  const filterSearchLinks = (value, links) => {
    links.forEach((link) => {
      const text = link.textContent.toLowerCase().trim();
      link.style.display = text.includes(value) || value === "" ? "" : "none";
    });
  };

  const getFirstSearchMatch = (value, links) => {
    return links.find((link) => {
      const text = link.textContent.toLowerCase().trim();
      return text.includes(value);
    });
  };

  const handleNavSearch = (value, source) => {
    const normalizedValue = value.toLowerCase().trim();

    syncSearchInputs(value, source);
    filterSearchLinks(normalizedValue, allDesktopSearchLinks);
    filterSearchLinks(normalizedValue, allMobileSearchLinks);
  };

  const handleSearchEnter = (value, links) => {
    const normalizedValue = value.toLowerCase().trim();

    if (!normalizedValue) return;

    const match = getFirstSearchMatch(normalizedValue, links);

    if (match && match.getAttribute("href")) {
      window.location.href = match.getAttribute("href");
    }
  };

  /* =========================
     NAVBAR SCROLL EFFECT
  ========================= */
  function updateNavbarScrollState() {
    if (!navbar) return;

    const menuOpen = mobileMenu && mobileMenu.classList.contains("active");

    if (window.scrollY > 20 || menuOpen) {
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
     MOBILE SERVICES DROPDOWN
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
     NAV SEARCH
  ========================= */
  if (desktopSearchInput) {
    desktopSearchInput.addEventListener("input", () => {
      handleNavSearch(desktopSearchInput.value, "desktop");
    });

    desktopSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleSearchEnter(desktopSearchInput.value, allDesktopSearchLinks);
      }
    });
  }

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("input", () => {
      handleNavSearch(mobileSearchInput.value, "mobile");
    });

    mobileSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleSearchEnter(mobileSearchInput.value, allMobileSearchLinks);
      }
    });
  }

  /* =========================
     AUTO ACTIVE - DESKTOP
  ========================= */
  clearActive(desktopTopLinks);
  clearActive(desktopDropdownLinks);

  if (desktopDropdownToggle) {
    desktopDropdownToggle.classList.remove("active");
  }

  desktopTopLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  desktopDropdownLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  if (desktopDropdownToggle && servicePages.includes(currentPath)) {
    desktopDropdownToggle.classList.add("active");
  }

  /* =========================
     AUTO ACTIVE - MOBILE
  ========================= */
  clearActive(mobileTopLinks);
  clearActive(mobileDropdownLinks);

  if (mobileServicesLink) {
    mobileServicesLink.classList.remove("active");
  }

  mobileTopLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  mobileDropdownLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
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
     CLICK FEEDBACK - DESKTOP
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
     CLICK FEEDBACK - MOBILE
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
      closeMobileMenu();
    });
  });

  /* =========================
     RESET MENU ON RESIZE
  ========================= */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();

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
    }
  });

  /* =========================
     CONTACT MODAL
  ========================= */
  if (contactModal) {
    openContactModalBtns.forEach((btn) => {
      btn.addEventListener("click", openModal);
    });

    if (closeContactModal) {
      closeContactModal.addEventListener("click", closeModal);
    }

    contactModal.addEventListener("click", (e) => {
      if (e.target === contactModal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && contactModal.classList.contains("active")) {
        closeModal();
      }
    });
  }

  /* =========================
     REVEAL ON SCROLL
  ========================= */
  if (revealItems.length) {
    const revealOnScroll = () => {
      const triggerBottom = window.innerHeight - 100;

      revealItems.forEach((item) => {
        const rect = item.getBoundingClientRect();

        if (rect.top < triggerBottom) {
          item.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
  }

  /* =========================
     SPC INTERACTIVE PANEL
  ========================= */
  if (
    spcSection &&
    spcItems.length &&
    spcContainer &&
    spcPanel &&
    spcActiveTitle &&
    spcActiveDesc
  ) {
    const defaultTitle = spcActiveTitle.innerHTML;
    const defaultDesc = "";

    const resetSpcPanel = () => {
      spcItems.forEach((item) => item.classList.remove("active"));

      spcContainer.classList.remove("has-active");
      spcPanel.classList.remove("active", "show-desc");

      spcActiveTitle.innerHTML = defaultTitle;
      spcActiveDesc.innerHTML = defaultDesc;
    };

    spcItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();

        spcItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");

        spcContainer.classList.add("has-active");
        spcPanel.classList.add("active", "show-desc");

        spcActiveTitle.innerHTML = item.dataset.title || defaultTitle;
        spcActiveDesc.innerHTML = item.dataset.desc || "";
      });
    });

    spcSection.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.addEventListener("click", () => {
      resetSpcPanel();
    });
  }

  /**Learnmore */
  const learnMoreButtons = document.querySelectorAll(".learnmore-btn");

  learnMoreButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetId = btn.dataset.target;
      const targetContent = document.getElementById(targetId);

      if (!targetContent) return;

      const isActive = targetContent.classList.contains("active");

      // Close all
      document.querySelectorAll(".learnmore-content").forEach((content) => {
        content.classList.remove("active");
      });

      document.querySelectorAll(".learnmore-btn").forEach((button) => {
        button.classList.remove("active");
        button.textContent = "Learn More";
      });

      // Open selected
      if (!isActive) {
        targetContent.classList.add("active");
        btn.classList.add("active");
        btn.textContent = "Show Less";
      }
    });
  });

  /**Projects tab */
  const tabGroups = document.querySelectorAll(".tabs-container");

  tabGroups.forEach((group) => {
    const tabs = group.querySelectorAll("a");

    tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        // Remove active from all tabs in THIS group only
        tabs.forEach((t) => t.classList.remove("active"));

        // Add active to clicked tab
        tab.classList.add("active");
      });
    });
  });

  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
