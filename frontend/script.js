const btn = document.getElementById("cta");
const logo = document.getElementById("logo")

window.addEventListener("scroll", () => {
    if (window.scrollY >= 250) {
        btn.classList.add("dNone");
    } else {
        btn.classList.remove("dNone");
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

    const response = await fetch('https://mi-portafolio-dyx7.onrender.com/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    Toastify({
        text: "Mensaje enviado",
        gravity: "bottom",
        style: {
            fontSize: "1.5rem",
            color: "#fff",
            background: "linear-gradient(to right,rgb(57, 167, 57),rgb(35, 190, 58))",
            fontWeight: "300"
        },
    }).showToast();

    e.target.reset();
});

const loadProjects = () => {
    const containerP = document.getElementById("containerP")
    let dataProjects = []
    fetch("https://mi-portafolio-dyx7.onrender.com/proyectos")
        .then((res)=> res.json())
        .then((data)=>{
            dataProjects = data
            containerP.innerHTML = ''
            dataProjects.forEach((e)=>{
                const card = `
                    <figure class="cardProject">
                        <img src=${e.img} alt="">
                        <div class="textCard">
                            <h3>${e.title}</h3>
                            <p>${e.text}</p>
                            <a href=${e.link} target="_blank">${e.link}</a>
                        </div>
                    </figure>
                `
                containerP.innerHTML += card
            })
        })
}
// loadProjects()