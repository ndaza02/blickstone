/**
 * One-time typewriter effect for the hero headline.
 * Mirrors the brand line: "Built on trust. Delivered with structure."
 */
document.addEventListener('DOMContentLoaded', () => {
    const elements = [
        { id: 'type-1', text: 'Built on', speed: 90 },
        { id: 'type-2', text: 'trust.', speed: 90, delay: 150 },
        { id: 'type-3', text: 'Delivered with structure.', speed: 45, delay: 350 }
    ];

    // Respect a reduced-motion preference: show the headline immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach(item => {
            const el = document.getElementById(item.id);
            if (el) el.innerText = item.text;
        });
        return;
    }

    function typewriter(el, text, speed) {
        el.innerText = '';
        return new Promise(resolve => {
            let i = 0;
            const type = () => {
                if (i < text.length) {
                    el.append(text.charAt(i));
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            };
            type();
        });
    }

    async function startEffect() {
        for (const item of elements) {
            const el = document.getElementById(item.id);
            if (!el) continue;
            if (item.delay) await new Promise(r => setTimeout(r, item.delay));
            await typewriter(el, item.text, item.speed);
        }
    }

    setTimeout(startEffect, 300);
});
