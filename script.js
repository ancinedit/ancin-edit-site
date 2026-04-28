(() => {
  let currentIndex = 0;
  let images = [];

  window.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
      contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);

        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        if (response.ok) {
          window.location.href = "thank-you.html";
        } else {
          alert("Something went wrong. Please try again.");
        }
      });
    }

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeButton = document.querySelector(".lightbox-close");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (lightbox && lightboxImage) {
      images = Array.from(document.querySelectorAll(".gallery-item img"));

      const openLightbox = (index) => {
        currentIndex = index;
        lightboxImage.src = images[currentIndex].src;
        lightbox.classList.add("active");
      };

      const closeLightbox = () => {
        lightbox.classList.remove("active");
      };

      const showNext = () => {
        if (!images.length) return;
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImage.src = images[currentIndex].src;
      };

      const showPrev = () => {
        if (!images.length) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentIndex].src;
      };

      images.forEach((img, index) => {
        const item = img.closest(".gallery-item");
        if (item) {
          item.addEventListener("click", () => {
            openLightbox(index);
          });
        }
      });

      if (closeButton) closeButton.addEventListener("click", closeLightbox);
      if (nextBtn) nextBtn.addEventListener("click", showNext);
      if (prevBtn) prevBtn.addEventListener("click", showPrev);

      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
      });

      document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;

        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
      });
    }

    const path = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach((a) => {
      const href = a.getAttribute("href");
      a.classList.toggle("active", href === path);
    });
  });
})();
