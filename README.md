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
- Interactive form validation (added in Part 3)

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
