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
  const contactForm = document.getElementById("contactForm");

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

  // Cambiar estilo de navegación al hacer scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
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

  // Manejar el formulario de contacto (simulación)
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulación de envío (en un sitio real, aquí iría la lógica de envío al servidor)
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const mensaje = document.getElementById("mensaje").value;

      // Validación simple
      if (nombre && email && mensaje) {
        // Aquí iría el código para enviar los datos al servidor
        alert("¡Gracias por tu mensaje! Te responderemos lo antes posible.");
        contactForm.reset();
      } else {
        alert("Por favor, completa todos los campos del formulario.");
      }
    });
  }

  // Animación de aparición para los elementos al hacer scroll
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Elementos a animar
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("fade-in");
    observer.observe(section);
  });

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.classList.add("fade-in");
    observer.observe(item);
  });

  // Añadir clase para la animación en CSS
  const style = document.createElement("style");
  style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .gallery-item.fade-in {
            transition-delay: calc(0.1s * var(--i, 0));
        }
    `;
  document.head.appendChild(style);

  // Asignar índices para el retraso de la animación
  document.querySelectorAll(".gallery-item").forEach((item, i) => {
    item.style.setProperty("--i", i % 4);
  });
});
