# Image-generator prompt — simple IA diagram

A one-glance site map in the style of the classic textbook IA diagram
(colour-coded tree, one colour per depth level). This is the *simple* companion
to `saigon-kids-hackathon-ia.excalidraw`, which carries the full eleven-layer
detail.

Paste the block below into an image generator. Read **Before you generate**
first — it matters more than the prompt does.

---

## The prompt

```
A clean flat vector information-architecture diagram (a website site-map tree),
landscape 2:1 aspect ratio, on a solid light periwinkle background (#C6B9FF).

Title centered at the top in bold black sans-serif, on two lines:
"Information Architecture for
the Saigon Kids Hackathon Website"

Below the title, a top-down tree of rounded rectangles. Every box has a 3px
solid black outline and a black bold sans-serif label centered inside it. Boxes
are connected by thin black right-angled connector lines with small arrowheads
pointing downward.

ROW 1 — a single wide golden-yellow (#FFC700) box, centered:
    Home

A horizontal black bus line runs beneath it and drops five arrows into row 2.

ROW 2 — five equal-width mint-green (#55DB94) boxes, evenly spaced in one row:
    About | Schedule | Judging | Prizes | Info & FAQ

ROW 3 — five coral-salmon (#FF8477) boxes, one directly beneath each green box,
each joined to it by a short downward arrow:
    Tracks & Theme | The Day, 8:00-17:15 | 120 Points, 7 Criteria |
    Podium & Solo Awards | Fees & Requirements

ROW 4 — two cornflower-blue (#689BF7) boxes, each with a downward arrow from the
salmon box above it:
    beneath "120 Points, 7 Criteria":  The Rules
    beneath "Fees & Requirements":     Parents' Guide

Style: flat design, no gradients, no drop shadows, no textures, no 3D, no
photorealism. Crisp geometric shapes, generous even spacing, all boxes in a row
identical in height. Text must be perfectly legible and correctly spelled.
Infographic / textbook diagram aesthetic.
```

**Negative prompt** (for tools that take one):

```
gradients, drop shadows, 3d, isometric, perspective, photorealistic, texture,
noise, grain, handwriting, sketch, watercolour, clutter, extra boxes, extra
arrows, watermark, logo, misspelled text, gibberish text, overlapping text
```

---

## Before you generate

**Image generators are bad at text, and this diagram is 17 labels.** Expect
misspellings and invented words. Ranked by how well they render diagram text:

1. **Ideogram** — best-in-class for text in images. Start here.
2. **GPT-Image / ChatGPT image generation** — very good, follows layout instructions.
3. **Google Imagen 4 / Nano Banana (Gemini image)** — good, may need a few tries.
4. **Midjourney, Stable Diffusion / Flux** — will produce the right *look* but
   the labels will almost certainly be garbled. Fine if you plan to retype the
   text yourself afterwards.

Plan on 3-5 regenerations, then fix the last stubborn label by hand. If you
want it exact and first-time-right, this diagram can be rendered
deterministically instead of generated — same look, guaranteed-correct text.

---

## The exact palette

| Role | Hex | Colour |
|---|---|---|
| Background | `#C6B9FF` | light periwinkle |
| Root — Home | `#FFC700` | golden yellow |
| Level 1 — main sections | `#55DB94` | mint green |
| Level 2 — what's in them | `#FF8477` | coral salmon |
| Level 3 — separate pages | `#689BF7` | cornflower blue |
| Outlines, arrows, text | `#000000` | black |

## The exact labels

Copy these verbatim if the generator lets you correct text afterwards.

```
Home
About | Schedule | Judging | Prizes | Info & FAQ
Tracks & Theme | The Day, 8:00-17:15 | 120 Points, 7 Criteria | Podium & Solo Awards | Fees & Requirements
The Rules | Parents' Guide
```

---

## Why this shape

The blue row is not decoration — it is the site's real second tier. The whole
site is **three routes**: `/` is one long scroll holding every green and salmon
box, while `/rules` and `/parents` are the only pages of their own. So depth in
this diagram maps to something true: green and salmon are anchors on the home
page, blue is a page you actually navigate to.

Folded in to keep it to five columns: **Tracks** sits under About, **Builders
Kit** under Schedule, and **Partners** and **Founders** are left out entirely.
Use the fuller variant below if you want them.

## Fuller variant

Swap rows 2-4 for this if you would rather see all eight navbar sections. It is
seven columns instead of five, so it reads busier.

```
ROW 2 — seven mint-green (#55DB94) boxes:
    About | Tracks | Schedule | Judging | Prizes | Partners | Info & FAQ

ROW 3 — seven coral-salmon (#FF8477) boxes, one under each:
    120 Builders, Ages 9-16 | Theme: To Be Revealed | 8:00 - 17:15 |
    120 Points, 7 Criteria | Podium & Solo Awards | 3 Organisations |
    Fees & Requirements

ROW 4 — two cornflower-blue (#689BF7) boxes:
    beneath "120 Points, 7 Criteria":  The Rules
    beneath "Fees & Requirements":     Parents' Guide
```
