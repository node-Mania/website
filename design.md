# nodeMania Design & Vibe System

This document defines the visual and architectural standards for the nodeMania website. It serves as the source of truth for "vibe coding" and UI development.

## 🎨 Brand Identity

### Color Palette (Tailwind 4.0 Integration)
The system uses CSS variables defined in `globals.css` with a focus on a **Premium Light/Glass** aesthetic for landing pages and a **Deep Space** aesthetic for dashboards/special sections.

| Category | Name | Hex | CSS Variable |
| :--- | :--- | :--- | :--- |
| **Primary** | Electric Node Blue | `#2563EB` | `--primary` / `--color-primary` |
| **Secondary** | Mania Teal | `#0D9488` | `--secondary` / `--color-secondary` |
| **Accent** | Warning Amber | `#F59E0B` | `--accent` / `--color-accent` |
| **Background** | Deep Space (Dark) | `#0B0E14` | (Used in Dark Modes) |
| **Background** | Clean White (Light) | `#f7fbff` | `--background` |
| **Surface** | Glass Slate | `#1E293B` | `--surface` / `--color-surface` |
| **Text** | Midnight Slate | `#0f2340` | `--foreground` |

### Typography
- **Font**: `Inter` (Sans-serif) via `next/font/google`.
- **Headings**: `font-bold tracking-tight text-slate-900`.
- **Kinetic Typography**: Use `framer-motion` for character-level or word-level entrance animations on main headers.

---

## ✨ Design Principles

### 1. Glassmorphism & Depth
Use the `.glass` and `.glass-card` utilities for premium layering.
- **Blur**: `backdrop-filter: blur(12px)`.
- **Border**: `1px solid rgba(255, 255, 255, 0.1)`.
- **Shadow**: Large, soft shadows to simulate depth.

### 2. Bento Grid Layouts
Organize complex data (features, plans) into a Bento grid structure. Use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with varying spans to create visual interest.

### 3. Kinetic Animations
Every interaction should feel lively.
- **Page Transitions**: Smooth fade and slide entrances.
- **Hover States**: Scale up slightly (`hover:scale-[1.02]`), brighten gradients, or add a subtle glow.
- **Floating**: Use `--animate-float` for hero elements to simulate weightlessness.

---

## 🏗️ Atomic Components

| Component | Path | Usage Notes |
| :--- | :--- | :--- |
| **Button** | `src/components/ui/Button.tsx` | Supports `primary`, `outline`, `glass` variants. |
| **FAQAccordion**| `src/components/ui/FAQAccordion.tsx` | Motion-enabled collapsible sections. |
| **PriceCard** | (TBD) | Use for hosting plan displays. |
| **FeatureGrid** | (TBD) | Standardized grid for service highlights. |

---

## 🚀 Vibe Coding Guidelines

When implementing new features, follow these "vibe" rules:

1. **Motion First**: Never just show an element. Animate it in using `motion.div`. Use `spring` transitions rather than `ease`.
2. **Gradient Accents**: Use the `.text-gradient` (`blue` to `teal`) for emphasis on titles.
3. **Semantic SEO**: Always wrap page content in semantic HTML5 tags (`<main>`, `<article>`, `<section>`).
4. **WHMCS Integration**: Use `getProductsByPids` or `getProductsByGid` from the `whmcs.service` for dynamic pricing data.
5. **Responsiveness**: Design mobile-first. Ensure the "Bento" feel translates well to single columns.

## 🛠️ Tech Stack Reference
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide-React
- **State/Animation**: Framer Motion
- **CMS/Backend**: WHMCS API + WordPress (Headless)
