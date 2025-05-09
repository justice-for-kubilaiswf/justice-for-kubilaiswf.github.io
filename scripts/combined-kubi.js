function setParticlesHeight() {
  const particlesContainer = document.getElementById('particles-js');
  if (particlesContainer) {
    particlesContainer.style.height = Math.max(window.innerHeight, document.body.scrollHeight) + 'px';
  }
}

function startParticles() {
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 120,          // Slightly increased for better distribution
        "density": {
          "enable": true,
          "value_area": 1500   // Increased to spread particles more evenly
        }
      },
      "color": { "value": "#4a4a54" },
      "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000" } },
      "opacity": { "value": 0.5, "random": true }, // Added randomness to opacity
      "size": { "value": 2, "random": true },      // Added size randomness
      "line_linked": {
        "enable": true,
        "distance": 150,       // Reduced connection distance
        "color": "#4a4a54",
        "opacity": 0.4,        // Slightly reduced opacity for subtler connections
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 0.8,          // Increased speed to prevent clumping
        "direction": "none",
        "random": true,        // Add randomness to movement
        "straight": false,
        "out_mode": "bounce",  // Changed to bounce to keep particles in view
        "bounce": true,
        "attract": { "enable": false } // Disabled the attract feature that causes clumping
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "grab" },
        "onclick": { "enable": false, "mode": "push" },
        "resize": true
      },
      "modes": {
        "grab": { "distance": 150, "line_linked": { "opacity": 0.6 } },
        "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
        "repulse": { "distance": 200, "duration": 0.4 },
        "push": { "particles_nb": 4 },
        "remove": { "particles_nb": 2 }
      }
    },
    "retina_detect": true
  });
}

(function addSmoothMouseAttract() {
  let mouse = { x: null, y: null };
  let smoothMouse = { x: null, y: null };
  let isOverCanvas = false;
  const smoothing = 0.12;

  const particlesEl = document.getElementById('particles-js');
  let canvas = null;
  function updateCanvasRef() {
    if (particlesEl) {
      canvas = particlesEl.querySelector('canvas');
    }
  }
  setTimeout(updateCanvasRef, 500);

  document.addEventListener('mousemove', function (e) {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    // devicePixelRatio düzeltmesi eklendi
    const dpr = window.devicePixelRatio || 1;
    if (
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom
    ) {
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
      isOverCanvas = true;
    } else {
      isOverCanvas = false;
    }
  });

  if (particlesEl) {
    particlesEl.addEventListener('mouseleave', function () {
      isOverCanvas = false;
    });
    particlesEl.addEventListener('mouseenter', function () {
      isOverCanvas = true;
    });
  }

  function animateSmoothMouse() {
    if (isOverCanvas && mouse.x !== null && mouse.y !== null) {
      if (smoothMouse.x === null || smoothMouse.y === null) {
        smoothMouse.x = mouse.x;
        smoothMouse.y = mouse.y;
      } else {
        smoothMouse.x += (mouse.x - smoothMouse.x) * smoothing;
        smoothMouse.y += (mouse.y - smoothMouse.y) * smoothing;
      }
      if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.interactivity.mouse.pos_x = smoothMouse.x;
        window.pJSDom[0].pJS.interactivity.mouse.pos_y = smoothMouse.y;
        window.pJSDom[0].pJS.interactivity.status = 'mousemove';
      }
    } else {
      if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.interactivity.mouse.pos_x = null;
        window.pJSDom[0].pJS.interactivity.mouse.pos_y = null;
        window.pJSDom[0].pJS.interactivity.status = 'mouseleave';
      }
    }
    requestAnimationFrame(animateSmoothMouse);
  }
  animateSmoothMouse();
})();

document.addEventListener('DOMContentLoaded', () => {
  setParticlesHeight();
  startParticles();
  setTimeout(() => {
    setParticlesHeight();
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
      window.pJSDom[0].pJS.fn.canvasSize();
    }
  }, 100);
});

window.addEventListener('resize', () => {
  setParticlesHeight();
  if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
    window.pJSDom[0].pJS.fn.canvasSize();
  }
});

window.addEventListener('scroll', setParticlesHeight);


document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');

        const sectionTitle = entry.target.querySelector('.section-title');
        if (sectionTitle) {
          sectionTitle.classList.add('show');
        }
      } else {
        if (!entry.target.classList.contains('intro')) {
          entry.target.classList.remove('show');
        }
      }
    });
  }, { threshold: 0.15 });

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
});

// Theme Switcher JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  // Function to set the theme
  function setTheme(theme) {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Remove the animation class after animation completes
    setTimeout(() => {
      document.body.classList.remove("theme-transition");
    }, 1000);
  }

  // Function to toggle between themes
  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    // Use saved preference if available
    setTheme(savedTheme);
  } else {
    // Otherwise use system preference
    setTheme(prefersDark ? "dark" : "light");
  }

  // Add click event to theme toggle button - ensure the entire button is clickable
  if (themeToggle) {
    themeToggle.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent any default behavior
      toggleTheme();

      // Add a small animation to the toggle button
      themeToggle.style.transform = "scale(0.8)";
      setTimeout(() => {
        themeToggle.style.transform = "";
      }, 200);
    });

    // Make sure the SVG elements don't interfere with the click
    const svgElements = themeToggle.querySelectorAll('svg');
    svgElements.forEach(svg => {
      svg.addEventListener('click', (e) => {
        // Prevent event bubbling and ensure the parent button gets the click
        e.stopPropagation();
        themeToggle.click();
      });

      // Same for the path inside SVG
      const paths = svg.querySelectorAll('path');
      paths.forEach(path => {
        path.addEventListener('click', (e) => {
          e.stopPropagation();
          themeToggle.click();
        });
      });
    });
  }

  // Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    // Only auto-change if user hasn't manually set a preference
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light");
    }
  });

  // Profil vektörel görselini temaya göre ayarla
  function updateProfileVector() {
    const theme = htmlElement.getAttribute("data-theme") || "dark";
    const vectorImg = document.querySelector('.profile-photo-vector');
    if (vectorImg) {
      if (theme === "light") {
        vectorImg.src = "images/vektorel-beyaz.webp";
        vectorImg.srcset = "images/vektorel-beyaz-small.webp 400w, images/vektorel-beyaz.webp 800w";
      } else {
        vectorImg.src = "images/vektorel-siyah.webp";
        vectorImg.srcset = "images/vektorel-siyah-small.webp 400w, images/vektorel-siyah.webp 800w";
      }
    }
  }
  updateProfileVector();
  // Tema değişince de güncelle
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      setTimeout(updateProfileVector, 10); // Tema geçişi sonrası güncelle
    });
  }

  // Sistem teması değişirse de güncelle
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    setTimeout(updateProfileVector, 10);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const phrases = [
    "junior developer",
    "software enthusiast",
    "web designer",
    "AI/ML enthusiast",
    "computer engineer",
    "WW2 history buff"
  ];

  const typingSpeed = 80;
  const erasingSpeed = 40;
  const delayBetweenPhrases = 1500;

  let phraseIndex = 0;
  let charIndex = 0;
  let isTyping = true;
  const textElement = document.getElementById("typing-text");

  function typeText() {
    if (isTyping) {
      if (charIndex < phrases[phraseIndex].length) {
        textElement.textContent += phrases[phraseIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        isTyping = false;
        setTimeout(typeText, delayBetweenPhrases);
      }
    } else {
      if (charIndex > 0) {
        textElement.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeText, erasingSpeed);
      } else {
        isTyping = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeText, typingSpeed);
      }
    }
  }

  typeText();

  const animatedTitle = document.querySelector('.animated-title');
  if (animatedTitle) {
    animatedTitle.classList.add('show');
  }
});

setTimeout(() => {
  console.clear();

  console.log(`%c
  
  █  █▀  ▄   ███   ▄█ █    ██   ▄█    ▄▄▄▄▄    ▄ ▄   ▄████  
  █▄█     █  █  █  ██ █    █ █  ██   █     ▀▄ █   █  █▀   ▀ 
  █▀▄  █   █ █ ▀ ▄ ██ █    █▄▄█ ██ ▄  ▀▀▀▀▄  █ ▄   █ █▀▀    
  █  █ █   █ █  ▄▀ ▐█ ███▄ █  █ ▐█  ▀▄▄▄▄▀   █  █  █ █      
    █  █▄ ▄█ ███    ▐     ▀   █  ▐            █ █ █   █     
   ▀    ▀▀▀                  █                 ▀ ▀     ▀    
                            ▀                                                            
    `, "color: red;");

  console.log(`Check my GitHub for more cool stuff: %chttps://github.com/kubilaiswf`, "color: red; text-decoration: underline;");
}, 500);
