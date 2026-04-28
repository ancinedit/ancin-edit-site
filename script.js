(() => {
  let currentIndex = 0;
  let images = [];

window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    document.body.classList.add("is-loaded");
  });
    
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

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeButton = document.querySelector(".lightbox-close");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

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
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImage.src = images[currentIndex].src;
    };

    const showPrev = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImage.src = images[currentIndex].src;
    };

    images.forEach((img, index) => {
      img.closest(".gallery-item").addEventListener("click", () => {
        openLightbox(index);
      });
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
  });

  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });

  const isInternalLink = (a) => {
    const href = a.getAttribute("href");
    if (!href) return false;
    if (href.startsWith("http")) return false;
    if (href.startsWith("#")) return false;
    if (href.startsWith("mailto:")) return false;
    if (href.startsWith("tel:")) return false;
    return true;
  };

});

})();
