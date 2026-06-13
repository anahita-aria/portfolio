---
name: responsive-design
description: Make UI responsive using mobile-first approach with project-specific breakpoints, spacing, typography, and layout rules. Use this skill when building or fixing responsive layouts.
---

## Breakpoint Strategy
- Mobile: < 640px (default/base styles — always design here first)
- Tablet: sm (640px), md (768px)
- Desktop: lg (1024px), xl (1280px), 2xl (1536px)

## Layout Rules
- **Mobile**: Single column, full-width sections, stacked elements
- **Tablet (md)**: 2-column grids where applicable, side padding increases
- **Desktop (lg+)**: Multi-column layouts, max-width containers, horizontal arrangements

## Spacing Scale
- Section padding: py-12 → md:py-16 → lg:py-20 → xl:py-28
- Side margins: px-4 → md:px-8 → lg:pl-[8%] pr-[8%]
- Component gaps: gap-4 → md:gap-6 → lg:gap-8

## Typography Scale
- H1: text-2xl → md:text-3xl → lg:text-4xl
- H2: text-xl → md:text-2xl → lg:text-[32px]
- Body: text-sm → md:text-base → lg:text-[16px]
- Captions: text-xs → md:text-sm

## Component Behaviors
- **Navigation**: Hamburger on mobile, full nav on lg+
- **Cards/Grids**: 1 col → md:2 col → lg:3-4 col
- **Side-by-side layouts**: Stack on mobile, flex-row on lg
- **Images**: Full-width on mobile, constrained on desktop
- **Modals/Overlays**: Full-screen on mobile, centered dialog on desktop

## Touch & Interaction
- Minimum tap target: 44px on mobile
- Hover states only on lg+ (use @media hover)
- Swipe-friendly carousels on mobile

## Hide/Show Rules
- Use `hidden lg:block` for desktop-only elements
- Use `lg:hidden` for mobile-only alternatives
- Never hide critical content — adapt layout instead

## Anti-patterns to AVOID
- Fixed pixel widths that break on small screens
- Horizontal scroll on any breakpoint
- Text smaller than 12px on mobile
- Unscaled SVGs or absolute-positioned elements that overflow
- Desktop-only hover interactions with no mobile fallback

## Project-Specific Rules (ClaudeCV Portfolio)
- Case study sections use `pl-[8%] pr-[8%]` on desktop → `px-4` on mobile
- SVG flowcharts/diagrams: wrap in horizontally scrollable container on mobile, or hide and show a simplified version
- Color palette wheel: scale down proportionally, keep hex labels readable
- Wireframe scroll container: reduce image height and row count on mobile
- High-fidelity cards: always stack vertically on mobile, labels below image
- Prototype laptop mockup: `max-w-full` with maintained aspect ratio
- Font sizes in SVGs: use viewBox scaling, don't set fixed px that become unreadable
- Persona cards: 1 col on mobile, 2 col grid on lg
- Competitive analysis table: horizontally scrollable on mobile
- Design process timeline: stack vertically on mobile instead of horizontal
