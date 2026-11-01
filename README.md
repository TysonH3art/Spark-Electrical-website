# Sparky Electrical Services Website

## Project Title
Sparky Electrical Services Website Development Project — WEDE5020 POE

## Student Information
- **Name:** Lesego Tlhako
- **Student Number:** ST10511722
- **Module:** Web Development (Introduction) — WEDE5020

## Project Overview
A five-page website for Sparky Electrical Services, a small electrical services business operating in Johannesburg since 2015. The site allows potential customers to learn about the business, view services offered, request a quote, and find contact details for both branches.

## Website Goals and Objectives
- Increase online visibility so more potential customers can find the business when searching for electrical services.
- Generate qualified leads through an online quote request form.
- Build trust and credibility by showcasing the business's history, qualifications, and services.
- Provide essential contact information (services, service areas, contact details) available at any time of day.

## Key Features and Functionality
- 5-page website: Home, About Us, Services, Enquiry, Contact
- Working navigation menu present on every page, with a collapsible mobile menu
- CSS Grid and Flexbox layout throughout
- Fully responsive across desktop, tablet, and mobile breakpoints
- Responsive image loading (srcset) on the homepage hero image
- Quote request form on the Enquiry page
- Two branch locations listed on the Contact page (Braamfontein and Randburg)
- Client-side form validation with clear error messages on the Enquiry and Contact forms (Part 3)
- Instant price estimate on the Enquiry page, using prices loaded in the background with fetch (Part 3)
- Contact form that builds a ready-to-send email (Part 3)
- Searchable, filterable and sortable services list (Part 3)
- FAQ accordion, photo gallery with lightbox, scroll animations and an interactive Leaflet map (Part 3)
- SEO set-up: meta tags, robots.txt, sitemap.xml, structured data (Part 3)

## Timeline and Milestones
| Week | Milestone |
|------|-----------|
| Week 1–2 | Research, planning, and submission of the Website Project Proposal. |
| Week 3–4 | Build homepage structure and site-wide navigation using HTML. |
| Week 5–6 | Style all pages with CSS and add responsive layout for mobile devices. |
| Week 7 | Add JavaScript interactivity (form validation, navigation menu) and test across devices. |
| Week 8 | Final proofreading, bug fixes, and submission of the completed website. |

## Part 1 Details
- Website Project Proposal completed, submitted, and approved.
- HTML structure created for all 5 required pages.
- Navigation menu implemented and tested across all pages.
- File and folder structure organised (css/, js/, images/).

## Part 2 Details

**Feedback from Part 1:** No formal written feedback had been released at the time of starting Part 2. Minor issues noticed independently during review were corrected regardless (see Changelog) - specifically an image filename mix-up on the Services page.

**CSS Styling (Desktop):**
- External stylesheet created at `css/style.css` and linked from all 5 pages.
- CSS reset applied (`* { margin: 0; padding: 0; box-sizing: border-box; }`) for cross-browser consistency.
- Base typography set using CSS custom properties (`:root` variables) for the colour scheme (navy `#0A2647` and amber `#F5A623`, taken from the approved Website Project Proposal).
- Typography hierarchy applied using `font-family`, `font-size`, `font-weight`, and `line-height` across headings and body text.
- Layout built using Flexbox (site header, hero section) and CSS Grid (highlights cards, services cards, contact location cards).
- Interactive states added using `:hover`, `:focus`, and `:active` pseudo-classes on the navigation links, buttons, and form fields.

**Responsive Design:**
- Two breakpoints implemented using media queries: tablet (`max-width: 1024px`) and mobile (`max-width: 600px`).
- Multi-column grids (3 columns on desktop) collapse to 2 columns on tablet and 1 column on mobile.
- The hero section switches from a side-by-side Flexbox layout to a stacked layout on tablet and below.
- A hamburger-style menu toggle appears on mobile to collapse the navigation (see note on JavaScript scope below).
- Relative units (`rem`, `%`) used throughout instead of fixed pixel values for font sizing and widths.
- Responsive image loading implemented on the homepage hero image using `srcset` and `sizes`, so mobile devices download a smaller 600px-wide image instead of the full desktop-sized image.
- Tested using browser developer tools at multiple viewport widths. Screenshot evidence below.

**Note on JavaScript scope:** Part 3 is where full JavaScript functionality is introduced. The one exception in Part 2 is a small script (`js/script.js`) that toggles the mobile navigation menu open/closed, since this specific interaction cannot be achieved with CSS alone. No form validation or other interactivity has been added yet.

### Screenshot Evidence (Desktop / Tablet / Mobile)

Screenshots for all 5 pages at three viewport widths (Desktop 1440px, Tablet 768px, Mobile 375px) are included in the `screenshots/` folder in this repository:

- `index_desktop.png`, `index_tablet.png`, `index_mobile.png`
- `about_desktop.png`, `about_tablet.png`, `about_mobile.png`
- `services_desktop.png`, `services_tablet.png`, `services_mobile.png`
- `enquiry_desktop.png`, `enquiry_tablet.png`, `enquiry_mobile.png`
- `contact_desktop.png`, `contact_tablet.png`, `contact_mobile.png`

These confirm the layout correctly adapts at each breakpoint: 3-column grids on desktop become 2 columns on tablet and stack to 1 column on mobile, and the navigation collapses into a toggle menu below 600px.

## Part 3 Details

**Live website:** https://tysonh3art.github.io/Spark-Electrical-website/ (deployed with GitHub Pages)

**Feedback from Part 2:** No written feedback or marks for Part 2 had been released when I started Part 3, so there were no lecturer comments to work through. While testing I found the images were far too heavy for a small business site (the largest was 8.6 MB), so I fixed that myself. It is logged in the Changelog.

### JavaScript features (js/script.js, js/data.js)
All of the JavaScript sits in `js/script.js`. Each feature is its own function and only runs if the page has the elements it needs, so the same file is safe to load on all five pages.

| Feature | Page | How it works |
|---------|------|--------------|
| Mobile menu toggle | All | Toggles the `open` class and updates `aria-expanded` for screen readers. |
| Scroll animations | All | An `IntersectionObserver` fades cards in as they scroll into view. It is switched off for visitors who have "reduce motion" turned on. |
| FAQ accordion | Home | Buttons open and close answer panels, one at a time. Uses `aria-expanded` and `aria-controls`. |
| Dynamic services list | Services | Cards are built from the array in `js/data.js` using DOM methods (`createElement`, `textContent`). |
| Search, filter and sort | Services | Live search box, a type-of-work filter and a sort menu (price low/high, A to Z). Shows a "Showing X of Y" count and an empty-state message. |
| Gallery with lightbox | About | Clicking a photo opens it full size in a modal. Supports arrow keys, Esc, clicking the background, and keeps keyboard focus inside the viewer. |
| Interactive map | Contact | Leaflet map with a marker for each branch, pop-ups with a "Get directions" link, and "Show on map" buttons that fly to a branch. |
| Quote estimate | Enquiry | After validation, `fetch()` loads `data/pricing.json` in the background (AJAX), then the page shows a price range, availability and a reference number without reloading. |
| Email builder | Contact | After validation, the message is compiled into a `mailto:` link addressed to the chosen branch. The visitor checks the preview and opens it in their own email app. |
| Share links | All | Footer links for WhatsApp, Facebook and X that share the current page. |

### Form validation
Both forms have HTML5 attributes (`required`, `minlength`, `maxlength`, `type`, `pattern`) and JavaScript validation on top. The browser's own pop-ups are switched off with `novalidate` so the messages match the site's design.

| Field | Rule |
|-------|------|
| Full name | Required, 2 to 60 characters, letters, spaces, hyphens and apostrophes only |
| Email | Required, must look like `name@example.com`, up to 100 characters |
| Phone | South African format, `0821234567` or `+27821234567` (spaces and dashes allowed). Required on the Enquiry form, optional on the Contact form |
| Type of job / message / branch | A real option must be chosen |
| Preferred date | Optional, but cannot be in the past or more than 12 months away |
| Message | Required, 10 to 500 characters, with a live character counter |

Fields are checked when the visitor leaves them. Once a field is flagged it is re-checked as they type, so the error disappears as soon as it is fixed. On submit, the first invalid field gets focus. Errors are linked to their fields with `aria-describedby` and `aria-invalid`.

**Enquiry form vs Contact form:** the Enquiry form is for people who want a price. It returns an estimate and availability. The Contact form is for general messages (questions, feedback, complaints, careers) and produces an email to the branch the visitor picks.

### SEO
**Keyword research.** I thought about what a homeowner in Johannesburg would actually type into Google, then worked those phrases into headings, body text, titles and alt text.

| Page | Main keywords |
|------|---------------|
| Home | electrician Johannesburg, same-day electrician, electrical repairs |
| About | electrical company since 2015, qualified electricians Johannesburg |
| Services | electrical installation, COC inspection, LED lighting upgrade, inverter wiring, DB board upgrade |
| Enquiry | free electrician quote, electrical quote Johannesburg |
| Contact | electrician Braamfontein, electrician Randburg |

**On-page SEO**
- Every page has its own `<title>` (under 65 characters) and a unique `<meta name="description">` (under 160 characters).
- Each page has one `<h1>`, with `<h2>` and `<h3>` used in order beneath it.
- Image file names describe the picture (for example `service-installation.jpg`) and every image has meaningful alt text. Decorative icons are hidden from screen readers.
- URLs are short and readable (`services.html`, `contact.html`).
- Pages link to each other inside the body text as well as in the menu (for example the FAQ answers link to the quote form and services page).
- The site is mobile-friendly (see Part 2) and uses `lang="en"` and `en_ZA` for the locale.
- Open Graph and Twitter card tags control how a link looks when shared. A canonical link tag is on each page.
- Structured data: a JSON-LD `Electrician` block on the home page, describing the business, phone number and address, to help local search.

**Off-page and local SEO (plan).** These can't be completed from inside the code, so this is what I would do after launch:
- Create a free Google Business Profile for each branch so Sparky shows up in Google Maps and "electrician near me" searches.
- Ask for listings in local directories (for example Yellow Pages South Africa and local community groups) so other sites link back to Sparky.
- Ask happy customers for Google reviews.
- Share the site on Facebook and WhatsApp community groups. The footer share links make this easy.

**Technical SEO**
- `robots.txt` lets all crawlers in and points to the sitemap.
- `sitemap.xml` lists all five pages.

### Page speed
- The original photos were up to 8.6 MB each. I resized them to 1200 px wide and re-saved them as optimised JPEGs, so every image is now under 200 KB.
- `loading="lazy"` on images below the fold, `fetchpriority="high"` on the hero image, and `defer` on scripts so they don't block the page.
- No large frameworks. The whole site runs on one small script plus Leaflet, which is only loaded on the Contact page.

### Security
- A Content-Security-Policy meta tag on every page limits scripts, styles and requests to the site's own files (plus OpenStreetMap map tiles).
- Visitor input is never inserted with `innerHTML`. It is added with `textContent`, so anything typed into a form can't run as code.
- Inputs have `maxlength` limits and the Contact form has a hidden honeypot field to catch spam bots.
- External links use `rel="noopener noreferrer"`.
- Leaflet is stored in the repository (`vendor/leaflet/`) instead of loaded from a CDN, so the site doesn't depend on a third party to serve its code.
- GitHub Pages serves everything over HTTPS.
- Limitation: a meta tag can't set every security header (for example `frame-ancestors`), and GitHub Pages doesn't let me add custom headers.

### Deployment
The site is hosted free on GitHub Pages: repository **Settings > Pages > Deploy from a branch > main > / (root)**. The live link is at the top of this section.

### Screenshot evidence for Part 3
In the `screenshots/` folder:
- `enquiry_errors_desktop.png` shows the validation messages on invalid input
- `enquiry_quote_desktop.png` shows the quote estimate after a valid submit
- `contact_form_desktop.png` shows the map and the generated email preview
- `contact_mobile.png` and `services_mobile.png` show the new pages at phone width
- `about_lightbox_desktop.png` shows the gallery lightbox
- `index_faq_desktop.png` shows the open FAQ accordion

The map tiles come from OpenStreetMap and need an internet connection. The branch coordinates are approximate.

### Testing
I tested the site in headless Chromium (Playwright) and checked: the search, filter and sort on the Services page; empty and invalid input on both forms; a valid enquiry returning the right urgent-surcharge price; the email link containing the right recipient, subject and body; the lightbox opening, moving between images and closing with Esc; the accordion; the map markers; and the mobile layout at 375 px. I found no JavaScript or CSP errors.

## Sitemap
Home (index.html) links to About Us, Services, Enquiry, and Contact. Every page shares the same header, navigation menu, and footer. See `sitemap.png` in this repository for the visual diagram.

## Changelog
| Date | Change |
|------|--------|
| 2026-08-09 | Initial repository setup, folder structure created. |
| 2026-08-09 | Homepage (index.html) created with hero section and highlights. |
| 2026-08-09 | About, Services, Enquiry, and Contact pages created with full content. |
| 2026-08-09 | Navigation links tested across all five pages. |
| 2026-09-07 | Added CSS classes to all HTML elements as styling hooks for Part 2. |
| 2026-09-07 | Created external stylesheet (css/style.css) with base styles, typography, and colour scheme. |
| 2026-09-07 | Built desktop layout using Flexbox (header, hero) and CSS Grid (highlights, services, contact cards). |
| 2026-09-07 | Added hover/focus/active interactive states to navigation, buttons, and form fields. |
| 2026-09-07 | Implemented responsive breakpoints for tablet (1024px) and mobile (600px). |
| 2026-09-07 | Added mobile navigation toggle with minimal supporting JavaScript (js/script.js). |
| 2026-09-07 | Added responsive image srcset to the homepage hero image, including a new smaller image file (hero-electrician-small.jpg) for mobile devices. |
| 2026-09-07 | Fixed an image mix-up on the Services page: the Certificate of Compliance card was incorrectly showing a transmission pylon photo instead of the intended breaker panel photo. Corrected the file so the image now matches the service being described. |
| 2026-09-07 | Captured screenshot evidence of all 5 pages at desktop, tablet, and mobile widths and added them to the screenshots/ folder. |
| 2026-10-31 | Part 3: rewrote js/script.js with separate functions for each feature (previously it only toggled the mobile menu). |
| 2026-10-31 | Added client-side validation to the Enquiry and Contact forms: name, email, South African phone number, dropdowns, optional date and message length, with inline error messages and a live character counter. |
| 2026-10-31 | Enquiry form: added preferred date and urgent checkbox fields. After validation the page loads data/pricing.json with fetch() and shows a price range, availability and reference number. |
| 2026-10-31 | Contact form: added phone, message type and branch fields. A valid submission builds a mailto: email to the chosen branch with a preview. Added a hidden honeypot field against spam bots. |
| 2026-10-31 | Services page: cards are now built by JavaScript from js/data.js. Added search, type filter and sort. Added three new services (LED lighting, backup power, DB board upgrades). Each card links to the Enquiry form with the job type pre-selected. |
| 2026-10-31 | Home page: added an FAQ accordion with internal links. About page: added a photo gallery with a lightbox. |
| 2026-10-31 | Contact page: added an interactive Leaflet map with both branch markers, directions links and "Show on map" buttons. Leaflet is stored in vendor/leaflet/. Phone and email addresses are now clickable links. |
| 2026-10-31 | Added scroll animations, FAQ transitions and lightbox fade, all switched off for visitors who prefer reduced motion. |
| 2026-10-31 | SEO: new title tags and unique meta descriptions and keywords on every page, canonical links, Open Graph and Twitter tags, JSON-LD Electrician data on the home page, robots.txt and sitemap.xml. |
| 2026-10-31 | Security: added a Content-Security-Policy meta tag, rel="noopener noreferrer" on external links, maxlength limits on inputs and textContent-only output of user input. |
| 2026-10-31 | Page speed: compressed all five photos from up to 8.6 MB to under 200 KB each, added lazy loading, fetchpriority on the hero image and defer on scripts. |
| 2026-10-31 | Accessibility: added a skip-to-content link, visible focus outlines, aria attributes on the menu, accordion, lightbox and form errors. |
| 2026-10-31 | Added footer share links (WhatsApp, Facebook, X). |
| 2026-10-31 | Added Part 3 screenshots, updated this README and deployed the site to GitHub Pages. |

## References
- Krug, S. 2014. *Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability*. 3rd ed. New Riders: Berkeley.
- Web.dev. 2025. *Learn responsive design*. Google Developers. Available at: https://web.dev/learn/design (Accessed: 25 July 2026).
- Domains.co.za. 2026. *Domain and hosting pricing*. Available at: https://www.domains.co.za (Accessed: 25 July 2026).
- MDN Web Docs. 2026. *CSS Grid Layout*. Mozilla. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout (Accessed: 7 September 2026).
- MDN Web Docs. 2026. *Responsive images*. Mozilla. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images (Accessed: 7 September 2026).
- Ehmitrich. 2026. Photograph of a lineman on a high-voltage tower. Unsplash. Available at: https://unsplash.com/photos/fW6lwDM26o0 (Accessed: 12 August 2026).
- Ikwuegbu, E. 2026. Photograph of an electrician installing a wall socket. Unsplash. Available at: https://unsplash.com/photos/_2AlIm-F6pw (Accessed: 12 August 2026).
- Spiske, M. 2026. Photograph of an electrical control panel. Unsplash. Available at: https://unsplash.com/photos/kK7uPfb2YWU (Accessed: 12 August 2026).
- Mahmoudi, M. 2026. Photograph of a circuit breaker panel. Unsplash. Available at: https://unsplash.com/photos/47jO5Y8nsYo (Accessed: 7 September 2026).
- Quackenbush, T. 2026. Photograph of hand tools on a wooden surface. Unsplash. Available at: https://unsplash.com/photos/IClZBVw5W5A (Accessed: 12 August 2026).
- Agafonkin, V. 2023. *Leaflet: an open-source JavaScript library for interactive maps*. Version 1.9.4. Available at: https://leafletjs.com (Accessed: 31 October 2026).
- OpenStreetMap contributors. 2026. *OpenStreetMap*. Available at: https://www.openstreetmap.org (Accessed: 31 October 2026).
- MDN Web Docs. 2026. *Fetch API*. Mozilla. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API (Accessed: 31 October 2026).
- MDN Web Docs. 2026. *Intersection Observer API*. Mozilla. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API (Accessed: 31 October 2026).
- MDN Web Docs. 2026. *Content Security Policy (CSP)*. Mozilla. Available at: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP (Accessed: 31 October 2026).
- W3C. 2026. *Accordion Pattern*. ARIA Authoring Practices Guide. Available at: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/ (Accessed: 31 October 2026).
- Google. 2026. *SEO Starter Guide*. Google Search Central. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide (Accessed: 31 October 2026).
- Schema.org. 2026. *Electrician*. Available at: https://schema.org/Electrician (Accessed: 31 October 2026).
- GitHub. 2026. *GitHub Pages documentation*. Available at: https://docs.github.com/en/pages (Accessed: 31 October 2026).
