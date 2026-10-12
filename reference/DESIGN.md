---
name: Technical Precision Editorial
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c1c9bf'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8b938a'
  outline-variant: '#414942'
  surface-tint: '#9dd3aa'
  primary: '#9dd3aa'
  on-primary: '#01391c'
  primary-container: '#4a7c59'
  on-primary-container: '#e1ffe5'
  inverse-primary: '#376847'
  secondary: '#c7c6c6'
  on-secondary: '#303031'
  secondary-container: '#464747'
  on-secondary-container: '#b5b5b5'
  tertiary: '#c8c6c5'
  on-tertiary: '#303030'
  tertiary-container: '#727171'
  on-tertiary-container: '#f9f7f6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b9efc5'
  primary-fixed-dim: '#9dd3aa'
  on-primary-fixed: '#00210e'
  on-primary-fixed-variant: '#1e5031'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.04em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  telemetry-lg:
    fontFamily: JetBrains Mono
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  telemetry-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0em
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.12em
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an ultra-precise, athletic-editorial paradigm engineered for automated broadcast production and deep ball-tracking telemetry. The aesthetic merges the stark discipline of high-performance Swiss editorial layouts with the raw functionalism of broadcast studio control monitors.

### Personality & Emotional Tenor
- **Surgical & Exacting:** Every line, metric, and frame boundary conveys sub-pixel precision and millimeter-accurate trajectory analysis.
- **Athletic & Kinetic:** Tense, focused, and free of extraneous decoration. Visual energy emerges solely from high-contrast typography, live video feeds, and acute telemetry accents.
- **Authoritative & Broadcast-Grade:** Evokes professional sports network control rooms and Olympic-tier timing systems.

### Design Movement
The interface relies on an austere fusion of **Technical Brutalism** and **Minimalist Editorialism**. Geometry is strictly orthogonal: zero corner radii across the entire interface, hair-thin 1px dividing lines, rigid bounding boxes, and intentional structural density that values information throughput over decorative padding.

## Colors

The palette operates on calibrated monochrome foundations punctuated by a singular, focused Sage Green accent that signals automated intelligence, live analysis, and active spin vectors.

### Palette Architecture
- **Primary Accent (`#4A7C59` dark / `#5C8A6B` light):** Soft Sage Green. Reserved exclusively for tracking trajectories, real-time ball velocity spikes, active compute states, and primary system confirmations. It must never be applied to generic decorative surfaces.
- **Dark Mode Surfaces:**
  - Canvas Root: `#121212` (pure deep charcoal)
  - Secondary Structural Panel: `#181818` (monitored feed wrapper, sidebar)
  - Elevated Metric Cell: `#1E1E1E` (telemetry cards, scorecard badges)
  - Structural Borders: `#2A2A2A` (default divisions) and `#333333` (active/focused boundaries)
- **Light Mode Surfaces:**
  - Canvas Root: `#F8F9FA` (clean matte off-white)
  - Structural Panel: `#FFFFFF` (pure white data wells)
  - Structural Borders: `#E0E0E0` (default divisions) and `#CCCCCC` (interactive strokes)
- **Typographic Neutral Hierarchy:**
  - Dark Mode: Primary `#FFFFFF` (100% contrast readouts), Secondary `#888888` (metric labels, passive telemetry), Muted `#555555` (bracket glyphs, inactive gridlines).
  - Light Mode: Primary `#111111` (high-density ink black), Secondary `#666666` (structural text), Muted `#999999` (metadata separators).

## Typography

The typographic hierarchy implements an intentional split: **Space Grotesk** drives structural, hyper-tracked editorial titles; **Inter** ensures crystal-clear utility across descriptions and inputs; and **JetBrains Mono** anchors timecodes, ball velocity metrics, frame counts, and bracketed micro-copy.

### Implementation Rules
- **Headline Capitalization:** All `headline-md` and `label-caps` must be rendered in pure uppercase (`text-transform: uppercase`) with wide tracking (`letter-spacing: 0.08em` to `0.12em`) to echo professional broadcast chassis markings.
- **Tabular Monospace Alignment:** `telemetry-lg`, `telemetry-md`, and `label-code` must utilize tabular figures (`font-variant-numeric: tabular-nums`) to prevent layout shifts during live frame decoding and score changes.
- **Bracket Integration:** Actionable buttons and status labels use typographic monospaced delimiters (e.g., `[ 114 KM/H ]`, `[ EXPORTING ]`) rendered in muted gray with active interior text.

## Layout & Spacing

The interface employs a dense, high-information-ratio **Fluid Grid** engineered around broadcast production timelines and multi-angle camera feeds.

### Grid Framework
- **Desktop (≥1280px):** 12-column rigid modular matrix. Outer margin: `2.5rem` (`40px`), column gutter: `1.5rem` (`24px`). Common allocations:
  - 3 columns: Video input queue & telemetry metrics
  - 6 columns: Active 4K broadcast preview with CV overlays
  - 3 columns: AI production pipeline, shot classifier, and export controls
- **Tablet (768px - 1279px):** 8-column layout. Margin: `1.5rem` (`24px`), gutter: `1rem` (`16px`). Preview stacks above split telemetry and pipeline panels.
- **Mobile (<768px):** 4-column single-stream stack. Margin: `1rem` (`16px`), gutter: `1rem` (`16px`). Control modules fold into edge-to-edge tabbed panels with hairline borders.

### Alignment & Spacing Rhythm
- **Border-to-Border Touching:** Data panels dock directly against each other, sharing standard 1px `#2A2A2A` borders without gap voids, creating an integrated broadcast control desk structure.
- **Component Padding Scale:**
  - Micro tags / Code tags: `space-xs` (vertical) by `space-sm` (horizontal).
  - Metric cells / Score cards: `space-sm` (vertical) by `space-md` (horizontal).
  - Production containers: `space-lg` internal inset.

## Elevation & Depth

This design system rejects drop shadows, blurs, and pseudo-physical elevation entirely. Depth is structural, absolute, and purely planar.

### Mechanics of Flat Hierarchy
- **Strictly No Shadows:** Zero `box-shadow` throughout the design. Elevation tiers are established entirely through surface luminance steps and perimeter hairpins.
- **Hairline Delimitation:** Every distinct spatial block (video viewport, metric readouts, score bug) is bounded by a crisp `1px solid #2A2A2A` stroke (in dark mode) or `1px solid #E0E0E0` (in light mode).
- **Surface Tiering:**
  - Ground Tier (`#121212`): Base application canvas.
  - Panel Tier (`#181818`): Sidebar modules, monitor chassis, inspector panels.
  - Active Data Tier (`#1E1E1E`): Highlighted telemetry cell, live match card, selected clip segment.
- **Active Focus & Hover Accents:** Focused inputs, dragging states, or active camera feeds swap the neutral perimeter border directly to a crisp `1px solid #4A7C59` (Sage Green), creating an instantaneous focal lock without expanding layout geometry.

## Shapes

### Absolute Zero Radii
The geometry of this system is relentlessly orthogonal. All elements adhere strictly to:
```css
border-radius: 0px !important;
```

This applies universally without exception:
- Application modals and popover menus.
- Push buttons, segmented switches, and dropdown triggers.
- Video container viewports and player control overlays.
- Telemetry badges, metric indicators, and pill tags.
- Progress bars, frame scrubbing indicators, and timeline ticks.
- Form inputs, text areas, and checkboxes.

Corners are razor-sharp. Intersecting borders meet at pure 90-degree angles, echoing laboratory oscilloscopes and technical drafting schematics.

## Components

### 1. Bracketed Action Buttons
- **Structure:** Zero radius, crisp 1px border. Styled with monospaced brackets bounding the label.
- **Primary Action:**
  - Dark: Solid `#181818` background, `1px solid #4A7C59` border, `#FFFFFF` text. Bracket glyphs styled in `#4A7C59`.
  - Format: `[ Upload Match Video ]` or `[ Download 4K Match Clip ]`.
  - Hover: Background transitions to `#4A7C59`, text to `#FFFFFF`, brackets to `#FFFFFF`.
- **Secondary / Utility Action:**
  - Background transparent, `1px solid #2A2A2A` border, `#888888` text.
  - Hover: Border switches to `#555555`, text switches to `#FFFFFF`.

### 2. Telemetry Metric Units
- **Structure:** Modular grid cell. Outer `1px solid #2A2A2A` frame.
- **Layout:**
  - Top: Uppercase label in `label-caps` (`#888888`), e.g., `BALL VELOCITY // PEAK`.
  - Center: Large tabular readouts in `telemetry-lg` (`#FFFFFF`), e.g., `118.4 KM/H`.
  - Bottom: Micro-sparkline or spin vector indicator accompanied by monospace delta: `[ +4.2% SPIN ]` in `#4A7C59`.

### 3. Broadcast Scorecard Overlay
- **Structure:** High-contrast compact scoreboard designed for upper-left or bottom-third video anchor.
- **Styling:** Matte black `#121212` with a `1px solid #333333` wrapper.
- **Score Readout:** Sets and game points rendered in `JetBrains Mono` with heavy tabular weights. Active server indicated by a 6px x 6px square indicator in `#4A7C59` (no border radius).

### 4. AI Pipeline Step Checklist
- **Structure:** Vertical process rail displaying processing stages (e.g., Frame Ingestion, Ball Tracking, Rally Segmentation, Broadcast Auto-Cut).
- **Indicators:**
  - Completed: `[ OK ]` in `#4A7C59`.
  - Processing: `[ >> ]` in `#FFFFFF` with active blinking cursor pulse.
  - Queued: `[ -- ]` in `#555555`.
- **Progress Track:** 2px total height, zero radius. Background `#222222`, active fill `#4A7C59`.

### 5. Input Fields & Selectors
- **Structure:** `1px solid #2A2A2A`, `#181818` background, `0px` radius.
- **Text:** `JetBrains Mono` body text with `#555555` placeholders.
- **Focus:** 1px perimeter switch to `#4A7C59` with zero shadow or outer glow.

### 6. Video Player Wrapper & HUD Markers
- **Structure:** Seamless framing with a sharp 1px `#2A2A2A` perimeter.
- **Tracking Overlays:** AI bounding boxes around table edges, players, and ball trajectory arcs utilize 1px solid stroke in `#4A7C59` with four-corner crosshairs (`+`) rendered in monospaced glyphs at coordinate intersections.