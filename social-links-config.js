// ===== CONFIGURATION LIENS SOCIAUX ORLANOBINKS =====

const SOCIAL_CONFIG = {
    // Configuration générale
    channelName: 'orlanobinks',
    username: '@orlanobinks',
    
    // Liens principaux
    links: {
        twitch: 'https://www.twitch.tv/orlanobinks',
        tiktok: 'https://www.tiktok.com/@orlanobinks',
        youtube: 'https://www.youtube.com/@orlanobinks',
        instagram: 'https://www.instagram.com/orlanobinks',
        discord: 'https://discord.gg/orlanobinks',
        twitter: 'https://twitter.com/orlanobinks'
    },
    
    // Statistiques (à mettre à jour régulièrement)
    stats: {
        twitch: {
            followers: '8.5K',
            subscribers: '1.2K',
            totalViews: '150K'
        },
        tiktok: {
            followers: '15K',
            likes: '500K',
            totalViews: '2M'
        },
        youtube: {
            subscribers: '5.2K',
            totalViews: '200K',
            videos: '45'
        },
        instagram: {
            followers: '3.8K',
            posts: '120',
            engagement: '8.5%'
        }
    },
    
    // Clips Twitch populaires (à mettre à jour)
    twitchClips: [
        {
            id: 'clip-1',
            title: 'Clutch incroyable sur Split',
            description: 'Un clutch 1v4 qui a fait le tour du web !',
            thumbnail: 'https://clips-media-assets2.twitch.tv/AT-cm%7Cclip-thumbnail.jpg',
            views: 3200,
            duration: '0:45',
            url: 'https://clips.twitch.tv/demo-clip-1',
            game: 'Valorant',
            map: 'Split',
            created_at: '2024-12-20T10:00:00Z'
        },
        {
            id: 'clip-2',
            title: 'Frag movie - Episode 5',
            description: 'Les meilleurs moments de la semaine',
            thumbnail: 'https://clips-media-assets2.twitch.tv/AT-cm%7Cclip-thumbnail.jpg',
            views: 1800,
            duration: '2:15',
            url: 'https://clips.twitch.tv/demo-clip-2',
            game: 'Valorant',
            map: 'Multiple',
            created_at: '2024-12-19T15:30:00Z'
        },
        {
            id: 'clip-3',
            title: 'Moment drôle avec la team',
            description: 'On s\'amuse bien en équipe !',
            thumbnail: 'https://clips-media-assets2.twitch.tv/AT-cm%7Cclip-thumbnail.jpg',
            views: 2500,
            duration: '1:30',
            url: 'https://clips.twitch.tv/demo-clip-3',
            game: 'Valorant',
            map: 'Ascent',
            created_at: '2024-12-18T20:15:00Z'
        }
    ],
    
    // Posts TikTok - Configuration désactivée (utilise le widget automatique)
    tiktokPosts: [],
    
    // Vidéos YouTube populaires
    youtubeVideos: [
        {
            id: 'yt-1',
            title: 'Valorant Guide - Débutant à Pro',
            description: 'Guide complet pour progresser en Valorant',
            thumbnail: 'https://img.youtube.com/vi/demo-video-1/maxresdefault.jpg',
            views: '25K',
            duration: '15:30',
            url: 'https://www.youtube.com/watch?v=demo-video-1',
            published_at: '2024-12-15T10:00:00Z'
        },
        {
            id: 'yt-2',
            title: 'Best Plays - Compilation',
            description: 'Mes meilleurs plays de la semaine',
            thumbnail: 'https://img.youtube.com/vi/demo-video-2/maxresdefault.jpg',
            views: '18K',
            duration: '8:45',
            url: 'https://www.youtube.com/watch?v=demo-video-2',
            published_at: '2024-12-12T14:30:00Z'
        }
    ],
    
    // Posts Instagram populaires
    instagramPosts: [
        {
            id: 'ig-1',
            title: 'Setup Gaming',
            description: 'Mon setup gaming en action 🎮',
            image: 'https://instagram.com/p/demo-post-1/media',
            likes: 1200,
            comments: 85,
            url: 'https://www.instagram.com/p/demo-post-1/',
            hashtags: ['#gaming', '#setup', '#valorant'],
            created_at: '2024-12-20T09:00:00Z'
        },
        {
            id: 'ig-2',
            title: 'Behind the Scenes',
            description: 'Coulisses de mon dernier stream 📸',
            image: 'https://instagram.com/p/demo-post-2/media',
            likes: 980,
            comments: 65,
            url: 'https://www.instagram.com/p/demo-post-2/',
            hashtags: ['#behindthescenes', '#streamer', '#gaming'],
            created_at: '2024-12-18T16:00:00Z'
        }
    ],
    
    // Configuration API (pour production)
    api: {
        twitch: {
            clientId: 'YOUR_TWITCH_CLIENT_ID',
            clientSecret: 'YOUR_TWITCH_CLIENT_SECRET',
            redirectUri: 'https://orlanobinks.com/auth/twitch/callback'
        },
        youtube: {
            apiKey: 'YOUR_YOUTUBE_API_KEY',
            channelId: 'YOUR_YOUTUBE_CHANNEL_ID'
        },
        instagram: {
            accessToken: 'YOUR_INSTAGRAM_ACCESS_TOKEN',
            userId: 'YOUR_INSTAGRAM_USER_ID'
        }
    },
    
    // Horaires de stream (à mettre à jour)
    schedule: {
        monday: { time: '20:00', game: 'Valorant', status: 'live' },
        tuesday: { time: '19:00', game: 'Valorant', status: 'planned' },
        wednesday: { time: '20:30', game: 'Valorant', status: 'planned' },
        thursday: { time: '19:00', game: 'Valorant', status: 'planned' },
        friday: { time: '21:00', game: 'Valorant', status: 'planned' },
        saturday: { time: '15:00', game: 'Valorant', status: 'planned' },
        sunday: { time: '16:00', game: 'Valorant', status: 'planned' }
    },
    
    // Informations de contact
    contact: {
        email: 'contact@orlanobinks.com',
        business: 'business@orlanobinks.com',
        discord: 'https://discord.gg/orlanobinks',
        twitter: 'https://twitter.com/orlanobinks'
    }
};

// Fonctions utilitaires
function updateStats() {
    // Fonction pour mettre à jour les statistiques
    console.log('Mise à jour des statistiques...');
}

function getLatestContent() {
    // Fonction pour récupérer le contenu le plus récent
    return {
        clips: SOCIAL_CONFIG.twitchClips.slice(0, 3),
        tiktok: SOCIAL_CONFIG.tiktokPosts.slice(0, 3),
        youtube: SOCIAL_CONFIG.youtubeVideos.slice(0, 2),
        instagram: SOCIAL_CONFIG.instagramPosts.slice(0, 2)
    };
}

function formatSocialNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SOCIAL_CONFIG;
} else {
    window.SOCIAL_CONFIG = SOCIAL_CONFIG;
}
