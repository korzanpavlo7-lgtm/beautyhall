const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 24);
}, { passive: true });

hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("active");
    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
});

mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
    });
});

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("visible"));
    setTimeout(() => {
        toast.classList.remove("visible");
        setTimeout(() => toast.remove(), 350);
    }, 3800);
}

const bookingForm = document.getElementById("bookingForm");
bookingForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(bookingForm);
    const name = String(data.get("name")).trim();
    const phone = String(data.get("phone")).trim();
    const service = String(data.get("service"));

    const text = [
        "Привіт! Хочу записатися до BeautyHall.",
        `Імʼя: ${name}`,
        `Телефон: ${phone}`,
        `Послуга: ${service}`
    ].join("\n");

    window.open(`https://wa.me/380509887098?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    showToast("Заявка готова — відкриваємо WhatsApp.");
    bookingForm.reset();
});
