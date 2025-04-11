document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeModal = document.querySelector(".close-modal");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const nav = document.querySelector("nav");
  const sectionTitles = document.querySelectorAll("section h2");

  // Crear contenedor para el efecto de desenfoque
  const body = document.querySelector("body");
  const blurOverlay = document.createElement("div");
  blurOverlay.classList.add("blur-overlay");
  body.appendChild(blurOverlay);

  let currentImgIndex = 0;
  const galleryImages = Array.from(
    document.querySelectorAll(".gallery-item img")
  );

  // Función para manejar el menú móvil
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  // Cerrar el menú al hacer clic en un enlace
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
    });
  });

  // Añadir clase para efecto de rotación 3D a las imágenes
  galleryItems.forEach((item) => {
    item.classList.add("rotate-3d-effect");
  });

  // Cambiar estilo de navegación y aplicar desenfoque al hacer scroll
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / maxScroll;

    // Navegación
    if (scrollPosition > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    // Efecto de desenfoque exagerado basado en el scroll
    const opacityValue = Math.min(scrollPosition / 500, 0.4); // Aumentado a 40% máximo
    blurOverlay.style.opacity = opacityValue;

    // Activar blur más intenso después de cierto umbral
    if (scrollPosition > 200) {
      blurOverlay.classList.add("active");
    } else {
      blurOverlay.classList.remove("active");
    }

    // Proteger el texto de las secciones importantes
    const contactSection = document.getElementById("contacto");
    const contactInfo = document.querySelector(".contact-info");
    const contactTitle = document.querySelector("#contacto h2");
    const contactInfoItems = document.querySelectorAll(".contact-info p");
    const socialLinks = document.querySelector(".social-links");

    if (contactSection) {
      const contactRect = contactSection.getBoundingClientRect();

      // Proteger los textos con z-index
      if (contactInfo) {
        contactInfo.style.zIndex = "91";
        contactSection.style.zIndex = "2";
      }
      if (contactTitle) contactTitle.style.zIndex = "93";
      if (socialLinks) socialLinks.style.zIndex = "93";
      contactInfoItems.forEach((item) => (item.style.zIndex = "93"));
    }

    // Añadir efecto de halo a los títulos durante el scroll
    sectionTitles.forEach((title) => {
      const rect = title.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const titleVisibility =
          1 -
          Math.abs(rect.top - window.innerHeight / 2) /
            (window.innerHeight / 2);

        if (titleVisibility > 0.7) {
          title.classList.add("glow-effect");
        } else {
          title.classList.remove("glow-effect");
        }
      } else {
        title.classList.remove("glow-effect");
      }
    });

    // Añadir efecto de parallax más exagerado a secciones
    document.querySelectorAll("section").forEach((section) => {
      const rect = section.getBoundingClientRect();

      // Si la sección está visible en la pantalla
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const sectionCenter = rect.top + rect.height / 2;
        const distanceFromCenter = window.innerHeight / 2 - sectionCenter;
        const maxDistance = window.innerHeight / 2;
        const scrollPercent = distanceFromCenter / maxDistance;

        // Para todas las secciones, aplicar el efecto completo
        section.style.transform = `translateY(${scrollPercent * -30}px) scale(${
          1 + Math.abs(scrollPercent) * 0.05
        })`;
        section.style.opacity = 0.6 + Math.abs(scrollPercent) * 0.4;
      }
    });

    // Efecto de rotación 3D para imágenes al scroll
    galleryItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const itemCenter = rect.top + rect.height / 2;
        const distanceFromCenter = window.innerHeight / 2 - itemCenter;
        const scrollPercent = distanceFromCenter / (window.innerHeight / 2);

        // Aplicar rotación 3D basada en la posición del scroll
        const rotateX = scrollPercent * 10; // Rotación en eje X
        const rotateY = (index % 2 === 0 ? -1 : 1) * scrollPercent * 15; // Rotación en eje Y

        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });

    // Marcar enlaces activos al hacer scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      // 300px de offset para activar la sección un poco antes
      if (window.scrollY >= sectionTop - 300) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  // Funcionalidad del modal de imágenes
  function openModal(imgSrc, index) {
    modal.classList.add("show");
    modalImg.src = imgSrc;
    currentImgIndex = index;
    document.body.style.overflow = "hidden"; // Prevenir scroll
  }

  function closeModalFunc() {
    modal.classList.remove("show");
    document.body.style.overflow = ""; // Permitir scroll
  }

  closeModal.addEventListener("click", closeModalFunc);

  // Cerrar modal al hacer clic fuera de la imagen
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  // Cerrar modal con tecla ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModalFunc();
    }
    // Navegación con teclas de flecha
    if (modal.classList.contains("show")) {
      if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    }
  });

  function prevImage() {
    currentImgIndex =
      (currentImgIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImg.src = galleryImages[currentImgIndex].src;
  }

  function nextImage() {
    currentImgIndex = (currentImgIndex + 1) % galleryImages.length;
    modalImg.src = galleryImages[currentImgIndex].src;
  }

  prevBtn.addEventListener("click", prevImage);
  nextBtn.addEventListener("click", nextImage);

  // Abrir modal al hacer clic en imágenes de la galería
  galleryItems.forEach((item, index) => {
    const img = item.querySelector("img");
    item.addEventListener("click", function () {
      openModal(img.src, index);
    });
  });

  // Crear overlay para cada imagen
  galleryItems.forEach((item) => {
    const overlay = item.querySelector(".overlay");
    const span = document.createElement("span");
    span.textContent = "Ver";
    overlay.appendChild(span);
  });
});
