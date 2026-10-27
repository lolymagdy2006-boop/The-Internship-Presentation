document.addEventListener('DOMContentLoaded', () => {

    // --- Active nav on scroll ---
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');

    const setActive = () => {
        let current = '';
        if (window.scrollY < 80) {
            current = 'hero';
        } else {
            sections.forEach(sec => {
                if (window.scrollY >= sec.offsetTop - 140) {
                    current = sec.getAttribute('id') || '';
                }
            });
        }
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    };

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();

    // --- Smooth scroll ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href.startsWith('#')) return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            // close mobile menu
            document.getElementById('nav-links')?.classList.remove('open');
        });
    });

    // Logo also scrolls to top
    document.getElementById('logo-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Mobile nav toggle ---
    const toggle = document.getElementById('nav-toggle');
    const linksEl = document.getElementById('nav-links');
    toggle?.addEventListener('click', () => {
        linksEl.classList.toggle('open');
    });

    // --- Challenges reveal ---
    document.querySelectorAll('.clickable-challenge').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-target');
            const sol = document.getElementById(id);
            if (!sol) return;
            sol.classList.toggle('visible');
            const hint = item.querySelector('.reveal-hint');
            if (hint) {
                hint.textContent = sol.classList.contains('visible')
                    ? 'Click to hide solution'
                    : 'Click to reveal solution';
            }
        });
    });
});
