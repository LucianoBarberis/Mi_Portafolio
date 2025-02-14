const btn = document.getElementById("cta");
const logo = document.getElementById("logo")

window.addEventListener("scroll", () => {
    if (window.scrollY >= 250) {
        btn.classList.add("dNone");
    } else {
        btn.classList.remove("dNone"); // Add this to show the button when scrolling back up
    }
});

btn.addEventListener("click", () => {
    if (window.scrollY <= 250) {
        window.scrollTo({
            top: 1116.800048828125,
            behavior: 'smooth'
        })
    }
})

logo.addEventListener("click", () => {
    if (window.scrollY > 0) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
})

let index = 0;

function moveSlide(direction) {
    const carousel = document.querySelector('.carousel');
    const totalSlides = document.querySelectorAll('.carousel img').length;

    index += direction;
    if (index < 0) {
        index = totalSlides - 1;
    } else if (index >= totalSlides) {
        index = 0;
    }

    carousel.style.transform = `translateX(${-index * 100}%)`;
}

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const response = await fetch('http://localhost:3000/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    
});