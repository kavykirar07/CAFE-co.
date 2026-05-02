# CAFE co. Project Architectural & Design Audit

## 1. Project Overview & Scope
The goal is to engineer a 15-page web application for "CAFE co." blending a "Brutalist-Chic" design aesthetic with a high-performance modern tech stack. The user experience mandates visually striking layouts (staggered grids, bleeder elements) layered over a robust backend (Node.js/Python).

## 2. Design System & Frontend Architecture
*   **Aesthetic Rules:** "Post-Industrial Brutalism meets High-Fashion editorial design". Strict adherence to the 70/20/10 color rule with the specified palette (Void, Cream, Burn, Grain, Chalk).
*   **Typography:** Google Fonts pairing enforced — Bebas Neue/Anton (Hero), Playfair Display (Editorial Headers), DM Sans/Inter (Body), Space Mono (Accent).
*   **Layout Engine:** 1280px Bootstrap 5 Grid foundation but intentionally "broken" (staggered overlaps, asymmetric columns, bleeder text, horizontal rule dividers).
*   **Animation & Interactions (GSAP):** Demands high-performance animations, including split text, scroll-triggered wipe reveals, magnetic cursors, parallax effects, and smooth page transitions.
*   **Dynamic Assets:** Unsplash API integration for fetching aesthetic imagery with strict `object-fit`, custom aspect ratios, and subtle editorial grading (`contrast(1.08) saturate(0.92)`).

## 3. Backend & Database Architecture
*   **Tech Stack:** Node.js + Express (Prisma) OR Python + FastAPI (SQLAlchemy) alongside SQLite (dev) / PostgreSQL (prod).
*   **Database Schema:**
    *   `bookings` (Page 10): Needs robust conflict-check logic to prevent double bookings.
    *   `inquiries` (Page 14): Standard contact form capture.
    *   `event_leads` (Page 15): Complex schema involving JSON arrays for `add_ons` and ENUMs for statuses and budgets.
    *   `menu_items` & `shop_products`: Required for the dynamic, DB-driven Menu (Page 05) and Shop pages (Page 08, 09).

## 4. Execution Complexity & Potential Bottlenecks
*   **Grid vs. Brutalism:** Reconciling Bootstrap 5's rigid grid with the mandate for "asymmetric columns" and "-15vh overlaps" will require highly calculated SCSS overrides.
*   **Performance vs. Animations:** Extensive use of GSAP (magnetic hover, cursor difference blend modes, parallax) across 15 pages might cause layout thrashing if not optimized with `ScrollTrigger.batch()` and hardware acceleration.
*   **Page 15 (Celebration Hub):** This multi-step form is the most technically complex feature, involving dynamic UI updates, state management, price calculations, and backend submission logic.
*   **Unsplash Integration Limits:** Real-time fetching of imagery from Unsplash on every load may lead to rate limiting or slow Time to Interactive (TTI). Using seeded images or proxy caching may be required.

## 5. Recommended Action Plan
1.  **Backend First:** Initialize server, configure DB (SQLite for dev speed), and establish RESTful APIs (`/api/bookings`, `/api/inquiries`, `/api/events/leads`).
2.  **Global Styles & Tokens:** Create `scss/_variables.scss` incorporating the design system constraints (colors, fonts, mixins for brutalist cards).
3.  **Foundation Elements:** Develop the Navbar, Footer, and the Custom Cursor system. 
4.  **Hero/Landing Blueprint (Page 01):** Build out the primary layout system focusing heavily on precise offset math and grid manipulation.
5.  **GSAP Setup:** Initialize global scroll handlers and animation utilities before scaling up the rest of the 14 pages. 

Ready to begin execution based on the sequence outlined. Please provide the command to start.
