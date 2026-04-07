# Design System Specification: Editorial Precision

## 1. Overview & Creative North Star: "The Architectural Monolith"
This design system is built on the philosophy of **Architectural Monolithism**. We treat the digital interface not as a collection of widgets, but as a high-end physical space—think of a glass-walled executive suite overlooking a nocturnal skyline. 

The "North Star" is to move away from the "web-as-a-document" mentality and toward "web-as-an-installation." We achieve this through:
*   **Massive Editorial Scale:** Using `display-lg` typography as a structural element rather than just a heading.
*   **Intentional Asymmetry:** Utilizing generous whitespace (`spacing-24`) to create a rhythmic, non-linear flow that guides the eye with corporate authority.
*   **Tonal Authority:** A high-contrast relationship between deep charcoals and pure whites, punctuated by the surgical precision of MAGINF Orange.

## 2. Colors: Depth Through Atmosphere
We do not use color to decorate; we use it to define space.

### The Color Logic
*   **The Neutrals (Charcoal & Graphite):** Our `primary` (#5F5E5E) and `on-background` (#1C1B1B) represent the core technical stability of the brand.
*   **The Accent (MAGINF Orange):** The `tertiary-container` (#FF6B00) is a high-energy signal. Use it exclusively for primary actions or to highlight critical data points. It must never occupy more than 5% of the total screen real estate.
*   **The Surface System:** We utilize a "Paper-on-Stone" approach. High-importance content sits on `surface-container-lowest` (#FFFFFF), while secondary information recedes into `surface-container` (#F0EDED).

### The "No-Line" Rule
**1px solid borders are strictly prohibited for sectioning.** To separate content, you must use:
1.  **Background Shifts:** Transition from `surface` (#FCF9F8) to `surface-container-low` (#F6F3F2).
2.  **Whitespace:** Using the `spacing-16` or `spacing-20` tokens to create a "void" that acts as a natural barrier.

### Glass & Gradient Soul
To avoid a flat, "Bootstrap" appearance, apply `backdrop-blur` (12px-20px) to floating navigation and modals using a semi-transparent `surface` color. For Hero CTAs, use a subtle linear gradient from `tertiary` (#A04100) to `tertiary-container` (#FF6B00) to give the orange a three-dimensional, "backlit" quality.

## 3. Typography: The International Voice
We employ a pairing of **Manrope** for structural impact and **Inter** for functional clarity.

*   **Display & Headlines (Manrope):** These are the "bones" of the brand. `display-lg` should be set with a `-0.02em` letter-spacing to feel tight and engineered. Use these for bold, punchy statements that define the section's purpose.
*   **Body & Labels (Inter):** High-readability sans-serif for the "fine print." Ensure `body-lg` has a generous line height (1.6) to maintain the editorial feel.
*   **Bilingual Flex:** All typography containers must use `min-width` logic rather than fixed widths to accommodate the character expansion of German or the vertical height of Japanese script.

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often a sign of lazy design. In this system, we use **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by stacking. A card component should be `surface-container-lowest` (#FFFFFF) placed on a background of `surface-container` (#F0EDED). This creates a "soft lift" that feels architectural.
*   **Ambient Shadows:** If a floating element (like a dropdown) requires a shadow, use a custom property: `0px 24px 48px rgba(28, 27, 27, 0.06)`. This is a large, "whisper-soft" shadow that mimics ambient light in a professional studio.
*   **The Ghost Border:** For accessibility in form fields, use the `outline-variant` (#E2BFB0) at 20% opacity. It should be felt, not seen.

## 5. Components: The Premium Kit

### Buttons
*   **Primary:** Solid `tertiary-container` (#FF6B00) with `on-tertiary-container` text. 0.25rem (`rounded-DEFAULT`) corners.
*   **Secondary:** `surface-container-highest` (#E5E2E1) with `on-surface` (#1C1B1B) text. No border.
*   **Tertiary:** Ghost style. No background, `on-surface` text with a 2px underline that expands on hover.

### Cards & Lists
*   **Anti-Divider Rule:** Forbid 1px horizontal lines between list items. Instead, use a background color change on hover (`surface-container-high`) or `spacing-4` vertical gaps between items.
*   **Imagery:** All cards featuring technical imagery should use a subtle `0.5` spacing inner padding to frame the "abstract servers" or "network nodes" like a gallery piece.

### Input Fields
*   **Style:** Minimalist. No four-sided boxes. Use a bottom-only border (`outline-variant` at 40%) that turns into a 2px `tertiary-container` line on focus.
*   **Error State:** Use `error` (#BA1A1A) text only. Do not turn the entire background red; keep the corporate sophistication intact.

### Signature Component: The "Data Monolith"
A specialized container for B2B metrics. A large `display-md` number paired with a `label-sm` description, encased in a `surface-container-low` box with a `tertiary-container` accent strip (2px) on the left edge.

## 6. Do's and Don'ts

| Do | Don't |
| :--- | :--- |
| **Do** use `spacing-20` and `spacing-24` to create "pockets of silence" in the layout. | **Don't** cram multiple B2B features into a single viewport. |
| **Do** use `manrope` for numbers and statistics to emphasize precision. | **Don't** use MAGINF Orange for icons or non-interactive decorative elements. |
| **Do** layer `surface` tokens to create hierarchy. | **Don't** use "Drop Shadows" from standard software presets. |
| **Do** ensure all containers are fluid to support bilingual text expansion. | **Don't** use 1px solid black borders for any reason. |

---
*Note: This system prioritizes the "Magnificence" of the brand through restraint. When in doubt, add more whitespace and remove a line.*