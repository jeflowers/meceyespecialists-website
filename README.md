# Handoff: MEC Eye Specialists — Website Redesign

## Overview
A redesign of the MEC Eye Specialists (Mercy Eye Care Medical Group) website — a multi-location
ophthalmology practice in the Greater Los Angeles area. The site is a marketing + patient-services
website with a bilingual (English / Spanish) interface and a complete set of new-patient intake forms.

Goals of the redesign:
- Modern, warm, patient-first marketing site anchored by a "cosmic" starfield hero image the client asked to keep.
- Clear presentation of services, doctors, and locations.
- Working English/Spanish language toggle on every page.
- A polished multi-step new-patient forms flow (Registration → Medical History → Insurance → Consent)
  with validation, progress, and an e-signature step.

## About the Design Files
The files in `site/` are **design references created in HTML/CSS/vanilla JS** — prototypes showing the
intended look, layout, and behavior. They are **not** meant to be shipped as-is into production.

The task is to **recreate these designs in the target codebase's environment** using its established
patterns and component library. If no front-end environment exists yet, pick an appropriate stack.
Recommended: **Next.js (React) + Tailwind CSS** or a headless CMS-backed site, since the content
(doctors, services, locations, form copy) is editable marketing content and the practice uses AWS.
Forms should post to a HIPAA-compliant backend (see "State Management / Backend").

The HTML uses no framework — just three shared static assets:
- `site/assets/site.css` — the entire design system (tokens, components, layouts).
- `site/assets/site.js` — behavior (mobile nav, scroll reveal, EN/ES toggle, homepage direction switch, multi-step form engine, signature pad, FAQ accordion).
- `site/assets/footer.js` — injects the shared footer into `[data-footer]`.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are all defined.
Recreate the UI pixel-faithfully using the codebase's libraries. Exact tokens are in "Design Tokens".

> Note: There is a homepage-only **"Visual Direction" switcher** (floating control, bottom-right of
> `index.html`) offering three skins — **Aurora** (default), **Modern**, **Calm**. This was an exploration
> aid for the client to choose a direction. **Ship only the chosen direction** (default = Aurora) and
> remove the switcher (`.dir-switch`) and the unused `body.dir-modern` / `body.dir-calm` CSS blocks.
> Confirm the choice with the client before building.

---

## Global Layout & Chrome

Every page shares the same chrome, in this order:

1. **Top bar** (`.topbar`) — dark navy (`--ink`). Left: phone `(844) 211-5462` and hours
   "Mon–Fri · 8am–5pm", each with a small icon. Right (grouped): a **Patient Portal** pill link
   (`.tb-portal`, person icon) immediately left of the **EN / ES language switch** (`.lang-switch`).
   Min-height 42px. `.tb-left` uses `margin-right:auto` so the portal+lang group sits at the far right.
2. **Sticky nav** (`header.nav`) — translucent white, blur backdrop, 76px tall, bottom hairline border.
   Left: brand lockup (`.brand` — 46px rounded navy mark with the letter "M" + aurora gradient overlay,
   then "MEC" wordmark + "EYE SPECIALISTS" eyebrow). Center: primary links. Right (`.nav-cta`):
   a primary "Request Appointment" button + a hamburger (`.nav-toggle`, shown ≤940px).
   - Primary nav links: Services · Our Doctors · Locations* · For Patients · Referrals · Contact.
     *(\*Locations is **not** a standalone page — it lives as a section on Contact, `contact.html#locations`.
     The nav does not include a Locations item; "View Locations" links in the footer point to `contact.html#locations`.)*
3. **Page content** (varies — see "Screens / Views").
4. **Footer** (`footer.site`) — dark navy with faint aurora radial glows. 4-column grid:
   brand blurb · Care links · Patients links · Contact. Bottom row: copyright + "Privacy Policy ·
   HIPAA Notice · Accessibility". Injected by `footer.js` into the `<div data-footer></div>` placeholder
   (the homepage has it inlined instead).

Active nav link is set by `site.js` by matching `data-page` to the current filename.

---

## Screens / Views

### 1. Home (`index.html`)
- **Purpose**: Brand-defining landing page; route visitors to services, doctors, and appointment/forms.
- **Layout** (top → bottom):
  1. **Hero** (`.hero`) — full-bleed cosmic starfield image (`assets/cosmic-hero.png`) as background with
     a left-weighted dark gradient veil for text legibility. Left-aligned copy (max 660px): amber eyebrow
     "Comprehensive Ophthalmology"; H1 "See the world with *remarkable clarity.*" (the italic phrase in
     `--amber-soft`); lead paragraph; two buttons ("Request an Appointment" = amber; "Explore Our Care" =
     ghost-on-dark); a stat row (4 doctors · 25k+ patients · 2 locations… see note) separated by a top hairline.
     Vertical padding `clamp(96px,16vw,188px)` top.
  2. **Trust strip** (`.trust`) — slightly lighter navy band, 4 inline items with aqua icons
     (Medicare & Medicaid accepted · Board-certified ophthalmologists · Advanced surgical technology ·
     English & Spanish speaking team).
  3. **Services** (`.section`) — centered head ("What We Treat"), 3×2 grid of `.card` links
     (Cataract Surgery, Glaucoma Management, Retinal Disease Treatment, Comprehensive Eye Exams,
     Diabetic Eye Care, Emergency Eye Care). Each card: 52px gradient icon tile, H3, body, "Learn more →".
  4. **Approach split** (`.section.bg-mist`) — 2-col: left media placeholder (gradient), right copy
     ("The MEC Difference") with a 3-item feature list (icon tile + title + line).
  5. **Doctors** (`.section`) — centered head, 4-col grid of `.doc-card` (photo + role badge + name + spec).
     Photos: `assets/doctors/{khanna,unzueta,duong,flowers-portrait}.png`. "View full profiles" ghost button below.
  6. **Forms band** (`.forms-band`, inside `.bg-mist`) — navy→teal gradient panel, 2-col: left heading
     ("Save time — finish your forms before you arrive"), right = 4 stacked links to the form pages.
  7. **Testimonials** (`.section`) — centered head, 3-col `.quote-card` (amber stars, serif quote, avatar + name).
  8. **Final CTA** (`.section.cta-final`, mist bg, centered) — H2 "Let's take care of your vision" + two buttons.
  9. **Footer** (inlined here).
  10. **`.dir-switch`** floating control (REMOVE for production — see Fidelity note).
- **Stat row note**: copy currently reads "4 board-certified doctors" but the practice has **4 named
  doctors** (Khanna, Unzueta, Duong [O.D.], Flowers). Verify final numbers/claims (patients served,
  locations) with the client before launch — they are illustrative.

### 2. Services (`services.html`)
- **Purpose**: Detail the six service lines + insurance.
- **Layout**: Dark `.page-hero` (breadcrumb + eyebrow + H1 + lead, with starfield-dot texture + aurora glows).
  Then alternating 2-col `.svc-row` rows (media placeholder ⇄ copy), one per service, each with an eyebrow,
  H2, paragraph, and a checklist (`ul`). Anchor IDs: `#cataract #glaucoma #retina #exams #diabetic #emergency`.
  Then an **Insurance band** (`.bg-mist`): centered head + 4 `.ins-pill` (Medicare, Medicaid, Most medical
  plans, Vision plans) + "Submit Insurance Information" button. Closing centered CTA.

### 3. Our Doctors (`doctors.html`)
- **Purpose**: Full provider bios.
- **Layout**: `.page-hero`, then four `.docp` rows (`grid-template-columns: 300px 1fr`, stacks ≤720px),
  each = portrait photo (`.docp-photo`, aspect 1/1.18, role tag pill bottom-left) + bio column
  (H2 name, teal `.spec-line`, paragraph(s), `.pill` specialty tags, and `.cred-block` lists for
  Education & Training / Board Certifications).
  - **Khanna** (`#khanna`, "Founder") — Vitreo-Retinal Surgery.
  - **Unzueta** (`#unzueta`, "Director") — Glaucoma & Cataract Surgery.
  - **Duong** (`#duong`, "Optometrist") — Low Vision & Medical Optometry (O.D.).
  - **Flowers** (`#flowers`, "Newest Member") — Cornea & Refractive Surgery. Has the most detail:
    3 bio paragraphs, an inline **video card** (`.video-card`) linking to a YouTube intro
    (`https://www.youtube.com/watch?v=m3Wh80B0ygk`) — see "Interactions", a `.flowers-stats` row
    (30,000+ LASIK · 20+ yrs · Nationally recognized), surgical specialization pills, and a
    Memberships & Fellowships block.
  - Closing centered CTA on `.bg-mist`.

### 4. For Patients (`patients.html`)
- **Purpose**: Patient hub — portal, quick actions, forms, FAQ.
- **Layout**: `.page-hero`; then a 2-col `.portal-grid`: left `.portal-card` (navy→teal gradient) holds a
  **Patient Portal login form** (email + password + amber "Log In" + HIPAA-secure note); right `.bill-card`
  holds `.quick-links` (Pay My Bill, Request Appointment, Complete New-Patient Forms, Refer a Patient).
  Then a **New Patient Forms** section (`.bg-mist`) — 4 `.card` links to the forms. Then an **FAQ**
  (`.acc` accordion, 4 items). `#billpay` anchor on the bill card.

### 5. Referrals (`referrals.html`)
- **Purpose**: Let referring providers send a patient.
- **Layout**: `.page-hero`; 2-col `.ref-grid`: left = "How It Works" 3-step list + a fax/email helper box;
  right = `.ref-form-card` containing a single-step `.mform` (provider info, patient info, reason, urgency
  radio) with validation and a success state.

### 6. Contact (`contact.html`)
- **Purpose**: Contact info, message form, and **all four office locations**.
- **Layout**: `.page-hero`; 2-col `.contact-grid`: left = contact info rows (`.ci`: Phone, Email,
  "Our Offices" with a jump link to `#locations`, Hours) + an "Eye emergency?" helper box; right =
  `.contact-form-card` single-step `.mform` (name, email, phone, topic `select`, message) with success state.
  Then **`#locations`** section (`.bg-mist`): centered "Find Us" head + a 2-col `.loc-big` grid of four
  `.loc-panel` cards — **Downtown Los Angeles** (Main Clinic & Surgery Center), **Montebello**, **Lakewood**
  (notes "Dr. Duong sees patients here"), **Long Beach**. Each panel: stylized CSS "map" with an amber pin,
  then body with city H2, address line, detail rows (phone, hours table, service note), and Book/Directions
  buttons. The map graphics are pure CSS placeholders — **replace with a real embedded map** (Google Maps
  embed or static map image) and real street addresses.

### 7–10. New-Patient Forms (`forms/*.html`)
All four share the **`.form-shell`** layout: `grid-template-columns: 280px 1fr` (stacks ≤880px).
- **Left aside** (`.form-aside`, sticky): a `.fprogress` card = "Your progress" + a `.fprog-bar`
  (animated fill) + one `.fprog-item` per step (numbered circle that fills teal when done/current),
  plus an `.aside-help` box (privacy/security note).
- **Right** (`.form-panel`): the stepped form (`.mform` → `.fsteps-wrap` → multiple `.fstep`), then a
  hidden `.fdone` success panel.

Steps per form:
- **Registration** (`registration.html`, 4 steps): About you · Contact & address · Emergency & pharmacy ·
  Review. Success → links onward to Medical History.
- **Medical History** (`medical-history.html`, 4 steps): Visit & vision · Eye history · General health ·
  Review. Success → Insurance.
- **Insurance** (`insurance.html`, 3 steps): Primary insurance · Secondary & gov't · Upload card & review.
  Step 3 has clickable upload tiles (`[data-upload]`) that toggle a "✓ uploaded" filled state (mock only —
  wire to real file upload). Success → Consent.
- **Consent** (`consent.html`, 3 steps): HIPAA Notice (scrollable `.legal-box` + acknowledge checkbox) ·
  Consent to treat + financial policy (two `.legal-box` + two checkboxes) · Sign & submit (full name, date,
  and a **canvas signature pad** `.sigpad`). Success = "All forms complete!".

The forms are chained: each success screen links to the next form, forming a guided intake flow.

---

## Interactions & Behavior
All behavior lives in `site/assets/site.js`. Re-implement equivalently in the target framework.

- **Mobile nav**: `.nav-toggle` toggles `.navlinks.open` (≤940px the links collapse into a dropdown panel).
- **Scroll reveal**: elements with `.fade-up` animate in via IntersectionObserver (adds `.reveal`,
  respects `prefers-reduced-motion`; `data-delay` sets stagger in ms). Threshold 0.12.
- **EN/ES language toggle**: `.lang-switch button[data-lang]`. Every translatable element carries
  `data-en` and `data-es` attributes; `applyLang(lang)` swaps `textContent` (and `data-en-ph`/`data-es-ph`
  for input placeholders), updates `<html lang>`, and persists to `localStorage['mec-lang']`.
  - **Important for re-implementation**: in React/Vue use a real i18n layer (e.g. `next-intl`, `react-i18next`)
    keyed by string IDs rather than DOM attribute swapping. All copy strings (EN + ES) are present in the HTML
    `data-en`/`data-es` pairs — extract them into message catalogs.
  - Note: because the toggle sets `textContent`, any element with both `data-en` and child markup would lose
    that markup; the prototype avoids this by putting `data-en` on inner `<span>`s. Keep that in mind.
- **Homepage direction switch** (`.dir-switch`): toggles `body.dir-aurora|dir-modern|dir-calm`, persists to
  `localStorage['mec-dir']`. **Remove for production** once a direction is chosen.
- **Multi-step form engine** (`.mform`): Next validates the current `.fstep`'s `[required]` fields
  (text non-empty, email regex, checkbox checked), marking invalid fields with `.field.invalid` (shows the
  `.err` message, red border/tint). On the last step, Next reveals `.fdone` and hides the steps + progress.
  Back is unguarded. Completed progress items are clickable to jump back. The progress bar fills
  `current/(steps-1) * 100%`. Smooth-scrolls to the form top on each step change.
- **Signature pad** (`canvas.sigpad`, consent step 3): mouse + touch drawing on a DPR-scaled canvas;
  `.sig-clear` clears it; the "Sign here…" hint fades on first stroke. For production, capture the signature
  as a PNG/SVG data URL and submit with the consent record.
- **FAQ accordion** (`.acc`): clicking `.acc-q` toggles `.acc-item.open` and animates `.acc-a` max-height.
- **Inline video** (doctors, Flowers): `.video-card` is an `<a target="_blank">` to YouTube. (An earlier
  inline embed was replaced with a click-to-open card because the preview sandbox blocks YouTube; on a real
  site you may embed a privacy-mode iframe `youtube-nocookie.com` instead.)
- **Buttons/links** all have hover states (see CSS): primary lifts + shadow, ghost shifts border/color, cards
  lift + aqua border on hover.

## State Management / Backend
The prototype has no backend. For production:
- **Language**: app-level locale state (persisted), default `en`.
- **Forms**: each is a stepped form with per-step validation. Model as a wizard with a single submission
  payload per form. Submit to a **HIPAA-compliant** endpoint (the practice uses AWS + Microsoft O365);
  PHI must be encrypted in transit and at rest, with a signed BAA for any third-party form/e-sign service.
  - Registration: demographics, contact, emergency contact, pharmacy.
  - Medical history: visit reason, symptoms (multi), eye/family history, general health, meds, allergies.
  - Insurance: primary/secondary payer + Medicare/Medicaid + card image upload + verification authorization.
  - Consent: HIPAA acknowledgment, consent to treat, financial responsibility, typed name + date + signature image.
- **Patient Portal / Bill Pay**: these are placeholder links — integrate with the practice's actual portal/EHR.
- **Maps**: replace CSS map placeholders with real embeds + confirmed addresses.

## Responsive Behavior
- Container max-width 1200px, fluid gutters `clamp(20px,5vw,56px)`.
- Grids collapse: `.g-3/.g-4` → 2-col ≤940px → 1-col ≤640px; `.g-2` → 1-col ≤640px.
- Nav links collapse into a toggle dropdown ≤940px; the `.nav-cta` hides the non-primary buttons ≤940px.
- Form shell and doctor rows stack on narrow screens (≤880 / ≤720px). Location grid → 1-col ≤820px.
- Type and section padding scale with `clamp()` throughout.

---

## Design Tokens
Defined as CSS custom properties at the top of `site/assets/site.css` (`:root`).

### Color
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0A1A2C` | Primary dark navy (top bar, footer, dark sections, headings) |
| `--ink-2` | `#11293D` | Secondary navy (trust strip) |
| `--ink-text` | `#16313F` | Body text on light |
| `--teal` | `#0E7C88` | Primary brand / buttons / links |
| `--teal-deep` | `#0A5A63` | Hover/darker teal |
| `--teal-700` | `#0C6A74` | — |
| `--aqua` | `#3FB4BD` | Accent (icons, hovers) |
| `--aqua-soft` | `#C9E8EA` | Icon tile backgrounds |
| `--amber` | `#E29A3C` | Warm accent CTA (hero button, pins, on-dark eyebrow) |
| `--amber-deep` | `#C97F22` | Amber hover |
| `--amber-soft` | `#F6DCB0` | Hero italic text, on-dark accents |
| `--paper` | `#FFFFFF` | Page background |
| `--mist` | `#F1F6F7` | Alt section background |
| `--mist-2` | `#E4EEF0` | Photo placeholders |
| `--line` | `#D9E5E8` | Card borders |
| `--line-soft` | `#EAF1F2` | Hairlines |
| `--slate` | `#5C747E` | Muted body text |
| `--slate-2` | `#84979F` | Faint text |

### Typography
- **Headings**: `Newsreader` (serif), weight 500 default, line-height ~1.08, letter-spacing -0.01em,
  `text-wrap: balance`. Loaded from Google Fonts (optical-size axis 6–72).
- **UI / body**: `Hanken Grotesk` (sans), weights 400–800. Body line-height 1.6.
- Scale (fluid): H1 hero `clamp(40px,6.4vw,78px)`; section H2 `clamp(30px,4vw,46px)`; page-hero H1
  `clamp(34px,5vw,60px)`; card H3 ~20–22px; lead `clamp(17px,1.4vw,19px)`; body 14.5–16px; eyebrow 12.5px
  uppercase, letter-spacing 0.18em, teal (amber on dark).
- Google Fonts import is the first line of `site.css`.

### Spacing / Radius / Shadow
- Section vertical padding: `clamp(64px,8vw,110px)`.
- Radius: `--radius:16px`, `--radius-sm:10px`, `--radius-lg:26px`; pills/buttons `999px`.
- Shadow: `--shadow: 0 1px 2px rgba(10,26,44,.04), 0 8px 30px -12px rgba(10,26,44,.18)`;
  `--shadow-lg: 0 30px 70px -30px rgba(10,26,44,.40)`.
- Buttons: padding `14px 26px` (lg `17px 34px`), font 15–16px / weight 600, 1.5px border, 0.22s transitions.

### Key component classes (reference, all in `site.css`)
`.btn` (`.btn-primary` teal, `.btn-amber`, `.btn-ghost`, `.btn-ghost.on-dark`, `.btn-lg`) ·
`.container` · `.eyebrow` (`.on-dark`) · `.lead` · `.section` (`.bg-mist`, `.bg-ink`) · `.section-head` ·
`.grid`/`.g-2`/`.g-3`/`.g-4` · `.card` · `.pill` · `.page-hero` · `.acc` · `.topbar`/`.tb-portal`/`.lang-switch` ·
`header.nav`/`.brand`/`.navlinks`/`.nav-cta` · `footer.site` · form system: `.form-shell` `.fprogress`
`.fprog-bar` `.fprog-item` `.form-panel` `.fstep` `.fgrid` `.field`(`.invalid`) `.choices`/`.choice`
`.fnav` `.legal-box` `.sig-wrap`/`.sigpad` `.fdone`.

## Assets
Located in `site/assets/`:
- `cosmic-hero.png` — the starfield/aurora hero background (client-supplied; the original had baked-in
  "MEC" wordmark + phone number which were **cropped out** so fresh typography sits on top). Used as the
  homepage hero background.
- `doctors/khanna.png`, `doctors/unzueta.png`, `doctors/duong.png` — provider headshots (client-supplied).
- `doctors/flowers-portrait.png` — Dr. Flowers headshot, **cropped from a full-figure studio photo** to a
  head-and-shoulders portrait (2:3) so it matches the framing of the other three cards. Used on the homepage
  doctor grid and the Doctors page.
- Icons are **inline SVG** (stroke-based, currentColor) throughout — no icon font/library dependency. Swap
  for the codebase's icon set if it has one (Lucide is the closest match to the stroke style used).
- Fonts: Newsreader + Hanken Grotesk via Google Fonts (self-host for production/privacy if preferred).

## Screenshots
Full-page reference captures are in `screenshots/` (captured at ~924px wide, so the nav shows its
mobile/collapsed state; the homepage's dev-only direction switcher is hidden in the shot):
- `01-home.png` — Home
- `02-services.png` — Services
- `03-doctors.png` — Our Doctors
- `04-patients.png` — For Patients
- `05-referrals.png` — Referrals
- `06-contact.png` — Contact (incl. the Locations section)
- `07-form-registration.png` — Patient Registration form
- `08-form-medical-history.png` — Medical History form
- `09-form-insurance.png` — Insurance form
- `10-form-consent.png` — Consent form

## Files
Design reference files (in `site/`):
- `index.html` — Home (contains the removable `.dir-switch` + inlined footer).
- `services.html`, `doctors.html`, `patients.html`, `referrals.html`, `contact.html` (Contact holds `#locations`).
- `forms/registration.html`, `forms/medical-history.html`, `forms/insurance.html`, `forms/consent.html`.
- `assets/site.css` — full design system.
- `assets/site.js` — all behavior.
- `assets/footer.js` — shared footer injector.
- `assets/cosmic-hero.png`, `assets/doctors/*.png` — images.

## Content / i18n note
All marketing and form copy exists in both languages inside the HTML as `data-en` / `data-es`
(and `data-en-ph` / `data-es-ph` for placeholders). Extract these into proper message catalogs.
Placeholder/illustrative content to confirm with the client before launch: exact street addresses,
office hours per location, patient/volume stats, and the doctors' detailed credentials.
