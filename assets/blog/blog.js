(() => {
    const menuButton = document.getElementById('mobile-menu-btn');
    const menuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    function setMenuOpen(isOpen, returnFocus = false) {
        if (!menuButton || !menuClose || !mobileMenu) return;

        mobileMenu.classList.toggle('translate-x-full', !isOpen);
        menuButton.setAttribute('aria-expanded', String(isOpen));
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
        mobileMenu.inert = !isOpen;
        document.body.style.overflow = isOpen ? 'hidden' : '';

        if (isOpen) {
            menuClose.focus({ preventScroll: true });
        } else if (returnFocus) {
            menuButton.focus({ preventScroll: true });
        }
    }

    menuButton?.addEventListener('click', () => setMenuOpen(true));
    menuClose?.addEventListener('click', () => setMenuOpen(false, true));

    mobileMenu?.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => setMenuOpen(false));
    });

    const filterForm = document.querySelector('[data-blog-filter-form]');
    const searchInput = document.getElementById('blog-search');
    const categorySelect = document.getElementById('blog-category');
    const resultCount = document.getElementById('blog-result-count');
    const noResults = document.getElementById('blog-no-results');
    const blogCards = Array.from(document.querySelectorAll('.blog-card'));

    if (filterForm && searchInput && categorySelect && resultCount && noResults && blogCards.length) {
        const normalizeSearchText = value => value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase('pt-BR');
        const cardRecords = blogCards.map(card => {
            const metadata = card.querySelector('time')?.parentElement;
            const category = metadata?.querySelector('span.font-semibold')?.textContent.trim() || '';
            return { card, category, searchableText: normalizeSearchText(card.textContent) };
        });
        const categories = [...new Set(cardRecords.map(record => record.category).filter(Boolean))]
            .sort((first, second) => first.localeCompare(second, 'pt-BR'));

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.append(option);
        });

        const updateFilteredArticles = () => {
            const searchTerm = normalizeSearchText(searchInput.value.trim());
            const selectedCategory = categorySelect.value;
            let visibleCount = 0;

            cardRecords.forEach(({ card, category, searchableText }) => {
                const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
                const matchesCategory = !selectedCategory || category === selectedCategory;
                card.hidden = !matchesSearch || !matchesCategory;
                if (!card.hidden) visibleCount += 1;
            });

            resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'publicação' : 'publicações'}`;
            noResults.hidden = visibleCount > 0;
        };

        filterForm.hidden = false;
        filterForm.addEventListener('submit', event => event.preventDefault());
        filterForm.addEventListener('reset', () => window.requestAnimationFrame(updateFilteredArticles));
        searchInput.addEventListener('input', updateFilteredArticles);
        categorySelect.addEventListener('change', updateFilteredArticles);
        updateFilteredArticles();
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
            setMenuOpen(false, true);
        }
    });

    const revealItems = document.querySelectorAll('[data-blog-reveal]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (revealItems.length && !reducedMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-revealed');
                currentObserver.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

        revealItems.forEach(item => observer.observe(item));
        document.documentElement.classList.add('blog-scroll-reveal-ready');
    }
})();
