 let cursorSize = 20;
        let targetSize = 20;
        let isClicking = false;

        function setup() {
            let canvas = createCanvas(windowWidth, windowHeight);
            canvas.position(0, 0);
            canvas.style('position', 'fixed');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('pointer-events', 'none');
            canvas.style('z-index', '99999');
        }

        function draw() {
            clear();
            
            // Animation de taille
            cursorSize = lerp(cursorSize, targetSize, 0.2);
            
            // Cercle rempli
            fill(255, 107, 157, 200);
            noStroke();
            circle(mouseX, mouseY, cursorSize);
            
            // Bordure du cercle
            noFill();
            stroke(255, 107, 157);
            strokeWeight(2);
            circle(mouseX, mouseY, cursorSize + 4);
        }

        function windowResized() {
            resizeCanvas(windowWidth, windowHeight);
        }

        function mousePressed() {
            targetSize = 15;
            return false;
        }

        function mouseReleased() {
            targetSize = 20;
            return false;
        }

        // Détection du hover sur les éléments interactifs
        document.addEventListener('DOMContentLoaded', function() {
            const interactiveElements = document.querySelectorAll('a, button, .project-nav-link, .tool-item, .step-box, .info-box, .gallery-image-box');
            
            interactiveElements.forEach(elem => {
                elem.addEventListener('mouseenter', () => {
                    targetSize = 35;
                });
                
                elem.addEventListener('mouseleave', () => {
                    targetSize = 20;
                });
            });
        });
// Update time in navigation
function updateTime() {
    const now = new Date();
    const options = {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const timeString = now.toLocaleTimeString('fr-FR', options);
    const timeElement = document.getElementById('time');
    if (timeElement) {
        timeElement.textContent = `UTC+1 ${timeString}`;
    }
}

// Update time every second
setInterval(updateTime, 1000);
updateTime();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards, stat cards, and contact cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.project-card, .stat-card, .contact-card, .skill-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero title
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && scrolled < window.innerHeight) {
        heroTitle.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroTitle.style.opacity = 1 - (scrolled / 500);
    }
});

// Project card hover effect with tilt
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Cursor effect — robust DOM cursor that follows the mouse
// Only enable for devices with a fine pointer (mouse/trackpad)
if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    // Enable CSS that hides the OS cursor where our custom cursor is active
    document.body.classList.add('custom-cursor-enabled');

    // Create DOM cursor element (reliable and z-index controlled)
    const cursorEl = document.createElement('div');
    cursorEl.className = 'custom-cursor';
    cursorEl.style.left = '0px';
    cursorEl.style.top = '0px';
    document.body.appendChild(cursorEl);

    // Smoothing variables
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let posX = targetX;
    let posY = targetY;
    const ease = 0.18;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        cursorEl.style.opacity = '1';
    });

    window.addEventListener('mouseleave', () => {
        cursorEl.style.opacity = '0';
    });

    // Hover scaling on interactive elements
    const hoverables = 'a, button, input, textarea, .project-card, .contact-card, .btn-more, .nav-menu a';
    document.querySelectorAll(hoverables).forEach(el => {
        el.addEventListener('mouseenter', () => cursorEl.classList.add('custom-cursor--hover'));
        el.addEventListener('mouseleave', () => cursorEl.classList.remove('custom-cursor--hover'));
    });

    // Make sure p5 canvas won't block pointer events (so DOM receives mousemove)
    function patchCanvas() {
        const canv = document.querySelector('canvas');
        if (canv) {
            canv.style.position = 'fixed';
            canv.style.left = '0';
            canv.style.top = '0';
            canv.style.width = '100%';
            canv.style.height = '100%';
            canv.style.pointerEvents = 'none';
            canv.style.zIndex = '9998';
        }
    }

    // Try patch now and again after a short delay in case canvas is created later
    patchCanvas();
    setTimeout(patchCanvas, 600);

    // Animation loop for smooth cursor
    function animate() {
        posX += (targetX - posX) * ease;
        posY += (targetY - posY) * ease;
        cursorEl.style.left = posX + 'px';
        cursorEl.style.top = posY + 'px';
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('carouselIndicators');

let currentPage = 0;
const slidesPerPage = 3;
const totalSlides = slides.length;
const totalPages = Math.ceil(totalSlides / slidesPerPage);

// Créer les indicateurs (1 par page)
for (let i = 0; i < totalPages; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('carousel-indicator');
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToPage(i));
    indicatorsContainer.appendChild(indicator);
}

const indicators = document.querySelectorAll('.carousel-indicator');

// Cacher les slides qui ne sont pas dans la page actuelle
function updateVisibility() {
    slides.forEach((slide, index) => {
        const startIndex = currentPage * slidesPerPage;
        const endIndex = startIndex + slidesPerPage;

        if (index >= startIndex && index < endIndex) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });

    // Mettre à jour les indicateurs
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentPage);
    });
}

// Aller à une page spécifique
function goToPage(pageIndex) {
    currentPage = pageIndex;
    updateVisibility();
}

// Navigation précédente
prevBtn.addEventListener('click', () => {
    currentPage = (currentPage - 1 + totalPages) % totalPages;
    updateVisibility();
});

// Navigation suivante
nextBtn.addEventListener('click', () => {
    currentPage = (currentPage + 1) % totalPages;
    updateVisibility();
});

// Navigation au clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        currentPage = (currentPage - 1 + totalPages) % totalPages;
        updateVisibility();
    } else if (e.key === 'ArrowRight') {
        currentPage = (currentPage + 1) % totalPages;
        updateVisibility();
    }
});

// Initialiser
updateVisibility();

// Support tactile pour mobile
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe gauche
        currentPage = (currentPage + 1) % totalPages;
        updateVisibility();
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe droite
        currentPage = (currentPage - 1 + totalPages) % totalPages;
        updateVisibility();
    }
}