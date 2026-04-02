document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("contactSubmitBtn");
  const formStatusMessage = document.getElementById("formStatusMessage");

  if (!contactForm) return;

  const fields = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    contactNumber: document.getElementById("contactNumber"),
    emailAddress: document.getElementById("emailAddress"),
    company: document.getElementById("company"),
    serviceInterest: document.getElementById("serviceInterest"),
    message: document.getElementById("message")
  };

  const errorEls = {
    firstName: document.getElementById("firstNameError"),
    lastName: document.getElementById("lastNameError"),
    contactNumber: document.getElementById("contactNumberError"),
    emailAddress: document.getElementById("emailAddressError"),
    serviceInterest: document.getElementById("serviceInterestError"),
    message: document.getElementById("messageError")
  };

  const pageMap = {
    "index.html": "home",
    "about.html": "about",
    "services.html": "services",
    "projects.html": "projects",
    "project-and-construction-management.html": "project-and-construction-management",
    "environmental-services.html": "environmental-services",
    "civil-and-engineering-support.html": "civil-and-engineering-support",
    "scheduling-and-project-controls.html": "scheduling-and-project-controls",
    "special-inspection.html": "special-inspection",
    "technology-solutions.html": "technology-solutions"
  };

  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  const currentPage = pageMap[currentFile] || currentFile.replace(".html", "") || "unknown-page";

  function clearErrors() {
    Object.keys(errorEls).forEach((key) => {
      if (errorEls[key]) errorEls[key].textContent = "";
      if (fields[key]) fields[key].classList.remove("input-error");
    });

    formStatusMessage.textContent = "";
    formStatusMessage.className = "form-status-message";
  }

  function setError(fieldName, message) {
    if (errorEls[fieldName]) errorEls[fieldName].textContent = message;
    if (fields[fieldName]) fields[fieldName].classList.add("input-error");
  }

  function validateForm(data) {
    const errors = {};

    if (!data.first_name.trim()) {
      errors.firstName = "First name is required.";
    }

    if (!data.last_name.trim()) {
      errors.lastName = "Last name is required.";
    }

    if (!data.contact_number.trim()) {
      errors.contactNumber = "Contact number is required.";
    } else if (!/^[0-9+\-()\s]{7,20}$/.test(data.contact_number.trim())) {
      errors.contactNumber = "Enter a valid contact number.";
    }

    if (!data.email_address.trim()) {
      errors.emailAddress = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email_address.trim())) {
      errors.emailAddress = "Enter a valid email address.";
    }

    if (!data.service_interest.trim()) {
      errors.serviceInterest = "Please select a service.";
    }

    if (!data.message.trim()) {
      errors.message = "Message is required.";
    } else if (data.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    return errors;
  }

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    clearErrors();

    const payload = {
      first_name: fields.firstName.value,
      last_name: fields.lastName.value,
      contact_number: fields.contactNumber.value,
      email_address: fields.emailAddress.value,
      company: fields.company.value,
      service_interest: fields.serviceInterest.value,
      message: fields.message.value,
      form_source: "contact-modal",
      page_source: currentPage,
      hero_source: currentPage
    };

    const errors = validateForm(payload);

    if (Object.keys(errors).length) {
      Object.entries(errors).forEach(([field, message]) => {
        setError(field, message);
      });

      formStatusMessage.textContent = "Please correct the highlighted fields.";
      formStatusMessage.classList.add("error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      // simulate request delay (like real API)
      await new Promise(resolve => setTimeout(resolve, 800));

      console.log("=================================");
      console.log("CONTACT FORM SUBMISSION");
      console.log("=================================");
      console.log(payload);
      console.log("=================================");

      formStatusMessage.textContent = "Message sent successfully (console log).";
      formStatusMessage.classList.add("success");

      contactForm.reset();
    } catch (error) {
      console.error("Submission error:", error);

      formStatusMessage.textContent = "Something went wrong. Please try again.";
      formStatusMessage.classList.add("error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
});
