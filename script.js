/* =========================================================
   HUZAIFA PORTFOLIO — INTERACTIONS & ANIMATIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     PAGE LOADER
     ======================================================= */

  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loader) {
        loader.classList.add("hide");
      }
    }, 700);
  });


  /* =======================================================
     NAVBAR SCROLL EFFECT
     ======================================================= */

  const navbar = document.querySelector(".navbar");

  const handleNavbar = () => {
    if (!navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleNavbar, {
    passive: true
  });

  handleNavbar();


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      menuButton.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuButton.classList.remove("active");
      });

    });
  }


  /* =======================================================
     SMOOTH ANCHOR SCROLL
     ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const navHeight = navbar
        ? navbar.offsetHeight
        : 80;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              observer.unobserve(entry.target);
            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     STAGGERED REVEAL
     ======================================================= */

  const groupedElements = [
    ".skills-wrapper .skill-card",
    ".video-grid .video-card",
    ".process-grid .process-card",
    ".services-list .service"
  ];

  groupedElements.forEach((selector) => {

    document.querySelectorAll(selector).forEach(
      (element, index) => {

        element.style.transitionDelay =
          `${index * 70}ms`;

      }
    );

  });


  /* =======================================================
     HERO VIDEO
     ======================================================= */

  const heroVideo =
    document.getElementById("heroVideo");

  if (heroVideo) {

    heroVideo.muted = true;

    const playHeroVideo = () => {

      const promise = heroVideo.play();

      if (promise !== undefined) {

        promise.catch(() => {
          // Autoplay may be blocked.
        });

      }

    };

    playHeroVideo();

    document.addEventListener(
      "visibilitychange",
      () => {

        if (document.hidden) {
          heroVideo.pause();
        } else {
          playHeroVideo();
        }

      }
    );

  }


  /* =======================================================
     HERO MOUSE PARALLAX
     ======================================================= */

  const background =
    document.querySelector(".background");

  const orbs =
    document.querySelectorAll(".orb");

  const grid =
    document.querySelector(".grid");

  const isTouchDevice =
    window.matchMedia("(pointer: coarse)").matches;

  if (!isTouchDevice) {

    window.addEventListener(
      "mousemove",
      (event) => {

        const x =
          (event.clientX / window.innerWidth - 0.5);

        const y =
          (event.clientY / window.innerHeight - 0.5);

        if (heroVideo) {

          heroVideo.style.transform =
            `translate(${x * 12}px, ${y * 12}px) scale(1.03)`;

        }

        if (grid) {

          grid.style.transform =
            `perspective(700px)
             rotateX(62deg)
             translate(${x * -12}px, ${y * -8}px)`;

        }

        orbs.forEach((orb, index) => {

          const strength =
            (index + 1) * 10;

          orb.style.transform =
            `translate(${x * strength}px, ${y * strength}px)`;

        });

      },
      { passive: true }
    );

  }


  /* =======================================================
     PARTICLE SYSTEM
     ======================================================= */

  const canvas =
    document.getElementById("particles");

  if (canvas) {

    const ctx = canvas.getContext("2d");

    let particles = [];
    let animationFrame;

    let width = 0;
    let height = 0;

    const mouse = {
      x: null,
      y: null,
      radius: 120
    };

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;


    const resizeCanvas = () => {

      const dpr =
        Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      createParticles();

    };


    const createParticles = () => {

      particles = [];

      const density =
        width < 700 ? 35 : 75;

      for (let i = 0; i < density; i++) {

        particles.push({

          x: Math.random() * width,

          y: Math.random() * height,

          size:
            Math.random() * 1.8 + 0.5,

          speedX:
            (Math.random() - 0.5) * 0.25,

          speedY:
            (Math.random() - 0.5) * 0.25,

          opacity:
            Math.random() * 0.55 + 0.15

        });

      }

    };


    const drawParticles = () => {

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      particles.forEach((particle) => {

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < -10)
          particle.x = width + 10;

        if (particle.x > width + 10)
          particle.x = -10;

        if (particle.y < -10)
          particle.y = height + 10;

        if (particle.y > height + 10)
          particle.y = -10;


        if (!reduceMotion) {

          const dx =
            particle.x -
            (mouse.x ?? -1000);

          const dy =
            particle.y -
            (mouse.y ?? -1000);

          const distance =
            Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {

            const force =
              (mouse.radius - distance) /
              mouse.radius;

            particle.x +=
              (dx / (distance || 1)) *
              force *
              0.8;

            particle.y +=
              (dy / (distance || 1)) *
              force *
              0.8;

          }

        }


        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          `rgba(255,255,255,${particle.opacity})`;

        ctx.fill();

      });


      if (!reduceMotion) {

        for (
          let i = 0;
          i < particles.length;
          i++
        ) {

          for (
            let j = i + 1;
            j < particles.length;
            j++
          ) {

            const dx =
              particles[i].x -
              particles[j].x;

            const dy =
              particles[i].y -
              particles[j].y;

            const distance =
              Math.sqrt(dx * dx + dy * dy);

            if (distance < 105) {

              const opacity =
                (1 - distance / 105) * 0.08;

              ctx.beginPath();

              ctx.moveTo(
                particles[i].x,
                particles[i].y
              );

              ctx.lineTo(
                particles[j].x,
                particles[j].y
              );

              ctx.strokeStyle =
                `rgba(255,255,255,${opacity})`;

              ctx.lineWidth = 0.5;

              ctx.stroke();

            }

          }

        }

      }

      if (!reduceMotion) {
        animationFrame =
          requestAnimationFrame(drawParticles);
      }

    };


    if (!reduceMotion) {

      window.addEventListener(
        "mousemove",
        (event) => {

          mouse.x = event.clientX;
          mouse.y = event.clientY;

        },
        { passive: true }
      );

    }


    window.addEventListener(
      "resize",
      resizeCanvas
    );


    resizeCanvas();
    drawParticles();

  }


  /* =======================================================
     VIDEO FILTERS
     ======================================================= */

  const filters =
    document.querySelectorAll(".filter");

  const videoCards =
    document.querySelectorAll(".video-card");

  filters.forEach((filter) => {

    filter.addEventListener("click", () => {

      const selected =
        filter.dataset.filter;

      filters.forEach((item) => {
        item.classList.remove("active");
      });

      filter.classList.add("active");


      videoCards.forEach((card) => {

        const category =
          card.dataset.category;

        const show =
          selected === "all" ||
          selected === category;

        if (show) {

          card.classList.remove("hidden");

          requestAnimationFrame(() => {

            card.style.opacity = "1";
            card.style.transform =
              "translateY(0)";

          });

        } else {

          card.style.opacity = "0";
          card.style.transform =
            "translateY(12px)";

          setTimeout(() => {
            card.classList.add("hidden");
          }, 250);

        }

      });

    });

  });


  /* =======================================================
     VIDEO LIGHTBOX
     ======================================================= */

  const lightbox =
    document.getElementById("lightbox");

  const lightboxClose =
    document.getElementById("lightboxClose");

  const lightboxVideo =
    document.getElementById("lightboxVideo");

  const lightboxMessage =
    document.getElementById("lightboxMessage");


  const openLightbox = (videoSource) => {

    if (!lightbox) return;

    lightbox.classList.add("open");

    document.body.style.overflow = "hidden";

    if (
      lightboxVideo &&
      videoSource
    ) {

      lightboxVideo.src = videoSource;

      if (lightboxMessage) {
        lightboxMessage.style.display =
          "none";
      }

      lightboxVideo.style.display =
        "block";

      lightboxVideo.play().catch(() => {});

    } else {

      if (lightboxVideo) {
        lightboxVideo.removeAttribute("src");
        lightboxVideo.style.display =
          "none";
      }

      if (lightboxMessage) {
        lightboxMessage.style.display =
          "block";
      }

    }

  };


  const closeLightbox = () => {

    if (!lightbox) return;

    lightbox.classList.remove("open");

    document.body.style.overflow = "";

    if (lightboxVideo) {

      lightboxVideo.pause();

      lightboxVideo.removeAttribute("src");

      lightboxVideo.load();

    }

  };


  videoCards.forEach((card) => {

    card.addEventListener("click", () => {

      const video =
        card.querySelector("video");

      const source =
        video?.currentSrc ||
        video?.querySelector("source")?.src ||
        card.dataset.video ||
        "";

      openLightbox(source);

    });

  });


  if (lightboxClose) {

    lightboxClose.addEventListener(
      "click",
      closeLightbox
    );

  }


  if (lightbox) {

    lightbox.addEventListener(
      "click",
      (event) => {

        if (event.target === lightbox) {
          closeLightbox();
        }

      }
    );

  }


  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {
        closeLightbox();
      }

    }
  );


  /* =======================================================
     CUSTOM CURSOR
     ======================================================= */

  if (!isTouchDevice) {

    const cursorDot =
      document.createElement("div");

    const cursorRing =
      document.createElement("div");

    cursorDot.className =
      "cursor-dot";

    cursorRing.className =
      "cursor-ring";

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);


    let cursorX = 0;
    let cursorY = 0;

    let ringX = 0;
    let ringY = 0;


    window.addEventListener(
      "mousemove",
      (event) => {

        cursorX = event.clientX;
        cursorY = event.clientY;

        cursorDot.style.left =
          `${cursorX}px`;

        cursorDot.style.top =
          `${cursorY}px`;

      },
      { passive: true }
    );


    const animateCursor = () => {

      ringX +=
        (cursorX - ringX) * 0.14;

      ringY +=
        (cursorY - ringY) * 0.14;

      cursorRing.style.left =
        `${ringX}px`;

      cursorRing.style.top =
        `${ringY}px`;

      requestAnimationFrame(
        animateCursor
      );

    };

    animateCursor();


    document
      .querySelectorAll(
        "a, button, .video-card, .skill-card, .service"
      )
      .forEach((element) => {

        element.addEventListener(
          "mouseenter",
          () => {
            document.body.classList.add(
              "cursor-hover"
            );
          }
        );

        element.addEventListener(
          "mouseleave",
          () => {
            document.body.classList.remove(
              "cursor-hover"
            );
          }
        );

      });

  }


  /* =======================================================
     3D TILT EFFECT
     ======================================================= */

  if (!isTouchDevice) {

    const tiltElements =
      document.querySelectorAll(
        ".skill-card, .process-card"
      );

    tiltElements.forEach((element) => {

      element.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            element.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const centerX =
            rect.width / 2;

          const centerY =
            rect.height / 2;

          const rotateX =
            (y - centerY) / 25;

          const rotateY =
            (centerX - x) / 25;

          element.style.transform =
            `perspective(700px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

        }
      );


      element.addEventListener(
        "mouseleave",
        () => {

          element.style.transform = "";

        }
      );

    });

  }


  /* =======================================================
     BUTTON PRESS / RIPPLE EFFECT
     ======================================================= */

  document
    .querySelectorAll(".btn, .filter, .nav-button")
    .forEach((button) => {

      button.addEventListener(
        "pointerdown",
        () => {

          button.style.transform =
            "scale(0.94)";

        }
      );


      button.addEventListener(
        "pointerup",
        () => {

          button.style.transform = "";

        }
      );


      button.addEventListener(
        "pointercancel",
        () => {

          button.style.transform = "";

        }
      );


      button.addEventListener(
        "pointerleave",
        () => {

          button.style.transform = "";

        }
      );

    });


  /* =======================================================
     SERVICE HOVER MOTION
     ======================================================= */

  document
    .querySelectorAll(".service")
    .forEach((service) => {

      service.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            service.getBoundingClientRect();

          const x =
            ((event.clientX - rect.left) /
              rect.width) * 100;

          service.style.setProperty(
            "--mouse-x",
            `${x}%`
          );

        }
      );

    });


  /* =======================================================
     ACTIVE NAV LINK
     ======================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".nav-links a"
    );


  if (
    "IntersectionObserver" in window &&
    sections.length
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting)
              return;

            const id =
              entry.target.id;

            navLinks.forEach((link) => {

              link.classList.remove(
                "active"
              );

              if (
                link.getAttribute("href") ===
                `#${id}`
              ) {

                link.classList.add(
                  "active"
                );

              }

            });

          });

        },
        {
          threshold: 0.35
        }
      );


    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

  }


  /* =======================================================
     IMAGE / VIDEO ERROR SAFETY
     ======================================================= */

  document
    .querySelectorAll("img")
    .forEach((image) => {

      image.addEventListener(
        "error",
        () => {
          image.style.display = "none";
        }
      );

    });


  /* =======================================================
     YEAR
     ======================================================= */

  const yearElements =
    document.querySelectorAll(
      "[data-current-year]"
    );

  yearElements.forEach((element) => {

    element.textContent =
      new Date().getFullYear();

  });


  /* =======================================================
     PAGE READY
     ======================================================= */

  document.body.classList.add(
    "page-ready"
  );

});
