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
  const searchItems = [
    {
      title: "Home",
      keywords: ["home", "landing", "main", "index"],
      url: "index.html",
    },
    {
      title: "About",
      keywords: ["about", "company", "who we are", "team", "mission"],
      url: "about.html",
    },
    {
      title: "Projects",
      keywords: ["projects", "work", "portfolio", "featured projects"],
      url: "projects.html",
    },
    {
      title: "Services",
      keywords: ["services", "what we do", "solutions"],
      url: "services.html",
    },
    {
      title: "Project & Construction Management",
      keywords: ["project management", "construction management", "pcm"],
      url: "project-and-construction-management.html",
    },
    {
      title: "Environmental Services",
      keywords: [
        "environmental",
        "environmental services",
        "hazardous waste",
        "air permit",
      ],
      url: "environmental-services.html",
    },
    {
      title: "Civil & Engineering Support",
      keywords: [
        "civil",
        "engineering support",
        "technical review",
        "constructability",
      ],
      url: "civil-and-engineering-support.html",
    },
    {
      title: "Scheduling & Project Controls",
      keywords: ["scheduling", "project controls", "primavera", "p6", "cpm"],
      url: "scheduling-and-project-controls.html",
    },
    {
      title: "Special Inspection",
      keywords: ["special inspection", "inspection", "quality control"],
      url: "special-inspection.html",
    },
    {
      title: "Technology Solutions",
      keywords: [
        "technology",
        "technology solutions",
        "procore",
        "bim",
        "digital tools",
      ],
      url: "technology-solutions.html",
    },
    {
      title: "Additional Services",
      keywords: [
        "additional services",
        "claims",
        "dispute resolution",
        "consulting",
      ],
      url: "services.html#additional",
    },
    {
      title: "Contact",
      keywords: ["contact", "get in touch", "consultation", "email", "phone"],
      url: "#contactModal",
      action: "modal",
    },
  ];

  const desktopSearchWrapper = desktopSearchInput
    ? desktopSearchInput.closest(".nav-search")
    : null;

  const mobileSearchWrapper = mobileSearchInput
    ? mobileSearchInput.closest(".nav-search")
    : null;

  function createSuggestionsBox(wrapper, type) {
    if (!wrapper) return null;

    let box = wrapper.querySelector(`.search-suggestions.${type}`);
    if (box) return box;

    box = document.createElement("div");
    box.className = `search-suggestions ${type}`;
    wrapper.appendChild(box);

    return box;
  }

  const desktopSuggestionsBox = createSuggestionsBox(
    desktopSearchWrapper,
    "desktop",
  );
  const mobileSuggestionsBox = createSuggestionsBox(
    mobileSearchWrapper,
    "mobile",
  );

  function syncSearchInputs(value, source) {
    if (source !== "desktop" && desktopSearchInput) {
      desktopSearchInput.value = value;
    }

    if (source !== "mobile" && mobileSearchInput) {
      mobileSearchInput.value = value;
    }
  }

  function normalizeText(text) {
    return text.toLowerCase().trim();
  }

  function scoreSearchItem(item, query) {
    const normalizedQuery = normalizeText(query);
    const title = normalizeText(item.title);
    const keywords = item.keywords.map(normalizeText);

    let score = 0;

    if (title === normalizedQuery) score += 100;
    if (keywords.includes(normalizedQuery)) score += 90;
    if (title.startsWith(normalizedQuery)) score += 70;
    if (keywords.some((keyword) => keyword.startsWith(normalizedQuery)))
      score += 60;
    if (title.includes(normalizedQuery)) score += 40;
    if (keywords.some((keyword) => keyword.includes(normalizedQuery)))
      score += 30;

    return score;
  }

  function getSearchSuggestions(query) {
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) return [];

    return searchItems
      .map((item) => ({
        ...item,
        score: scoreSearchItem(item, normalizedQuery),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }

  function renderSuggestions(box, suggestions) {
    if (!box) return;

    if (!suggestions.length) {
      box.innerHTML = "";
      box.classList.remove("active");
      return;
    }

    box.innerHTML = suggestions
      .map(
        (item) => `
        <button
          type="button"
          class="search-suggestion-item"
          data-url="${item.url}"
          data-action="${item.action || "link"}"
        >
          <span class="search-suggestion-title">${item.title}</span>
          <span class="search-suggestion-url">${item.url}</span>
        </button>
      `,
      )
      .join("");

    box.classList.add("active");
  }

  function hideSuggestions() {
    if (desktopSuggestionsBox) {
      desktopSuggestionsBox.innerHTML = "";
      desktopSuggestionsBox.classList.remove("active");
    }

    if (mobileSuggestionsBox) {
      mobileSuggestionsBox.innerHTML = "";
      mobileSuggestionsBox.classList.remove("active");
    }
  }

  function openSearchResult(item) {
    if (!item) return;

    if (item.action === "modal" && item.url === "#contactModal") {
      const contactModal = document.getElementById("contactModal");
      if (contactModal) {
        contactModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
      return;
    }

    window.location.href = item.url;
  }

  function handleNavSearch(value, source) {
    const suggestions = getSearchSuggestions(value);

    syncSearchInputs(value, source);

    if (source === "desktop") {
      renderSuggestions(desktopSuggestionsBox, suggestions);
      renderSuggestions(mobileSuggestionsBox, suggestions);
    } else {
      renderSuggestions(mobileSuggestionsBox, suggestions);
      renderSuggestions(desktopSuggestionsBox, suggestions);
    }
  }

  function handleSearchEnter(value) {
    const suggestions = getSearchSuggestions(value);
    if (!suggestions.length) return;

    openSearchResult(suggestions[0]);
  }

  function bindSearchInput(input, source) {
    if (!input) return;

    input.addEventListener("input", function () {
      handleNavSearch(this.value, source);
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearchEnter(this.value);
      }
    });

    input.addEventListener("focus", function () {
      if (this.value.trim() !== "") {
        handleNavSearch(this.value, source);
      }
    });
  }

  bindSearchInput(desktopSearchInput, "desktop");
  bindSearchInput(mobileSearchInput, "mobile");

  document.addEventListener("click", function (e) {
    const suggestionButton = e.target.closest(".search-suggestion-item");

    if (suggestionButton) {
      const matchedItem = searchItems.find(
        (item) =>
          item.url === suggestionButton.dataset.url &&
          (item.action || "link") === suggestionButton.dataset.action,
      );

      if (matchedItem) {
        openSearchResult(matchedItem);
        hideSuggestions();

        if (desktopSearchInput) desktopSearchInput.value = matchedItem.title;
        if (mobileSearchInput) mobileSearchInput.value = matchedItem.title;
      }

      return;
    }

    const clickedInsideDesktop =
      desktopSearchWrapper && desktopSearchWrapper.contains(e.target);
    const clickedInsideMobile =
      mobileSearchWrapper && mobileSearchWrapper.contains(e.target);

    if (!clickedInsideDesktop && !clickedInsideMobile) {
      hideSuggestions();
    }
  });

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
