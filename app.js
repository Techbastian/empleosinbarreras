// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
const totalSlides = slides.length;

// Create dots
const dotsContainer = document.getElementById("carouselDots");
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

function updateCarousel() {
  const carousel = document.getElementById("serviceCarousel");
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update dots
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function moveSlide(direction) {
  currentSlide += direction;
  if (currentSlide >= totalSlides) currentSlide = 0;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  updateCarousel();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
}

// Auto-advance carousel
setInterval(() => {
  moveSlide(1);
}, 3000);

// Interactive Map (using Leaflet)
function initMap() {
  // Create map centered on Colombia
  const map = L.map("interactive-map").setView([4.6097, -74.0817], 8);

  // Add tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Add markers for major Colombian cities
  const departments = [
    {
      name: "La Guajira",
      coords: [11.55, -72.35],
      municipios: ["Riohacha", "Manaure"],
    },
    {
      name: "Atlántico",
      coords: [10.96854, -74.78132],
      municipios: [
        "Barranquilla",
        "Soledad",
        "Malambo",
        "Galapa",
        "Puerto Colombia",
      ],
    },
    {
      name: "Magdalena",
      coords: [10.4215, -74.3312],
      municipios: ["Santa Marta"],
    },
    {
      name: "Bolívar",
      coords: [9.5937, -74.9959],
      municipios: ["Cartagena", "María la Baja"],
    },
    {
      name: "Norte de Santander",
      coords: [7.9009, -72.8837],
      municipios: ["Cúcuta", "Villa del Rosario", "Los Patios", "El Zulia"],
    },
    {
      name: "Antioquia",
      coords: [6.25184, -75.56359],
      municipios: ["Medellín", "Bello", "Envigado", "Itaguí", "Zabaneta"],
    },
    {
      name: "Santander",
      coords: [6.994, -73.1363],
      municipios: ["Bucaramanga", "Pie de Cuesta", "Girón", "Floridablanca"],
    },
    {
      name: "Risaralda",
      coords: [4.8133, -75.6961],
      municipios: [
        "Pereira",
        "Marsella",
        "Dosquebradas",
        "Santa Rosa de Cabal",
      ],
    },
    {
      name: "Caldas",
      coords: [5.0689, -75.5173],
      municipios: ["Manizales", "Villa María"],
    },
    {
      name: "Cundinamarca",
      coords: [4.60971, -74.08175],
      municipios: ["Bogotá", "Chía", "Mosquera", "Soacha", "Cota", "Funza"],
    },
    { name: "Quindío", coords: [4.5385, -75.6601], municipios: ["Circasia"] },
    {
      name: "Valle del Cauca",
      coords: [3.43722, -76.5225],
      municipios: ["Cali", "Jamundí", "Palmira", "Yumbo", "Cartago"],
    },
    {
      name: "Tolima",
      coords: [4.4389, -75.2324],
      municipios: ["Manizales", "Villa María"],
    },
    {
      name: "Cauca",
      coords: [2.4419, -76.606],
      municipios: ["Santander de Quilichao"],
    },
  ];

  departments.forEach((city) => {
    const marker = L.marker(city.coords).addTo(map);
    marker.bindTooltip(city.name, {
      permanent: true,
      direction: "top",
      className: "marker-label",
    });
    marker.bindPopup(`
            <div style="text-align: center;">
              <h3>${city.name}</h3>
              <p><strong>Municipios:</strong></p>
              <ul style="text-align:left; display:inline-block; margin:0; padding-left:20px;">
                ${city.municipios.map((m) => `<li>${m}</li>`).join("")}
              </ul>
            </div>
          `);
  });
}

// Form submission
// (Form removed - using Google Forms instead)

// Load map when page loads
window.addEventListener("load", function () {
  // Add Leaflet CSS and JS
  const leafletCSS = document.createElement("link");
  leafletCSS.rel = "stylesheet";
  leafletCSS.href =
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css";
  document.head.appendChild(leafletCSS);

  const leafletJS = document.createElement("script");
  leafletJS.src =
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js";
  leafletJS.onload = initMap;
  document.head.appendChild(leafletJS);
});

// Smooth scrolling for internal links
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
