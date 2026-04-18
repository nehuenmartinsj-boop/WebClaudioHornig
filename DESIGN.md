# Design System: The Empathetic Editorial

## 1. Overview & Creative North Star
**Creative North Star: The Curated Sanctuary**

This design system moves away from the clinical, "template" feel of standard medical or psychological landing pages. Instead, it adopts a **High-End Editorial** aesthetic—blending the authority of a premium publication with the warmth of a private, high-ceilinged consulting room. 

The visual strategy relies on **intentional asymmetry** and **tonal layering**. We bypass the rigid "box-and-line" structure of traditional web design in favor of organic flow. By utilizing generous white space and overlapping elements (e.g., a portrait breaking the bounds of a container), we create a sense of movement and "transformation"—mirroring the psychological journey of Claudio Hornig’s clients.

---

## 2. Colors & Surface Philosophy
The palette is rooted in grounding tones that evoke trust and nature.

### The Palette (Token References)
*   **Primary (`#003857` / `primary-container: #1B4F72`):** The "Anchor." Used for moments of high authority and deep trust.
*   **Secondary (`#39665f` / `secondary-container: #b9e9e0`):** The "Breath." Used to signify healing, calm, and organic growth.
*   **Tertiary (`#4c2e07` / `tertiary-fixed: #ffdcbc`):** The "Illumination." Our Soft Gold accent, used sparingly to denote premium value and transformative breakthroughs.

### The "No-Line" Rule
To maintain a high-end, seamless feel, **1px solid borders are strictly prohibited for sectioning.** 
*   **Boundaries:** Define changes in content using background shifts (e.g., transitioning from `surface` to `surface-container-low`). 
*   **Flow:** Use the `secondary-container` (Sage) for soft, full-width sections to create a visual "cleansing" between dense text blocks.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine stationery.
*   **Nesting:** Place `surface-container-lowest` cards atop a `surface-container` background to create a "lift" that feels natural rather than artificial.
*   **The Glass & Gradient Rule:** For floating navigation or modal overlays, use `surface-container-lowest` with an 80% opacity and a `20px` backdrop-blur. 
*   **Signature Textures:** Use a subtle linear gradient on primary CTAs—transitioning from `primary` (#003857) to `primary-container` (#1B4F72)—to add "soul" and depth to the button.

---

## 3. Typography
We use a high-contrast scale to emphasize Claudio’s professional narrative.

*   **Display & Headlines (Playfair Display / Noto Serif):** These are our "Voice." 
    *   *Role:* Conveying empathy and sophistication. Use `display-lg` for hero statements with tight letter-spacing (-0.02em) to feel like a premium masthead.
*   **Titles & Body (Inter):** These are our "Support." 
    *   *Role:* Absolute legibility and modern clarity. Use `body-lg` (1rem) for general copy to ensure accessibility for all age groups.
*   **The Hierarchy Goal:** Use `display-md` for patient testimonials to make them feel like "quotes from an interview," elevating the social proof to an editorial level.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often too "heavy" for a psychology practice. We use **Tonal Layering** to create hierarchy.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-high` element should be reserved for the most interactive elements (like a "Book Appointment" card), creating a soft, natural lift without the need for dark outlines.
*   **Ambient Shadows:** If a shadow is required for a floating CTA, use a custom blur: 
    *   `box-shadow: 0 12px 40px rgba(26, 28, 28, 0.06);` 
    *   The shadow must be a tinted version of `on-surface` at a very low opacity (4–8%) to mimic soft, ambient clinic lighting.
*   **The Ghost Border:** For input fields, use the `outline-variant` token at **15% opacity**. It provides a "hint" of a container without breaking the ethereal, open feel of the page.

---

## 5. Components

### Buttons (The "Pathways")
*   **Primary:** Rounded-xl (`1.5rem`), using the `primary` to `primary-container` gradient. Text is `on-primary` (white).
*   **Secondary:** Ghost style. No background, `outline-variant` (at 20% opacity) border, with `primary` colored text.
*   **Hover State:** A subtle shift in elevation—move from `surface-container` to `surface-container-high`.

### Cards & Content Blocks
*   **Forbid Divider Lines:** Separate content using the Spacing Scale (e.g., `32px` or `48px` gaps).
*   **Organic Shapes:** Use `rounded-xl` (1.5rem) or `rounded-full` for imagery. Apply a "wave" mask to the bottom of hero images to soften the transition into the background.

### Input Fields
*   **Style:** Minimalist. Only a bottom border (Ghost Border style) or a very soft `surface-container-lowest` fill. 
*   **Focus State:** The bottom border transitions to `secondary` (Sage) to signify a "healing" interaction.

### Unique Context Components
*   **The "Moment of Reflection" Quote:** A full-width `surface-container-low` section with a large `display-sm` serif quote, center-aligned, with generous vertical padding (`80px+`).
*   **Process Steps:** Instead of numbered lists, use soft organic blobs (using `secondary-container`) with `title-lg` typography to walk the client through the first session.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetry:** Place an image on the left and text on the right, but let the image "bleed" off the edge of the screen or overlap a background shape.
*   **Embrace White Space:** If you think there is enough space, add 20% more. This reduces the cognitive load on a potentially stressed user.
*   **Soft Transitions:** Use CSS transitions (300ms ease-out) for all hover states to maintain the "calm" persona.

### Don't:
*   **No Hard Corners:** Avoid `rounded-none`. Psychology is about softness and flexibility; use `rounded-lg` or `rounded-xl` for all containers.
*   **No Pure Black:** Never use `#000000`. Use `on-surface` (#1A1C1C) for text to keep the contrast high but the "vibe" soft.
*   **No "Stock" Icons:** Avoid generic, heavy-fill icons. Use fine-line, 1pt stroke icons that match the `primary` color.