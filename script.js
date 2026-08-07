const WHATSAPP_NUMBER = "13055550198"; // Cambia este numero por tu WhatsApp real en formato internacional. Ejemplo: 17861234567

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const langToggle = document.getElementById("langToggle");
const quoteForm = document.getElementById("quoteForm");

menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

let currentLang = "en";

function switchLanguage() {
  currentLang = currentLang === "en" ? "es" : "en";
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-en][data-es]").forEach((el) => {
    const text = el.dataset[currentLang];
    if (!text) return;
    el.textContent = text;
  });

  langToggle.textContent = currentLang === "en" ? "EN / ES" : "ES / EN";
}

langToggle?.addEventListener("click", switchLanguage);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

function buildWhatsAppMessage() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const property = document.getElementById("property").value;
  const date = document.getElementById("date").value.trim();
  const details = document.getElementById("details").value.trim();

  return `Hello Bright Max Cleaning! I would like a free quote.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AEmail: ${encodeURIComponent(email)}%0AService: ${encodeURIComponent(service)}%0AProperty Type: ${encodeURIComponent(property)}%0APreferred Date: ${encodeURIComponent(date)}%0ADetails: ${encodeURIComponent(details)}`;
}

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = buildWhatsAppMessage();
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
});

// Update all WhatsApp links with the same number.
document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
  link.href = `https://wa.me/${WHATSAPP_NUMBER}`;
});
