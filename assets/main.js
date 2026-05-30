/* MUNLER — main.js */

(function () {
    'use strict';

    // ── Seamless announcement marquee ───────────────────────
    // Build: [original] · [original] · so -50% lands on an identical view
    var announcementTrack = document.querySelector('.announcement-track');
    if (announcementTrack) {
        var _orig = announcementTrack.innerHTML.trim();
        var _sep  = '<span style="padding:0 0.6rem;opacity:0.45">&nbsp;·&nbsp;</span>';
        announcementTrack.innerHTML = _orig + _sep + _orig + _sep;
    }

    // ── Smart header + announcement bar ─────────────────────
    var header          = document.getElementById('site-header');
    var announcementBar = document.querySelector('.announcement-bar');
    var hasHero         = !!document.querySelector('.hero');
    var lastScrollY     = 0;
    var AT_TOP_THRESHOLD = 8; // px — consider "at top" below this

    function onScroll() {
        var sy          = window.scrollY;
        var atTop       = sy < AT_TOP_THRESHOLD;
        var goingDown   = sy > lastScrollY;

        // ── Announcement bar: only visible at very top
        if (atTop) {
            announcementBar.classList.remove('ann-hidden');
        } else {
            announcementBar.classList.add('ann-hidden');
        }

        // ── Header
        if (atTop) {
            header.classList.remove('header-hidden');
            header.classList.remove('at-page-top');
            if (hasHero) {
                header.classList.remove('scrolled'); // transparent over hero
            } else {
                header.classList.add('scrolled');    // solid on non-hero pages
                header.classList.add('at-page-top'); // but stay below announcement bar
            }
        } else if (goingDown) {
            // Scrolling down: hide header
            header.classList.add('header-hidden');
            header.classList.remove('scrolled');
            header.classList.remove('at-page-top');
        } else {
            // Scrolling up: show solid header at top of viewport
            header.classList.remove('header-hidden');
            header.classList.add('scrolled');
            header.classList.remove('at-page-top');
        }

        lastScrollY = sy <= 0 ? 0 : sy;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load

    // ── Hero zoom-in on load ─────────────────────────────────
    const hero = document.querySelector('.hero');
    if (hero) {
        setTimeout(function () {
            hero.classList.add('loaded');
        }, 100);
    }

    // ── Mobile menu toggle ───────────────────────────────────
    const menuBtn  = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.setAttribute('aria-expanded', 'false');

        menuBtn.addEventListener('click', function () {
            var isOpen = mobileMenu.classList.toggle('open');
            menuBtn.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            if (isOpen) {
                var firstLink = mobileMenu.querySelector('a');
                if (firstLink) setTimeout(function(){ firstLink.focus(); }, 50);
            }
        });

        // Close when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('open');
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // ESC key closes menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.focus();
            }
        });

        // Focus trap within mobile menu
        mobileMenu.addEventListener('keydown', function(e) {
            if (!mobileMenu.classList.contains('open') || e.key !== 'Tab') return;
            var focusable = Array.from(mobileMenu.querySelectorAll('a'));
            if (focusable.length === 0) return;
            var first = focusable[0];
            var last  = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                menuBtn.focus();
            }
        });
    }

    // ── Cart counter ─────────────────────────────────────────
    var cartTotal = 0;
    var cartCountEl = document.getElementById('cart-count');

    document.querySelectorAll('.btn-add-cart').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();

            cartTotal++;
            if (cartCountEl) cartCountEl.textContent = cartTotal;

            var original = btn.textContent;
            btn.textContent = 'Added ✓';
            btn.style.background = '#1C1C1C';
            btn.style.color = '#fff';

            setTimeout(function () {
                btn.textContent = original;
                btn.style.background = '';
                btn.style.color = '';
            }, 1600);
        });
    });

    // ── Scroll-reveal (IntersectionObserver) ─────────────────
    var revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
        revealObserver.observe(el);
    });

    // ── Newsletter form ──────────────────────────────────────
    var form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var input = form.querySelector('input[type="email"]');
            var submitBtn = form.querySelector('button[type="submit"]');

            submitBtn.textContent = 'Subscribed!';
            submitBtn.disabled = true;
            input.value = '';

            setTimeout(function () {
                submitBtn.textContent = 'Subscribe';
                submitBtn.disabled = false;
            }, 3500);
        });
    }

    // ── Smooth scroll for anchor links ───────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var headerOffset = 80;
                var top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // ── Hero slider ──────────────────────────────────────────
    var heroSlideEls = document.querySelectorAll('.hero-slide');
    var heroDotEls   = document.querySelectorAll('.hero-dot');
    if (heroSlideEls.length > 1) {
        var activeSlide = 0;
        var sliderTimer;

        function goToSlide(n) {
            heroSlideEls[activeSlide].classList.remove('is-active');
            heroDotEls[activeSlide].classList.remove('is-active');
            activeSlide = (n + heroSlideEls.length) % heroSlideEls.length;
            heroSlideEls[activeSlide].classList.add('is-active');
            heroDotEls[activeSlide].classList.add('is-active');
            // Pause/play video on its slide
            heroSlideEls.forEach(function(slide, i) {
                var vid = slide.querySelector('video');
                if (vid) { i === activeSlide ? vid.play() : vid.pause(); }
            });
            resetSliderTimer();
        }

        function resetSliderTimer() {
            clearInterval(sliderTimer);
            sliderTimer = setInterval(function () { goToSlide(activeSlide + 1); }, 8000);
        }

        var prevBtn = document.querySelector('.hero-arrow--prev');
        var nextBtn = document.querySelector('.hero-arrow--next');
        if (prevBtn) prevBtn.addEventListener('click', function () { goToSlide(activeSlide - 1); });
        if (nextBtn) nextBtn.addEventListener('click', function () { goToSlide(activeSlide + 1); });
        heroDotEls.forEach(function (dot, i) {
            dot.addEventListener('click', function () { goToSlide(i); });
        });

        resetSliderTimer();
    }

    // ── Search overlay ───────────────────────────────────────
    var SEARCH_PRODUCTS = [
        {
            name: 'The Brook Mirror', variant: 'Champagne Gold', price: '£209',
            img: 'https://munler.co.uk/cdn/shop/files/Gemini_Generated_Image_911uwy911uwy911u_e7d39ccc-05d1-48df-b1ad-be72125a156c.png',
            url: '/products/the-brook-mirror'
        },
        {
            name: 'The Brook Mirror', variant: 'Matte Black', price: '£189',
            img: 'https://munler.co.uk/cdn/shop/files/Gemini_Generated_Image_q04fizq04fizq04f_93c8f86e-3b76-48f2-8f88-91396526d02c.png',
            url: '/products/the-brook-mirror-matte-black'
        },
        {
            name: 'The Solenne Mirror', variant: '', price: '£599',
            img: 'https://munler.co.uk/cdn/shop/files/Gemini_Generated_Image_xskxeuxskxeuxskx.png',
            url: '/products/the-solenne-mirror'
        },
        {
            name: 'The Rib End Table', variant: '', price: '£199',
            img: 'https://munler.co.uk/cdn/shop/files/Gemini_Generated_Image_en00uven00uven00_073900b8-d131-4da8-abf2-5d60f3b89639.png',
            url: '/products/the-rib-end-table'
        },
        {
            name: 'The Volta End Table', variant: '', price: '£299',
            img: 'https://munler.co.uk/cdn/shop/files/Gemini_Generated_Image_f348e2f348e2f348.png',
            url: '/products/the-volta-end-table'
        }
    ];

    // Inject overlay HTML
    var overlayEl = document.createElement('div');
    overlayEl.className = 'search-overlay';
    overlayEl.id = 'search-overlay';
    overlayEl.setAttribute('aria-hidden', 'true');
    overlayEl.innerHTML = [
        '<div class="search-panel" id="search-panel">',
        '  <div class="search-header">',
        '    <div class="search-input-row">',
        '      <svg class="search-icon-inline" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
        '      <input type="text" class="search-input" id="search-input" placeholder="Search products…" autocomplete="off" spellcheck="false">',
        '      <button class="search-close-btn" id="search-close-btn" aria-label="Close search">',
        '        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
        '      </button>',
        '    </div>',
        '  </div>',
        '  <div class="search-body">',
        '    <p class="search-results-label" id="search-results-label">All Products</p>',
        '    <div class="search-grid" id="search-grid"></div>',
        '    <div class="search-empty" id="search-empty"><p>No products found for &ldquo;<strong id="search-query-display"></strong>&rdquo;</p></div>',
        '  </div>',
        '</div>'
    ].join('');
    document.body.appendChild(overlayEl);

    var searchOverlay    = document.getElementById('search-overlay');
    var searchInput      = document.getElementById('search-input');
    var searchGrid       = document.getElementById('search-grid');
    var searchEmpty      = document.getElementById('search-empty');
    var searchLabel      = document.getElementById('search-results-label');
    var searchCloseBtn   = document.getElementById('search-close-btn');
    var searchQueryDisp  = document.getElementById('search-query-display');

    var searchDebounce;

    // Build a product card HTML — works for both suggest API and products.json formats
    function buildCard(p, fromProductsJson) {
        // URL: suggest API already provides correct p.url (e.g. /products/handle)
        // Strip any stray quote characters, then make absolute to prevent relative-path bugs
        var rawUrl = (!fromProductsJson && p.url) ? p.url : ('/products/' + (p.handle || ''));
        var url = window.location.origin + '/' + rawUrl.replace(/[“']/g, '').replace(/^\/+/, '');

        // Image: no CDN suffix manipulation — use raw URL to avoid breaking Shopify CDN paths
        var img = '';
        if (fromProductsJson) {
            img = (p.images && p.images[0] && p.images[0].src) || '';
        } else {
            var fi = p.featured_image;
            img = fi ? (typeof fi === 'object' ? (fi.url || fi.src || '') : String(fi)) : '';
        }

        // Price — both APIs return a decimal string e.g. “599.00” (already in pounds, not pence)
        var rawPrice = fromProductsJson
            ? ((p.variants && p.variants[0] && p.variants[0].price) || '')
            : (p.price || '');
        var price = rawPrice ? '£' + parseFloat(rawPrice).toFixed(2).replace(/\.00$/, '') : '';

        var title = p.title || '';
        return '<a href=”' + url + '” class=”search-product-card”>' +
            '<div class=”search-product-img-wrap”>' +
            (img ? '<img src=”' + img + '” alt=”' + title + '” class=”search-product-img” loading=”lazy”>' : '') +
            '</div>' +
            '<div class=”search-product-info”>' +
            '<p class=”search-product-name”>' + title + '</p>' +
            '<p class=”search-product-price”>' + price + '</p>' +
            '</div>' +
            '</a>';
    }

    function showCards(cards, label) {
        if (!cards.length) {
            searchGrid.style.display = 'none';
            searchEmpty.style.display = 'block';
            searchLabel.textContent = label;
            return;
        }
        searchGrid.innerHTML = cards.join('');
        searchGrid.style.display = 'grid';
        searchEmpty.style.display = 'none';
        searchLabel.textContent = label;
    }

    // Load all products when search opens (no query)
    function loadAllProducts() {
        searchLabel.textContent = 'All Products';
        fetch('/collections/all/products.json?limit=8&sort_by=created-desc')
            .then(function(r) { return r.json(); })
            .then(function(data) {
                var products = data.products || [];
                showCards(products.map(function(p) { return buildCard(p, true); }), 'All Products');
            })
            .catch(function() { searchLabel.textContent = 'All Products'; });
    }

    function renderProducts(query) {
        var q = query.trim();
        clearTimeout(searchDebounce);

        if (!q) {
            loadAllProducts();
            return;
        }

        searchDebounce = setTimeout(function() {
            fetch('/search/suggest.json?q=' + encodeURIComponent(q) +
                  '&resources[type]=product&resources[limit]=6' +
                  '&resources[options][unavailable_products]=last')
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    var products = (data.resources && data.resources.results && data.resources.results.products) || [];
                    if (!products.length) { searchQueryDisp.textContent = query; }
                    showCards(
                        products.map(function(p) { return buildCard(p, false); }),
                        products.length ? 'Results for “' + query + '”' : 'No results'
                    );
                })
                .catch(function() {
                    searchGrid.style.display = 'none';
                    searchEmpty.style.display = 'block';
                    searchQueryDisp.textContent = query;
                    searchLabel.textContent = 'Search unavailable';
                });
        }, 220);
    }

    function openSearch() {
        searchOverlay.classList.add('is-open');
        searchOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        loadAllProducts();
        setTimeout(function () { searchInput.focus(); }, 80);
    }

    function closeSearch() {
        searchOverlay.classList.remove('is-open');
        searchOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        searchInput.value = '';
    }

    // Wire search icon buttons (there may be multiple on a page)
    document.querySelectorAll('[aria-label="Search"]').forEach(function (btn) {
        btn.addEventListener('click', openSearch);
    });

    searchCloseBtn.addEventListener('click', closeSearch);

    // Click on the backdrop (overlay itself, not the panel) → close
    searchOverlay.addEventListener('click', function (e) {
        if (e.target === searchOverlay) closeSearch();
    });

    searchInput.addEventListener('input', function () {
        renderProducts(this.value);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('is-open')) {
            closeSearch();
        }
    });

})();
