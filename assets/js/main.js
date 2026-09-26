// Initialize Lucide icons
lucide.createIcons();

// A looping hero video is exactly what prefers-reduced-motion is for: hold the
// poster frame instead. Autoplay stays in the markup so it still works without JS.
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('hero-video');
    if (!video) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // The clip is ~5MB. On a metered or slow connection that is a real cost to
    // the visitor, so hold the poster frame instead of pulling the video.
    const net = navigator.connection || {};
    const expensive = net.saveData === true || ['slow-2g', '2g'].includes(net.effectiveType);

    if (reduceMotion || expensive) {
        video.removeAttribute('autoplay');
        video.removeAttribute('preload');
        video.pause();
        return;
    }

    // Some mobile browsers refuse autoplay until the video is in view.
    video.play().catch(() => { /* poster stays visible */ });
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-mobile');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('hidden');
        toggle.setAttribute('aria-expanded', String(!open));
    });

    // Close after following an in-page link
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            menu.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
});
