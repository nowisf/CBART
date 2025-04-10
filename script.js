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

      // Verificar si la sección "Sobre mí" está en la vista
      const aboutSection = document.getElementById("sobre-mi");
      const aboutRect = aboutSection.getBoundingClientRect();

      // Si la sección "Sobre mí" está en la vista, reducir la opacidad del blur
      if (aboutRect.top < window.innerHeight && aboutRect.bottom > 0) {
        blurOverlay.style.opacity = Math.min(opacityValue * 0.5, 0.15);
      }
    } else {
      blurOverlay.classList.remove("active");
    }

    // Proteger el texto de las secciones importantes
    const aboutSection = document.getElementById("sobre-mi");
    const contactSection = document.getElementById("contacto");
    const aboutContent = document.querySelector(".about-content");
    const contactInfo = document.querySelector(".contact-info");
    const sobreMiTitle = document.querySelector("#sobre-mi h2");
    const contactTitle = document.querySelector("#contacto h2");
    const aboutText = document.querySelector(".about-text");
    const contactInfoItems = document.querySelectorAll(".contact-info p");
    const socialLinks = document.querySelector(".social-links");

    if (aboutSection && contactSection) {
      const aboutRect = aboutSection.getBoundingClientRect();
      const contactRect = contactSection.getBoundingClientRect();

      // Proteger los textos con z-index
      if (aboutContent) {
        aboutContent.style.zIndex = "91";
        aboutSection.style.zIndex = "2";
      }
      if (contactInfo) {
        contactInfo.style.zIndex = "91";
        contactSection.style.zIndex = "2";
      }
      if (sobreMiTitle) sobreMiTitle.style.zIndex = "93";
      if (contactTitle) contactTitle.style.zIndex = "93";
      if (aboutText) aboutText.style.zIndex = "93";
      if (socialLinks) socialLinks.style.zIndex = "93";
      contactInfoItems.forEach((item) => (item.style.zIndex = "93"));
    }

    // Añadir efecto de halo a los títulos durante el scroll
    sectionTitles.forEach((title) => {
      const rect = title.getBoundingClientRect();

      // Comprobar si es el título de la sección "Sobre mí"
      const isSobreMiTitle =
        title.parentElement && title.parentElement.id === "sobre-mi";

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const titleVisibility =
          1 -
          Math.abs(rect.top - window.innerHeight / 2) /
            (window.innerHeight / 2);

        // No aplicar efecto de halo/glow al título de "Sobre mí"
        if (titleVisibility > 0.7 && !isSobreMiTitle) {
          title.classList.add("glow-effect");
        } else {
          title.classList.remove("glow-effect");
        }

        // Asegurar que el título de "Sobre mí" siempre tenga opacidad completa
        if (isSobreMiTitle) {
          title.style.opacity = 1;
          title.style.color = "var(--color-accent)"; // Mantener el color original
        }
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

        // No aplicar efecto de transparencia a la sección "Sobre mí"
        if (section.id === "sobre-mi") {
          // Aplicar solo movimiento sutil
          section.style.transform = `translateY(${scrollPercent * -10}px)`;
          section.style.opacity = 1; // Mantener opacidad completa
        } else {
          // Para otras secciones, aplicar el efecto completo
          section.style.transform = `translateY(${
            scrollPercent * -30
          }px) scale(${1 + Math.abs(scrollPercent) * 0.05})`;
          section.style.opacity = 0.6 + Math.abs(scrollPercent) * 0.4;
        }
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

    // Efecto de sombreado para el título "Sobre Mí" al hacer scroll
    const aboutTitle = document.querySelector("#sobre-mi h2");
    const aboutRect = document
      .getElementById("sobre-mi")
      .getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Si la sección "Sobre Mí" está visible
    if (aboutRect.top < windowHeight && aboutRect.bottom > 0) {
      // Calcular cuánto ha entrado en la vista (como porcentaje)
      const visibilityPercent = 1 - aboutRect.top / windowHeight;

      // Limitar el valor entre 0 y 1
      const limitedVisibility = Math.max(
        0,
        Math.min(1, visibilityPercent * 1.5)
      );

      // Aplicar efecto de sombreado y transformación basado en el scroll
      const shadowBlur = 5 + limitedVisibility * 15;
      const shadowOpacity = 0.5 + limitedVisibility * 0.5;
      const translateY = -5 * limitedVisibility;
      const scale = 1 + 0.05 * limitedVisibility;

      aboutTitle.style.textShadow = `0 2px ${shadowBlur}px rgba(201, 168, 117, ${shadowOpacity})`;
      aboutTitle.style.transform = `translateY(${translateY}px) scale(${scale})`;

      // Aplicar brillo al título según la posición
      if (limitedVisibility > 0.6) {
        // Aumentar gradualmente el brillo
        const glowIntensity = (limitedVisibility - 0.6) * 2.5; // 0 a 1 cuando va de 0.6 a 1
        aboutTitle.style.boxShadow = `0 6px 20px rgba(0, 0, 0, 0.4), 
                                     inset 0 1px 1px rgba(255, 255, 255, 0.1),
                                     0 0 ${
                                       10 + glowIntensity * 20
                                     }px rgba(201, 168, 117, ${
          glowIntensity * 0.5
        })`;

        // Efecto de cambio de color
        if (limitedVisibility > 0.8) {
          const colorIntensity = (limitedVisibility - 0.8) * 5; // 0 a 1 cuando va de 0.8 a 1
          aboutTitle.style.color = `rgb(255, ${201 + colorIntensity * 54}, ${
            117 + colorIntensity * 138
          })`;
        }
      } else {
        // Restablecer cuando no está en la posición óptima
        aboutTitle.style.boxShadow = `0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)`;
        aboutTitle.style.color = "var(--color-accent)";
      }
    }
  });

  // Función para abrir el modal
  function openModal(imgSrc, index) {
    modal.classList.add("show");
    modalImg.src = imgSrc;
    currentImgIndex = index;
    document.body.style.overflow = "hidden";
  }

  // Función para cerrar el modal
  function closeModalFunc() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }

  // Asignar evento de clic a cada elemento de la galería
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      const imgSrc = this.querySelector("img").src;
      openModal(imgSrc, index);
    });
  });

  // Cerrar modal al hacer clic en la X
  closeModal.addEventListener("click", closeModalFunc);

  // Cerrar modal al hacer clic fuera de la imagen
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  // Cerrar modal con la tecla Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModalFunc();
    }
  });

  // Función para navegar a la imagen anterior
  function prevImage() {
    currentImgIndex =
      currentImgIndex > 0 ? currentImgIndex - 1 : galleryImages.length - 1;
    modalImg.src = galleryImages[currentImgIndex].src;
  }

  // Función para navegar a la siguiente imagen
  function nextImage() {
    currentImgIndex =
      currentImgIndex < galleryImages.length - 1 ? currentImgIndex + 1 : 0;
    modalImg.src = galleryImages[currentImgIndex].src;
  }

  // Asignar eventos de clic a los botones de navegación
  prevBtn.addEventListener("click", prevImage);
  nextBtn.addEventListener("click", nextImage);

  // Navegar con las teclas de flecha
  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("show")) return;

    if (e.key === "ArrowLeft") {
      prevImage();
    } else if (e.key === "ArrowRight") {
      nextImage();
    }
  });

  // Navegación suave para los enlaces internos
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Offset para compensar la barra de navegación fija
        const navHeight = nav.offsetHeight;
        const targetPosition =
          targetSection.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
