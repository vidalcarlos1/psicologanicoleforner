
// =====================================================
// CONFIGURAÇÕES
// =====================================================

// Formato: código do país + DDD + número
const whatsappNumber = "5519993800424";


// =====================================================
// WHATSAPP
// =====================================================

const whatsappMessage =
    "Olá, Nicole! Vim pelo seu site e gostaria de saber mais sobre os atendimentos psicológicos.";

const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;


const whatsappButton =
    document.getElementById("whatsappButton");

const floatingWhatsapp =
    document.getElementById("floatingWhatsapp");

const footerWhatsapp =
    document.getElementById("footerWhatsapp");


if (whatsappButton) {
    whatsappButton.href = whatsappURL;
}

if (floatingWhatsapp) {
    floatingWhatsapp.href = whatsappURL;
}

if (footerWhatsapp) {
    footerWhatsapp.href = whatsappURL;
}


// =====================================================
// HEADER AO ROLAR
// =====================================================

const header =
    document.getElementById("header");


if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });

}


// =====================================================
// MENU MOBILE
// =====================================================

const menuToggle =
    document.getElementById("menuToggle");

const nav =
    document.getElementById("nav");


if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("active");

    });


    document.querySelectorAll(".nav a")
        .forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

            });

        });

}


// =====================================================
// HERO SLIDER
// =====================================================

const slides =
    document.querySelectorAll(".hero-slide");

const dots =
    document.querySelectorAll(".dot");


let currentSlide = 0;


function showSlide(index) {

    if (!slides.length) return;

    // Garantir índice válido
    if (index < 0 || index >= slides.length) {
        index = 0;
    }

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");

    if (dots[index]) {
        dots[index].classList.add("active");
    }

    currentSlide = index;

}


function nextSlide() {

    if (!slides.length) return;

    let next = currentSlide + 1;

    if (next >= slides.length) {
        next = 0;
    }

    showSlide(next);

}


// Iniciar slider automático somente se houver mais de uma imagem
let sliderInterval = null;

if (slides.length > 1) {

    sliderInterval =
        setInterval(nextSlide, 6000);

}


// =====================================================
// DOTS DO SLIDER
// =====================================================

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        if (index >= slides.length) return;

        showSlide(index);

        if (sliderInterval) {
            clearInterval(sliderInterval);
        }

        if (slides.length > 1) {

            sliderInterval =
                setInterval(nextSlide, 6000);

        }

    });

});


// =====================================================
// ANIMAÇÃO SUAVE DOS LINKS
// =====================================================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const href =
                this.getAttribute("href");

            // Ignorar links apenas com #
            if (!href || href === "#") return;

            const target =
                document.querySelector(href);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


// =====================================================
// SLIDER - MINHA TRAJETÓRIA
// =====================================================

const trajectorySlides =
    document.querySelectorAll(".trajectory-slide");


let trajectoryIndex = 0;


if (trajectorySlides.length > 1) {

    setInterval(() => {

        trajectorySlides[trajectoryIndex]
            .classList.remove("active");

        trajectoryIndex++;

        if (trajectoryIndex >= trajectorySlides.length) {
            trajectoryIndex = 0;
        }

        trajectorySlides[trajectoryIndex]
            .classList.add("active");

    }, 5000);

}


// =====================================================
// INSTAGRAM DINÂMICO - API VERCEL
// =====================================================

async function carregarInstagram() {

    const instagramGrid =
        document.getElementById("instagramGrid");

    if (!instagramGrid) return;


    try {

        const resposta =
            await fetch("/api/instagram");


        if (!resposta.ok) {
            throw new Error("Erro ao buscar publicações.");
        }


        const dados =
            await resposta.json();


        const posts =
            dados.posts || [];


        instagramGrid.innerHTML = "";


        // Caso não existam publicações
        if (!posts.length) {

            instagramGrid.innerHTML = `
                <div class="instagram-loading">
                    <i class="fa-brands fa-instagram"></i>
                    <p>Nenhuma publicação encontrada.</p>
                </div>
            `;

            return;

        }


        // Exibir até 6 publicações
        posts.slice(0, 6).forEach(post => {

            // Criar link
            const link =
                document.createElement("a");

            link.className = "instagram-post";

            link.href =
                post.permalink || "https://www.instagram.com/psinicoleforner/";

            link.target = "_blank";

            link.rel = "noopener noreferrer";


            link.setAttribute(
                "aria-label",
                post.caption || "Ver publicação no Instagram"
            );


            // Criar imagem
            const imagem =
                document.createElement("img");


            // Para vídeos, utilizar thumbnail
            imagem.src =
                post.media_type === "VIDEO"
                    ? (post.thumbnail_url || post.media_url)
                    : post.media_url;


            imagem.alt =
                post.caption
                    ? post.caption.substring(0, 150)
                    : "Publicação de Nicole Sant'Ana Forner";


            imagem.loading = "lazy";


            // Criar overlay
            const overlay =
                document.createElement("div");

            overlay.className =
                "instagram-overlay";


            overlay.innerHTML = `
                <i class="fa-brands fa-instagram"></i>
            `;


            // Montar card
            link.appendChild(imagem);

            link.appendChild(overlay);

            instagramGrid.appendChild(link);

        });


    } catch (erro) {

        console.error(
            "Erro ao carregar Instagram:",
            erro
        );


        instagramGrid.innerHTML = `
            <div class="instagram-loading">
                <i class="fa-brands fa-instagram"></i>
                <p>
                    Não foi possível carregar as publicações.
                    Visite o Instagram para conferir os conteúdos.
                </p>
            </div>
        `;

    }

}


// Executar carregamento do Instagram
carregarInstagram();
