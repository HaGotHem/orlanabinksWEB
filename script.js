// ===== FONCTIONNALITÉS PRINCIPALES =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des fonctionnalités
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initTwitchPlayer();
    initHoverEffects();
    initParticles();
});

// ===== MENU MOBILE =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu quand on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// ===== DÉFILEMENT FLUIDE =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMATIONS AU SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.social-card, .post-card, .stat, .section-title');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== PLAYER TWITCH =====
function initTwitchPlayer() {
    const twitchPlayer = document.querySelector('.twitch-player iframe');
    
    if (twitchPlayer) {
        // Ajouter des paramètres pour améliorer l'expérience
        const currentSrc = twitchPlayer.src;
        const newSrc = currentSrc + '&autoplay=false&muted=true';
        twitchPlayer.src = newSrc;
        
        // Gestion du clic sur le player
        twitchPlayer.addEventListener('load', function() {
            console.log('Player Twitch chargé avec succès');
        });
    }
}

// ===== EFFETS HOVER AVANCÉS =====
function initHoverEffects() {
    // Effet de parallaxe sur les cartes
    const cards = document.querySelectorAll('.social-card, .post-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// ===== PARTICULES DYNAMIQUES =====
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    if (particlesContainer) {
        // Créer des particules supplémentaires
        for (let i = 0; i < 20; i++) {
            createParticle(particlesContainer);
        }
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: ${Math.random() > 0.5 ? 'var(--accent-purple)' : 'var(--neon-blue)'};
        border-radius: 50%;
        opacity: ${Math.random() * 0.5 + 0.1};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float-particle ${Math.random() * 10 + 10}s infinite linear;
    `;
    
    container.appendChild(particle);
}

// ===== GESTION DU SCROLL HEADER =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== COMPTEUR ANIMÉ =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ===== OBSERVATEUR POUR LES COMPTEURS =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.stat-number');
            if (counter && !counter.classList.contains('animated')) {
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                counter.classList.add('animated');
                animateCounter(counter, target);
            }
        }
    });
}, { threshold: 0.5 });

// Observer les sections avec des compteurs
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }
});

// ===== GESTION DES ERREURS =====
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

// ===== PERFORMANCE ET OPTIMISATION =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimiser les événements de scroll
const optimizedScrollHandler = debounce(function() {
    // Code optimisé pour le scroll
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== FONCTIONNALITÉS SUPPLEMENTAIRES =====

// Mode sombre/clair (optionnel pour le futur)
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Charger le thème sauvegardé
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
});

// ===== GESTION DES LIENS EXTERNES =====
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Ajouter un indicateur visuel
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// ===== ANIMATIONS CSS SUPPLEMENTAIRES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .header.scrolled {
        background: rgba(10, 10, 10, 0.98);
        box-shadow: 0 2px 20px rgba(139, 92, 246, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(10, 10, 10, 0.98);
        backdrop-filter: blur(10px);
        padding: 2rem;
        border-top: 1px solid rgba(139, 92, 246, 0.2);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;

document.head.appendChild(style);

// ===== GESTION DES MÉDIAS =====
function handleMediaQueries() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleChange(e) {
        if (e.matches) {
            // Mode mobile
            document.body.classList.add('mobile');
        } else {
            // Mode desktop
            document.body.classList.remove('mobile');
        }
    }
    
    mediaQuery.addListener(handleChange);
    handleChange(mediaQuery);
}

// Initialiser la gestion des médias
handleMediaQueries();

// ===== FINALISATION =====
console.log('🚀 Site Orlanobinks initialisé avec succès !');
console.log('🎮 Prêt pour l\'univers gaming !');
