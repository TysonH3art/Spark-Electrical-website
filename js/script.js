/* ============================================
   SPARKY ELECTRICAL SERVICES - SCRIPT
   Part 3: interactivity, dynamic content and form validation

   Every feature is wrapped in its own function and only runs if the
   elements it needs exist on the current page, so one file can be
   shared by all five pages.
   ============================================ */

(function () {
    'use strict';

    // Lets the CSS know JavaScript is running (used by the scroll animations)
    document.documentElement.classList.add('js');

    /* ---------- Small helpers ---------- */

    // Shorthand for querySelector / querySelectorAll
    const $ = (selector, scope) => (scope || document).querySelector(selector);
    const $$ = (selector, scope) => Array.from((scope || document).querySelectorAll(selector));

    // Builds an element and sets its text safely. textContent is used instead of
    // innerHTML so anything a visitor types can never be run as code (XSS).
    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    const rand = (new Intl.NumberFormat('en-ZA', { maximumFractionDigits: 0 }));
    const rands = (n) => 'R' + rand.format(n).replace(/ /g, ' ');

    /* ---------- 1. Mobile navigation ---------- */
    function initNavigation() {
        const toggle = $('#navToggle');
        const nav = $('#mainNav');
        if (!toggle || !nav) return;

        toggle.setAttribute('aria-expanded', 'false');
        toggle.addEventListener('click', function () {
            const open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
        });
    }

    /* ---------- 2. Scroll animations ---------- */
    // Cards fade and slide up the first time they scroll into view.
    function initScrollReveal() {
        const targets = $$('.highlight-card, .service-card, .location-card, .content-section, .faq-item, .gallery-item');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduceMotion || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.classList.add('visible');
                    observer.unobserve(target);
                    // Once the fade-in is done, drop the animation helpers so
                    // they don't slow down the card hover effects later
                    target.addEventListener('transitionend', function cleanup() {
                        target.classList.remove('reveal', 'visible');
                        target.style.transitionDelay = '';
                        target.removeEventListener('transitionend', cleanup);
                    });
                }
            });
        }, { threshold: 0.12 });

        targets.forEach(function (target, i) {
            target.classList.add('reveal');
            // Small stagger so a row of cards doesn't appear all at once
            target.style.transitionDelay = ((i % 3) * 80) + 'ms';
            observer.observe(target);
        });
    }

    /* ---------- 3. FAQ accordion ---------- */
    function initAccordion() {
        const triggers = $$('.accordion-trigger');
        if (!triggers.length) return;

        triggers.forEach(function (trigger) {
            const panel = document.getElementById(trigger.getAttribute('aria-controls'));
            trigger.addEventListener('click', function () {
                const isOpen = trigger.getAttribute('aria-expanded') === 'true';

                // Only one answer open at a time
                triggers.forEach(function (other) {
                    other.setAttribute('aria-expanded', 'false');
                    document.getElementById(other.getAttribute('aria-controls')).classList.remove('open');
                });

                if (!isOpen) {
                    trigger.setAttribute('aria-expanded', 'true');
                    panel.classList.add('open');
                }
            });
        });
    }

    /* ---------- 4. Services: dynamic cards, search, filter, sort ---------- */
    function initServices() {
        const grid = $('#servicesGrid');
        const services = window.SPARKY_SERVICES;
        if (!grid || !Array.isArray(services)) return;

        const search = $('#serviceSearch');
        const category = $('#serviceCategory');
        const sort = $('#serviceSort');
        const count = $('#serviceCount');
        const empty = $('#serviceEmpty');

        function buildCard(service) {
            const card = el('article', 'service-card');

            if (service.image) {
                const img = el('img', 'content-img');
                img.src = service.image;
                img.alt = service.alt || service.title;
                img.loading = 'lazy';
                card.appendChild(img);
            } else {
                const icon = el('div', 'service-icon', service.icon || '⚡');
                icon.setAttribute('aria-hidden', 'true');
                card.appendChild(icon);
            }

            card.appendChild(el('h2', null, service.title));
            card.appendChild(el('p', null, service.text));
            card.appendChild(el('p', 'service-price', 'From ' + rands(service.from)));

            const link = el('a', 'btn btn-secondary', 'Get a quote');
            link.href = 'enquiry.html?type=' + encodeURIComponent(service.category);
            card.appendChild(link);
            return card;
        }

        function render() {
            const term = search.value.trim().toLowerCase();
            const cat = category.value;

            let list = services.filter(function (s) {
                const matchesText = (s.title + ' ' + s.text).toLowerCase().indexOf(term) !== -1;
                const matchesCat = cat === 'all' || s.category === cat;
                return matchesText && matchesCat;
            });

            list = list.slice().sort(function (a, b) {
                switch (sort.value) {
                    case 'price-low': return a.from - b.from;
                    case 'price-high': return b.from - a.from;
                    case 'name': return a.title.localeCompare(b.title);
                    default: return services.indexOf(a) - services.indexOf(b);
                }
            });

            grid.textContent = '';
            list.forEach(function (s) {
                const card = buildCard(s);
                card.classList.add('visible'); // already on screen, skip the scroll animation
                grid.appendChild(card);
            });

            count.textContent = 'Showing ' + list.length + ' of ' + services.length + ' services';
            empty.hidden = list.length !== 0;
        }

        [search, category, sort].forEach(function (control) {
            control.addEventListener('input', render);
            control.addEventListener('change', render);
        });

        $('#serviceReset').addEventListener('click', function () {
            search.value = '';
            category.value = 'all';
            sort.value = 'default';
            render();
            search.focus();
        });

        render();
    }

    /* ---------- 5. Gallery lightbox ---------- */
    function initLightbox() {
        const items = $$('.gallery-item');
        if (!items.length) return;

        let current = 0;
        let lastFocused = null;

        const overlay = el('div', 'lightbox');
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Image viewer');
        overlay.hidden = true;

        const figure = el('figure', 'lightbox-figure');
        const image = el('img');
        const caption = el('figcaption', 'lightbox-caption');
        figure.append(image, caption);

        const closeBtn = el('button', 'lightbox-btn lightbox-close', '×');
        closeBtn.setAttribute('aria-label', 'Close image viewer');
        const prevBtn = el('button', 'lightbox-btn lightbox-prev', '‹');
        prevBtn.setAttribute('aria-label', 'Previous image');
        const nextBtn = el('button', 'lightbox-btn lightbox-next', '›');
        nextBtn.setAttribute('aria-label', 'Next image');

        overlay.append(closeBtn, prevBtn, figure, nextBtn);
        document.body.appendChild(overlay);

        function show(index) {
            current = (index + items.length) % items.length;
            const thumb = $('img', items[current]);
            image.src = items[current].getAttribute('href');
            image.alt = thumb.alt;
            caption.textContent = thumb.alt + '  (' + (current + 1) + ' of ' + items.length + ')';
        }

        function open(index) {
            lastFocused = document.activeElement;
            show(index);
            overlay.hidden = false;
            document.body.classList.add('no-scroll');
            closeBtn.focus();
        }

        function close() {
            overlay.hidden = true;
            document.body.classList.remove('no-scroll');
            if (lastFocused) lastFocused.focus();
        }

        items.forEach(function (item, i) {
            item.addEventListener('click', function (event) {
                event.preventDefault();
                open(i);
            });
        });

        closeBtn.addEventListener('click', close);
        prevBtn.addEventListener('click', function () { show(current - 1); });
        nextBtn.addEventListener('click', function () { show(current + 1); });

        // Clicking the dark background closes it, clicking the picture doesn't
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) close();
        });

        document.addEventListener('keydown', function (event) {
            if (overlay.hidden) return;
            if (event.key === 'Escape') close();
            if (event.key === 'ArrowLeft') show(current - 1);
            if (event.key === 'ArrowRight') show(current + 1);

            // Keep keyboard focus inside the viewer while it is open
            if (event.key === 'Tab') {
                const buttons = [closeBtn, prevBtn, nextBtn];
                const first = buttons[0];
                const last = buttons[buttons.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        });
    }

    /* ---------- 6. Interactive map (Leaflet + OpenStreetMap) ---------- */
    function initMap() {
        const mapBox = $('#map');
        if (!mapBox) return;

        if (typeof window.L === 'undefined') {
            mapBox.textContent = 'The map could not be loaded. Please use the addresses above.';
            return;
        }

        // Approximate coordinates of the two branches
        const branches = {
            braamfontein: { name: 'Braamfontein Office', address: '14 Jorissen Street, Braamfontein', lat: -26.1931, lng: 28.0345 },
            randburg: { name: 'Randburg Branch', address: '58 Republic Road, Randburg', lat: -26.0942, lng: 28.0064 }
        };

        const map = window.L.map(mapBox, { scrollWheelZoom: false });
        window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const markers = {};
        const bounds = [];

        Object.keys(branches).forEach(function (key) {
            const b = branches[key];

            // Popup content is built with DOM methods rather than an HTML string
            const popup = el('div');
            popup.appendChild(el('strong', null, b.name));
            popup.appendChild(el('br'));
            popup.appendChild(document.createTextNode(b.address));
            popup.appendChild(el('br'));
            const dir = el('a', null, 'Get directions');
            dir.href = 'https://www.google.com/maps/dir/?api=1&destination=' + b.lat + ',' + b.lng;
            dir.target = '_blank';
            dir.rel = 'noopener noreferrer';
            popup.appendChild(dir);

            markers[key] = window.L.marker([b.lat, b.lng], { title: b.name, alt: b.name }).addTo(map).bindPopup(popup);
            bounds.push([b.lat, b.lng]);
        });

        map.fitBounds(bounds, { padding: [40, 40] });

        // "Show on map" buttons zoom to a branch and open its popup
        $$('[data-flyto]').forEach(function (button) {
            button.addEventListener('click', function () {
                const key = button.getAttribute('data-flyto');
                map.flyTo([branches[key].lat, branches[key].lng], 15, { duration: 1.2 });
                markers[key].openPopup();
                mapBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });

        $$('[data-showall]').forEach(function (button) {
            button.addEventListener('click', function () {
                map.fitBounds(bounds, { padding: [40, 40] });
            });
        });
    }

    /* ---------- 7. Form validation ---------- */

    // Each validator returns an error message, or '' when the value is fine.
    const check = {
        name: function (v) {
            v = v.trim();
            if (!v) return 'Please enter your full name.';
            if (v.length < 2) return 'Your name must be at least 2 characters long.';
            if (v.length > 60) return 'Your name can be at most 60 characters long.';
            if (!/^[A-Za-zÀ-ɏ' -]+$/.test(v)) return 'Your name can only contain letters, spaces, hyphens and apostrophes.';
            return '';
        },
        email: function (v) {
            v = v.trim();
            if (!v) return 'Please enter your email address.';
            if (v.length > 100) return 'That email address is too long.';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Please enter a valid email address, like name@example.com.';
            return '';
        },
        // South African numbers: 0821234567 or +27821234567 (spaces and dashes allowed)
        phone: function (v) {
            v = v.replace(/[\s\-()]/g, '');
            if (!v) return 'Please enter your phone number.';
            if (!/^(\+27|0)[1-9]\d{8}$/.test(v)) return 'Please enter a valid South African number, like 082 123 4567 or +27 82 123 4567.';
            return '';
        },
        phoneOptional: function (v) {
            return v.trim() === '' ? '' : check.phone(v);
        },
        select: function (v) {
            return v ? '' : 'Please choose an option from the list.';
        },
        message: function (v) {
            v = v.trim();
            if (!v) return 'Please type a message.';
            if (v.length < 10) return 'Please write at least 10 characters so we understand what you need.';
            if (v.length > 500) return 'Your message can be at most 500 characters long.';
            return '';
        },
        // Optional date, but if given it can't be in the past or more than a year away
        date: function (v) {
            if (!v) return '';
            const picked = new Date(v + 'T00:00:00');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const limit = new Date(today);
            limit.setFullYear(limit.getFullYear() + 1);
            if (isNaN(picked.getTime())) return 'Please enter a valid date.';
            if (picked < today) return 'The preferred date cannot be in the past.';
            if (picked > limit) return 'Please choose a date within the next 12 months.';
            return '';
        }
    };

    // Shows or clears the error message under a field
    function showError(field, message) {
        const group = field.closest('.form-group');
        let box = $('.field-error', group);
        if (!box) {
            box = el('p', 'field-error');
            box.id = field.id + '-error';
            group.appendChild(box);
        }
        box.textContent = message;
        field.classList.toggle('invalid', Boolean(message));
        field.classList.toggle('valid', !message && field.value.trim() !== '');
        field.setAttribute('aria-invalid', message ? 'true' : 'false');
        field.setAttribute('aria-describedby', box.id);
    }

    // Connects a list of {id, rule} pairs to a form. onValid runs only when every field passes.
    function setupForm(form, rules, onValid) {
        form.setAttribute('novalidate', ''); // we show our own messages instead of the browser's

        function validateField(rule) {
            const field = document.getElementById(rule.id);
            const message = rule.rule(field.value);
            showError(field, message);
            return message === '';
        }

        rules.forEach(function (rule) {
            const field = document.getElementById(rule.id);
            field.addEventListener('blur', function () { validateField(rule); });
            // Once a field has been flagged, re-check as the visitor fixes it
            const recheck = function () { if (field.classList.contains('invalid')) validateField(rule); };
            field.addEventListener('input', recheck);
            field.addEventListener('change', recheck);
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            let firstBad = null;
            rules.forEach(function (rule) {
                if (!validateField(rule) && !firstBad) firstBad = document.getElementById(rule.id);
            });

            const status = $('.form-status', form);
            if (firstBad) {
                if (status) {
                    status.textContent = 'Please fix the highlighted fields and try again.';
                    status.className = 'form-status error';
                }
                firstBad.focus();
                return;
            }
            if (status) {
                status.textContent = '';
                status.className = 'form-status';
            }
            onValid();
        });

        // Live character counter for the message box
        const message = $('textarea', form);
        const counter = $('.char-count', form);
        if (message && counter) {
            const max = Number(message.getAttribute('maxlength')) || 500;
            const update = function () { counter.textContent = message.value.length + ' / ' + max + ' characters'; };
            message.addEventListener('input', update);
            update();
        }
    }

    /* ---------- 8. Enquiry form: validate, fetch prices, show a quote ---------- */
    function initEnquiryForm() {
        const form = $('#enquiryForm');
        if (!form) return;

        // Services page "Get a quote" buttons link here with ?type=repair etc.
        const wanted = new URLSearchParams(window.location.search).get('type');
        const select = $('#enquiry-type');
        if (wanted && $('option[value="' + wanted.replace(/[^a-z]/gi, '') + '"]', select)) {
            select.value = wanted.replace(/[^a-z]/gi, '');
        }

        // Prices used if data/pricing.json can't be loaded (e.g. file opened without a web server)
        const fallbackPrices = {
            installation: { label: 'New Installation', from: 1200, to: 8500, availability: 'within 3 working days' },
            repair: { label: 'Repair / Fault Finding', from: 650, to: 2500, availability: 'same day or next working day' },
            coc: { label: 'Certificate of Compliance (COC)', from: 1450, to: 2200, availability: 'within 5 working days' },
            other: { label: 'Other', from: 650, to: 3000, availability: 'within 3 working days, after we call you to confirm the details' },
            urgentSurcharge: 0.2
        };

        // AJAX: the page asks for the price list in the background, without reloading
        function loadPrices() {
            return fetch('data/pricing.json', { cache: 'no-store' })
                .then(function (response) {
                    if (!response.ok) throw new Error('HTTP ' + response.status);
                    return response.json();
                })
                .catch(function () { return fallbackPrices; });
        }

        const result = $('#quoteResult');
        const submitBtn = $('button[type="submit"]', form);

        setupForm(form, [
            { id: 'name', rule: check.name },
            { id: 'email', rule: check.email },
            { id: 'phone', rule: check.phone },
            { id: 'enquiry-type', rule: check.select },
            { id: 'preferred-date', rule: check.date },
            { id: 'message', rule: check.message }
        ], function () {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Working out your quote...';

            loadPrices().then(function (prices) {
                const job = prices[select.value] || prices.other;
                const urgent = $('#urgent').checked;
                const surcharge = prices.urgentSurcharge || 0.2;

                const low = urgent ? Math.round(job.from * (1 + surcharge)) : job.from;
                const high = urgent ? Math.round(job.to * (1 + surcharge)) : job.to;
                const firstName = $('#name').value.trim().split(/\s+/)[0];
                const reference = 'SP-' + String(Date.now()).slice(-6);

                result.textContent = '';
                result.appendChild(el('h2', null, 'Thanks, ' + firstName + '. Here is your estimate'));
                result.appendChild(el('p', 'quote-price', rands(low) + ' to ' + rands(high)));

                const list = el('ul', 'quote-list');
                list.appendChild(el('li', null, 'Job: ' + job.label));
                list.appendChild(el('li', null, 'Earliest availability: ' + (urgent ? 'same day, subject to a call-out slot' : job.availability)));
                if (urgent) list.appendChild(el('li', null, 'Includes a ' + Math.round(surcharge * 100) + '% urgent call-out surcharge'));
                const date = $('#preferred-date').value;
                if (date) list.appendChild(el('li', null, 'Preferred date: ' + date + ' (we will confirm this when we call)'));
                list.appendChild(el('li', null, 'Reference number: ' + reference));
                result.appendChild(list);

                result.appendChild(el('p', 'quote-note', 'This is a rough estimate. An electrician will phone you on ' + $('#phone').value.trim() + ' to confirm the final price once we know more about the job.'));
                result.hidden = false;
                result.scrollIntoView({ behavior: 'smooth', block: 'center' });
                result.setAttribute('tabindex', '-1');
                result.focus({ preventScroll: true });

                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Enquiry';
                form.reset();
                $$('.valid, .invalid', form).forEach(function (f) { f.classList.remove('valid', 'invalid'); });
                $$('.field-error', form).forEach(function (m) { m.textContent = ''; });
                const counter = $('.char-count', form);
                if (counter) counter.textContent = '0 / 500 characters';
            });
        });
    }

    /* ---------- 9. Contact form: validate, then build an email ---------- */
    function initContactForm() {
        const form = $('#contactForm');
        if (!form) return;

        // Where each branch's emails go
        const recipients = {
            braamfontein: 'braamfontein@sparkyelectrical.co.za',
            randburg: 'randburg@sparkyelectrical.co.za'
        };

        const preview = $('#emailPreview');

        setupForm(form, [
            { id: 'name', rule: check.name },
            { id: 'email', rule: check.email },
            { id: 'phone', rule: check.phoneOptional },
            { id: 'message-type', rule: check.select },
            { id: 'branch', rule: check.select },
            { id: 'message', rule: check.message }
        ], function () {
            // Honeypot: real visitors never see this field, so a filled one means a bot
            if ($('#website').value !== '') return;

            const typeSelect = $('#message-type');
            const typeLabel = typeSelect.options[typeSelect.selectedIndex].text;
            const to = recipients[$('#branch').value];
            const name = $('#name').value.trim();
            const phone = $('#phone').value.trim();

            const subject = typeLabel + ' from ' + name;
            const body = [
                'Hi Sparky Electrical Services,',
                '',
                $('#message').value.trim(),
                '',
                '--',
                'Name: ' + name,
                'Email: ' + $('#email').value.trim(),
                'Phone: ' + (phone || 'not provided'),
                'Message type: ' + typeLabel
            ].join('\n');

            // The mailto: link opens the visitor's own email app with everything filled in
            const href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

            preview.textContent = '';
            preview.appendChild(el('h2', null, 'Your email is ready'));
            preview.appendChild(el('p', null, 'Check the details below, then press the button to open it in your email app and send it.'));

            const box = el('dl', 'email-box');
            [['To', to], ['Subject', subject]].forEach(function (pair) {
                box.appendChild(el('dt', null, pair[0]));
                box.appendChild(el('dd', null, pair[1]));
            });
            preview.appendChild(box);
            preview.appendChild(el('pre', 'email-body', body));

            const send = el('a', 'btn btn-primary', 'Open in my email app');
            send.href = href;
            preview.appendChild(send);

            preview.hidden = false;
            preview.setAttribute('tabindex', '-1');
            preview.scrollIntoView({ behavior: 'smooth', block: 'center' });
            preview.focus({ preventScroll: true });
        });
    }

    /* ---------- 10. Share buttons (social media promotion) ---------- */
    function initShare() {
        const box = $('#shareLinks');
        if (!box) return;

        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('Sparky Electrical Services - safe, reliable electricians in Johannesburg');
        const links = [
            ['WhatsApp', 'https://wa.me/?text=' + text + '%20' + url],
            ['Facebook', 'https://www.facebook.com/sharer/sharer.php?u=' + url],
            ['X', 'https://twitter.com/intent/tweet?text=' + text + '&url=' + url]
        ];

        box.appendChild(document.createTextNode('Share this page: '));
        links.forEach(function (pair) {
            const a = el('a', null, pair[0]);
            a.href = pair[1];
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            box.appendChild(a);
        });
    }

    /* ---------- Start everything once the page has loaded ---------- */
    document.addEventListener('DOMContentLoaded', function () {
        initNavigation();
        initServices();
        initAccordion();
        initLightbox();
        initMap();
        initEnquiryForm();
        initContactForm();
        initShare();
        initScrollReveal(); // last, so it also picks up cards created above
    });
})();
