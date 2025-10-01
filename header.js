document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('nav-burger');
    const menu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (burger) {
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            const expanded = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', !expanded);
            menu.classList.toggle('open');
            burger.classList.toggle('active'); // Ajoute/retire la classe active
        });

        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !burger.contains(e.target)) {
                menu.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
                burger.classList.remove('active'); // Retire la classe active
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menu.classList.contains('open')) {
                menu.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
                burger.classList.remove('active'); // Retire la classe active
                burger.focus();
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
                burger.classList.remove('active'); // Retire la classe active
            });
        });
    }
});