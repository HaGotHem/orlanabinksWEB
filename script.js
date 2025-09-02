// ===== FONCTIONNALITÉS PRINCIPALES =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des fonctionnalités
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initTwitchPlayer();
    initHoverEffects();
    initParticles();
    initTwitchClips(); // Nouvelle fonction pour les clips
    initTikTokPosts(); // Nouvelle fonction pour les posts TikTok
    initSocialMediaLinks(); // Nouvelle fonction pour gérer les liens
    
    // Option: Widget TikTok embed (activé)
    initTikTokWidget();
});

// ===== INTÉGRATION CLIPS TWITCH =====
function initTwitchClips() {
    // Plus besoin de clips ! Juste la preview du stream 🎮
    console.log('🎬 Clips Twitch désactivés - utilisation de la preview stream uniquement');
    
    // Masquer la section des clips
    const clipsSection = document.querySelector('.posts-section');
    if (clipsSection) {
        clipsSection.style.display = 'none';
    }
}

// Fonction supprimée - plus besoin de clips, juste la preview stream ! 🎮

// Fonction supprimée - plus besoin pour la simple preview stream

// Fonction supprimée - plus besoin

async function getTwitchClips(clientId, token, userId) {
    try {
        const response = await fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${userId}&first=3&started_at=${getDateOneWeekAgo()}`, {
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data.map(clip => ({
            id: clip.id,
            title: clip.title,
            description: clip.title,
            thumbnail: clip.thumbnail_url,
            views: clip.view_count,
            duration: clip.duration,
            url: clip.url,
            game: clip.game_id,
            created_at: clip.created_at
        }));
    } catch (error) {
        console.error('Erreur lors de l\'obtention des clips:', error);
        return null;
    }
}

function getDateOneWeekAgo() {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString();
}

function showApiConfigMessage() {
    const clipSection = document.querySelector('.posts-section');
    if (clipSection) {
        const message = document.createElement('div');
        message.className = 'api-config-message';
        message.innerHTML = `
            <div style="background: rgba(139, 92, 246, 0.1); border: 1px solid var(--accent-purple); border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                <h4 style="color: var(--accent-purple); margin-bottom: 10px;">Configuration API Twitch Requise</h4>
                <p style="color: var(--text-gray); margin-bottom: 15px;">
                    Pour afficher vos vrais clips Twitch, veuillez configurer vos clés API dans le fichier <code>script.js</code>
                </p>
                <a href="https://dev.twitch.tv/console" target="_blank" style="color: var(--neon-blue); text-decoration: none;">
                    Obtenir vos clés API Twitch →
                </a>
            </div>
        `;
        clipSection.appendChild(message);
    }
}

function showNoClipsMessage() {
    const clipSection = document.querySelector('.posts-section');
    if (clipSection) {
        const message = document.createElement('div');
        message.className = 'no-clips-message';
        message.innerHTML = `
            <div style="background: rgba(0, 212, 255, 0.1); border: 1px solid var(--neon-blue); border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                <h4 style="color: var(--neon-blue); margin-bottom: 10px;">Aucun clip récent</h4>
                <p style="color: var(--text-gray);">
                    Aucun clip Twitch n'a été trouvé pour cette chaîne dans les 7 derniers jours.
                </p>
            </div>
        `;
        clipSection.appendChild(message);
    }
}

function showErrorMessage(errorText) {
    const clipSection = document.querySelector('.posts-section');
    if (clipSection) {
        const message = document.createElement('div');
        message.className = 'error-message';
        message.innerHTML = `
            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                <h4 style="color: #ef4444; margin-bottom: 10px;">Erreur de chargement</h4>
                <p style="color: var(--text-gray);">
                    ${errorText}
                </p>
            </div>
        `;
        clipSection.appendChild(message);
    }
}

function updateClipThumbnails(clips) {
    const clipCards = document.querySelectorAll('.post-card.clip');
    
    clipCards.forEach((card, index) => {
        if (clips[index]) {
            const thumbnail = card.querySelector('.post-thumbnail');
            const clip = clips[index];
            
            // Mettre à jour l'image de fond
            thumbnail.style.backgroundImage = `url(${clip.thumbnail})`;
            thumbnail.style.backgroundSize = 'cover';
            thumbnail.style.backgroundPosition = 'center';
            
            // Ajouter un overlay pour le bouton play
            const overlay = thumbnail.querySelector('.play-overlay');
            if (overlay) {
                overlay.style.background = 'rgba(0, 0, 0, 0.5)';
                overlay.style.borderRadius = '50%';
                overlay.style.padding = '10px';
            }
            
            // Ajouter un lien vers le clip
            thumbnail.style.cursor = 'pointer';
            thumbnail.addEventListener('click', () => {
                window.open(clip.url, '_blank');
            });
            
            // Mettre à jour les informations
            const title = card.querySelector('h4');
            const stats = card.querySelector('p');
            
            if (title) title.textContent = clip.title;
            if (stats) {
                const timeAgo = getTimeAgo(clip.created_at);
                stats.textContent = `${formatNumber(clip.views)} vues • ${timeAgo}`;
            }
        }
    });
}

// ===== INTÉGRATION POSTS TIKTOK =====
async function initTikTokPosts() {
    // Configuration TikTok - À CONFIGURER AVEC VOS VRAIES DONNÉES
    const TIKTOK_USERNAME = 'orlanobinks'; // Votre nom d'utilisateur TikTok
    
    console.log('🎵 Initialisation TikTok...');
    
    // Essayer d'abord l'automatisation
    const autoSuccess = await loadAutoTikTokPosts();
    
    if (!autoSuccess) {
        // Si l'automatisation échoue, utiliser la config manuelle
        console.log('📋 Basculement vers la configuration manuelle TikTok');
        loadRealTikTokPosts(TIKTOK_USERNAME);
    }
}

async function loadRealTikTokPosts(username) {
    console.log('📱 Posts TikTok de démonstration désactivés - utilisation du widget automatique uniquement');
    
    // Masquer complètement la section des posts de démonstration
    const tiktokSection = document.querySelector('.posts-section:last-child');
    if (tiktokSection) {
        const postsGrid = tiktokSection.querySelector('.posts-grid');
        if (postsGrid) {
            postsGrid.style.display = 'none';
        }
        
        // Masquer aussi le titre de la section si pas d'autre contenu
        const sectionTitle = tiktokSection.querySelector('h3');
        if (sectionTitle && sectionTitle.textContent.includes('Posts TikTok')) {
            sectionTitle.style.display = 'none';
        }
    }
}

async function loadTikTokPostsFromConfig(username) {
    // Cette fonction est maintenant désactivée
    console.log('📱 Configuration manuelle TikTok désactivée - widget automatique utilisé');
}

// Fonctions d'erreur TikTok supprimées - widget automatique utilisé

function updateTikTokPosts(posts) {
    const tiktokCards = document.querySelectorAll('.post-card.tiktok-post');
    
    tiktokCards.forEach((card, index) => {
        if (posts[index]) {
            const thumbnail = card.querySelector('.post-thumbnail');
            const post = posts[index];
            
            // Mettre à jour l'image de fond avec une couleur TikTok
            thumbnail.style.background = 'linear-gradient(135deg, #ff0050, #00f2ea)';
            thumbnail.style.backgroundSize = 'cover';
            thumbnail.style.backgroundPosition = 'center';
            
            // Ajouter un logo TikTok plus visible
            const tiktokLogo = thumbnail.querySelector('.tiktok-logo');
            if (tiktokLogo) {
                tiktokLogo.style.background = 'rgba(0, 0, 0, 0.3)';
                tiktokLogo.style.borderRadius = '50%';
                tiktokLogo.style.padding = '8px';
                tiktokLogo.style.color = 'white';
            }
            
            // Ajouter un lien vers le post TikTok
            thumbnail.style.cursor = 'pointer';
            thumbnail.addEventListener('click', () => {
                window.open(post.url, '_blank');
            });
            
            // Mettre à jour les informations
            const title = card.querySelector('h4');
            const stats = card.querySelector('p');
            
            if (title) title.textContent = post.title;
            if (stats) {
                const timeAgo = getTimeAgo(post.created_at);
                stats.textContent = `${formatNumber(post.like_count)} likes • ${timeAgo}`;
            }
            
            // Ajouter un effet hover avec la description
            card.addEventListener('mouseenter', () => {
                if (title) {
                    title.textContent = post.description;
                    title.style.color = '#ff0050';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (title) {
                    title.textContent = post.title;
                    title.style.color = 'var(--text-white)';
                }
            });
        }
    });
}

// ===== FONCTIONNALITÉS SUPPLEMENTAIRES POUR RÉSEAUX SOCIAUX =====
function initSocialMediaLinks() {
    // Ajouter des liens cliquables pour tous les posts
    const allPostCards = document.querySelectorAll('.post-card');
    
    allPostCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', (e) => {
            // Éviter le double-clic si on clique sur un élément enfant
            if (e.target.closest('.play-overlay') || e.target.closest('.tiktok-logo')) {
                return;
            }
            
            // Déterminer le type de post et ouvrir le bon lien
            if (card.classList.contains('clip')) {
                // Pour les clips Twitch, on a déjà géré le clic sur thumbnail
                return;
            } else if (card.classList.contains('tiktok-post')) {
                // Pour les posts TikTok, on a déjà géré le clic sur thumbnail
                return;
            }
        });
    });
    
    // Statistiques supprimées pour simplifier le site
    console.log('📊 Statistiques automatiques désactivées - utilisation des données statiques');
}

// ===== STATISTIQUES SUPPRIMÉES =====
// Les statistiques automatiques ont été supprimées pour simplifier le site
// Les données sont maintenant gérées directement dans le HTML/CSS

// ===== STATISTIQUES SUPPRIMÉES =====
// Toutes les fonctions d'API de statistiques ont été supprimées
// Les statistiques sont maintenant gérées directement dans le HTML

// ===== AUTOMATISATION TIKTOK AVANCÉE =====
async function loadAutoTikTokPosts() {
    try {
        console.log('🎵 Tentative de récupération automatique des TikToks...');
        
        // Option 1: Via proxy/service tiers
        const tiktokData = await fetchTikTokViaProxy();
        
        if (tiktokData && tiktokData.length > 0) {
            updateTikTokPosts(tiktokData);
            console.log('✅ TikToks automatiques chargés:', tiktokData.length);
            return true;
        }
        
        throw new Error('Aucune donnée TikTok récupérée');
        
    } catch (error) {
        console.log('⚠️ Échec récupération auto TikTok, utilisation de la config manuelle');
        return false;
    }
}

async function fetchTikTokViaProxy() {
    const username = 'orlanobinks';
    
    // Option A: Service TikTok API gratuit
    try {
        const response = await fetch(`https://api.tiktokv.com/aweme/v1/feed/?user_id=${username}&count=3`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            return formatTikTokData(data);
        }
    } catch (error) {
        console.log('Service A échoué, tentative service B...');
    }
    
    // Option B: Service alternatif
    try {
        const response = await fetch(`https://tiktok-scraper-private.p.rapidapi.com/user/posts?username=${username}&limit=3`, {
            headers: {
                'X-RapidAPI-Key': 'VOTRE_RAPIDAPI_KEY', // À configurer
                'X-RapidAPI-Host': 'tiktok-scraper-private.p.rapidapi.com'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            return formatTikTokDataRapidAPI(data);
        }
    } catch (error) {
        console.log('Service B échoué');
    }
    
    // Option C: Service public RSS-like
    try {
        const response = await fetch(`https://www.tiktok.com/@${username}?format=json`);
        if (response.ok) {
            const data = await response.json();
            return formatTikTokDataPublic(data);
        }
    } catch (error) {
        console.log('Service public échoué');
    }
    
    return null;
}

function formatTikTokData(rawData) {
    // Formatage pour service A
    return rawData.aweme_list?.slice(0, 3).map(item => ({
        id: item.aweme_id,
        title: item.desc || 'TikTok récent',
        description: item.desc,
        thumbnail: item.video?.cover?.url_list[0],
        likes: item.statistics?.digg_count || 0,
        comments: item.statistics?.comment_count || 0,
        shares: item.statistics?.share_count || 0,
        url: `https://www.tiktok.com/@orlanobinks/video/${item.aweme_id}`,
        created_at: new Date(item.create_time * 1000).toISOString()
    })) || [];
}

function formatTikTokDataRapidAPI(rawData) {
    // Formatage pour RapidAPI
    return rawData.data?.slice(0, 3).map(item => ({
        id: item.id,
        title: item.title || 'TikTok récent',
        description: item.description,
        thumbnail: item.thumbnail,
        likes: item.stats?.likes || 0,
        comments: item.stats?.comments || 0,
        shares: item.stats?.shares || 0,
        url: item.url,
        created_at: item.created_at
    })) || [];
}

function formatTikTokDataPublic(rawData) {
    // Formatage pour service public
    return rawData.items?.slice(0, 3).map(item => ({
        id: item.id,
        title: 'TikTok récent',
        description: item.caption,
        thumbnail: item.cover,
        likes: item.likes || 0,
        url: `https://www.tiktok.com/@orlanobinks/video/${item.id}`,
        created_at: item.timestamp
    })) || [];
}

// ===== WIDGET TIKTOK EMBED (Alternative) =====
function initTikTokWidget() {
    const tiktokSection = document.querySelector('.posts-section:last-child');
    if (!tiktokSection) return;
    
    console.log('🎵 Initialisation du widget TikTok automatique...');
    
    // Créer un widget TikTok embed stylé
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tiktok-auto-widget';
    widgetDiv.innerHTML = `
        <div class="tiktok-widget-container" style="
            background: var(--secondary-black);
            border-radius: var(--border-radius);
            padding: 20px;
            margin: 20px 0;
            border: 1px solid rgba(139, 92, 246, 0.2);
            box-shadow: var(--shadow-neon);
        ">
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="
                    color: var(--text-white); 
                    margin: 0 0 10px 0;
                    background: var(--gradient-primary);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-size: 1.5em;
                ">🎵 TikToks Automatiques</h3>
                <div style="
                    width: 50px;
                    height: 2px;
                    background: var(--gradient-primary);
                    margin: 0 auto;
                    border-radius: 1px;
                "></div>
            </div>
            
            <div class="tiktok-embed-container" style="
                display: flex; 
                justify-content: center;
                gap: 15px; 
                overflow-x: auto;
                padding: 10px 0;
            ">
                <div class="tiktok-embed-wrapper" style="
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    border: 2px solid transparent;
                    background: linear-gradient(45deg, var(--accent-purple), var(--neon-blue));
                    padding: 2px;
                ">
                    <iframe src="https://www.tiktok.com/embed/@orlanobinks" 
                            width="900" 
                            height="500" 
                            frameborder="0" 
                            scrolling="no"
                            allow="encrypted-media"
                            style="
                                border-radius: 10px;
                                background: #000;
                            ">
                    </iframe>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 15px;">
                <p style="
                    color: var(--text-gray); 
                    font-size: 0.9em; 
                    margin: 0;
                    opacity: 0.8;
                ">
                    <i class="fas fa-sync-alt" style="margin-right: 5px; color: var(--neon-blue);"></i>
                    Mis à jour automatiquement depuis TikTok
                </p>
                <a href="https://www.tiktok.com/@orlanobinks" 
                   target="_blank" 
                   style="
                       display: inline-block;
                       margin-top: 10px;
                       padding: 8px 16px;
                       background: var(--gradient-secondary);
                       color: white;
                       text-decoration: none;
                       border-radius: 20px;
                       font-size: 0.9em;
                       transition: var(--transition);
                   "
                   onmouseover="this.style.transform='scale(1.05)'"
                   onmouseout="this.style.transform='scale(1)'">
                    <i class="fab fa-tiktok" style="margin-right: 5px;"></i>
                    Voir tous les TikToks
                </a>
            </div>
        </div>
    `;
    
    // Ajouter le widget avant les posts existants
    tiktokSection.insertBefore(widgetDiv, tiktokSection.firstChild);
    
    console.log('✅ Widget TikTok automatique activé !');
    
    // Ajouter un message informatif dans la console
    setTimeout(() => {
        console.log(`
🎵 WIDGET TIKTOK ACTIVÉ !
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Affichage automatique des derniers TikToks
✅ Mise à jour en temps réel
✅ Design intégré au thème du site
✅ Lien direct vers le profil TikTok

📱 Le widget affiche maintenant vos dernières vidéos !
        `);
    }, 1000);
}

// ===== STATISTIQUES INSTAGRAM (Approximatives) =====
async function getInstagramStats() {
    // Instagram API nécessite des permissions spéciales
    // On utilise les données de la configuration
    throw new Error('API Instagram non disponible - utilisation des données de config');
}

function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Il y a quelques minutes';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    if (diffInHours < 48) return 'Il y a 1j';
    return `Il y a ${Math.floor(diffInHours / 24)}j`;
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ===== API TWITCH RÉELLE (Pour production) =====
async function getTwitchAccessToken() {
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`
    });
    
    const data = await response.json();
    return data.access_token;
}

async function getTwitchClips() {
    try {
        const token = await getTwitchAccessToken();
        
        // D'abord obtenir l'ID de l'utilisateur
        const userResponse = await fetch(`https://api.twitch.tv/helix/users?login=${CHANNEL_NAME}`, {
            headers: {
                'Client-ID': CLIENT_ID,
                'Authorization': `Bearer ${token}`
            }
        });
        
        const userData = await userResponse.json();
        const userId = userData.data[0].id;
        
        // Ensuite obtenir les clips
        const clipsResponse = await fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${userId}&first=3`, {
            headers: {
                'Client-ID': CLIENT_ID,
                'Authorization': `Bearer ${token}`
            }
        });
        
        const clipsData = await clipsResponse.json();
        return clipsData.data;
        
    } catch (error) {
        console.error('Erreur lors de la récupération des clips Twitch:', error);
        return null;
    }
}

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
    const animatedElements = document.querySelectorAll('.social-card, .post-card, .section-title');
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

// ===== DISCORD SIMPLIFIÉ =====
// Les statistiques Discord ont été supprimées pour simplifier le site
// La carte Discord affiche maintenant juste le lien vers le serveur

// ===== FINALISATION =====
console.log('🚀 Site Orlanobinks initialisé avec succès !');
console.log('🎮 Prêt pour l\'univers gaming !');
