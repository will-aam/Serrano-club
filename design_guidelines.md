# Serrano Club Loyalty App - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from successful loyalty and fintech applications (Starbucks Rewards, Nubank, iFood) that balance gamification with utility. The design emphasizes trust, engagement, and seamless transaction flows while maintaining the warm, approachable feel of a community-focused loyalty program.

## Core Design Principles

1. **Mobile-First Clarity**: Prioritize thumb-friendly interactions and scannable information hierarchy
2. **Trust Through Transparency**: Clear feedback for every transaction state (pending, success, error)
3. **Rewarding Experience**: Celebrate milestones and achievements with visual delight
4. **Efficient Admin Tools**: Desktop-optimized validation workflows for staff

---

## Color Palette

### Primary Colors (Dark Mode)
- **Brand Primary**: 15 85% 55% (Deep red-orange, energetic and warm)
- **Background Base**: 0 0% 8% (Rich dark background)
- **Surface**: 0 0% 12% (Elevated cards/sections)
- **Surface Elevated**: 0 0% 16% (Modal overlays, dropdowns)

### Primary Colors (Light Mode)
- **Brand Primary**: 15 75% 48% (Slightly muted for readability)
- **Background Base**: 0 0% 98% (Soft white)
- **Surface**: 0 0% 100% (Pure white cards)
- **Surface Elevated**: 0 0% 96% (Subtle depth)

### Semantic Colors (Both Modes)
- **Success**: 142 71% 45% (Dark) / 142 76% 36% (Light) - Fuel registrations confirmed
- **Warning**: 38 92% 50% (Dark) / 38 92% 50% (Light) - Vouchers expiring soon
- **Error**: 0 84% 60% (Dark) / 0 72% 51% (Light) - Invalid receipts, duplicate registrations
- **Info**: 217 91% 60% (Dark) / 217 91% 60% (Light) - Notifications, tips

### Supporting Colors
- **Text Primary**: 0 0% 95% (Dark) / 0 0% 10% (Light)
- **Text Secondary**: 0 0% 65% (Dark) / 0 0% 45% (Light)
- **Text Tertiary**: 0 0% 50% (Dark) / 0 0% 60% (Light)
- **Border**: 0 0% 25% (Dark) / 0 0% 88% (Light)

---

## Typography

**Font Family**: System font stack for optimal performance and native feel
- Primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

**Type Scale**:
- **Display** (Home greeting): 2.25rem/2.5rem (36px), font-weight 700
- **Heading 1** (Screen titles): 1.875rem/2.25rem (30px), font-weight 700
- **Heading 2** (Section headers): 1.5rem/2rem (24px), font-weight 600
- **Heading 3** (Card titles): 1.25rem/1.75rem (20px), font-weight 600
- **Body Large** (Points display): 1.125rem/1.75rem (18px), font-weight 600
- **Body** (Default text): 1rem/1.5rem (16px), font-weight 400
- **Body Small** (Secondary info): 0.875rem/1.25rem (14px), font-weight 400
- **Caption** (Timestamps, labels): 0.75rem/1rem (12px), font-weight 500

---

## Layout System

**Spacing Primitives**: Use Tailwind units 2, 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: p-4 (mobile), p-6 (tablet+)
- Section spacing: space-y-6 (mobile), space-y-8 (desktop)
- Card padding: p-4 to p-6
- List item spacing: py-3 to py-4

**Grid System**:
- Mobile (base): Single column, max-w-md centered
- Tablet (md:): 2-column grid for vouchers/rewards catalog
- Desktop (lg:): Admin dashboard uses 12-column grid for data tables

**Safe Areas**: Account for mobile notches/home indicators with pb-safe class

---

## Component Library

### Navigation & Structure
**Bottom Navigation (Mobile)**:
- 5 primary tabs: Home, Registrar, Abastecimentos, Resgatar, Perfil
- Icon + label, active state with brand color underline
- Fixed position, backdrop-blur background

**Top Bar**:
- App logo/title (left), notification bell icon (right)
- Sticky position on scroll, subtle shadow on elevation

### Cards & Surfaces
**Points Balance Card** (Home):
- Prominent placement, gradient background (brand primary to darker shade)
- Large number display (3rem), secondary info below
- Action buttons inline or stacked below

**Fuel Purchase Card** (History):
- Station name + logo/icon, date/time (small, top-right)
- Liters and value displayed prominently
- Status badge (registered/pending/rejected) using semantic colors
- Subtle border, tap to expand for full receipt view

**Voucher Card** (Catalog & Active):
- Visual icon or image representing reward type
- Title, value/description, required points/liters
- CTA button ("Resgatar" or "Ver QR Code")
- Expiration date in caption text with warning color if < 7 days

### Forms & Inputs
**Input Fields**:
- Label above, 3rem height, rounded-lg borders
- Focus state: brand color ring
- Error state: error color border + helper text below
- Prefix icons for phone/CPF inputs

**Buttons**:
- Primary: Brand primary background, white text, font-weight 600
- Secondary: Transparent with brand color border and text
- Disabled: 40% opacity
- Height: h-12 (mobile), h-11 (desktop), rounded-lg

### Interactive Elements
**QR Code Scanner UI**:
- Full-screen overlay with camera viewfinder frame
- Corner guides (animated scanning line optional)
- Manual input fallback button at bottom
- Cancel/close in top-left

**Progress Bar** (Liters to next reward):
- Thin bar (h-2), rounded-full
- Background: surface elevated, fill: brand primary
- Text label above: "X/Y litros para próxima recompensa"

**Status Badges**:
- Pill shape (rounded-full), px-3 py-1
- Small text (text-xs), uppercase
- Semantic colors for background with white text

### Modals & Overlays
**Voucher Redemption Modal**:
- Centered card on dark backdrop (backdrop-blur)
- QR code centered (large, 12rem square)
- Alphanumeric code below (monospace font, large text)
- Validity date, usage rules in smaller text
- "Usado" overlay stamp when validated (diagonal, semi-transparent)

**Toast Notifications**:
- Bottom-center on mobile, top-right on desktop
- Icon + message, auto-dismiss after 4s
- Success/error color coded

### Admin Panel (Desktop)
**Validation Interface**:
- Split layout: Scanner input (left 40%), voucher details (right 60%)
- Data table for voucher list with sortable columns
- Filter chips for status (Ativo, Usado, Expirado)
- Validation form: dropdown for payment method, large "Validar" button
- Audit log sidebar showing recent validations with timestamps

---

## Animations & Micro-Interactions

**Subtle & Purposeful**:
- Page transitions: Slide right (forward), slide left (back), 200ms ease-out
- Card tap: Scale down 0.98, 100ms
- Button press: Scale down 0.95, subtle shadow reduction
- Loading states: Skeleton screens with shimmer effect (not spinners)
- Success confirmations: Checkmark icon with scale-in animation + green glow
- Error shake: Subtle horizontal shake on invalid input (2-3 oscillations)

**Celebratory Moments**:
- Voucher redemption: Confetti burst (brief, 1s) + success modal fade-in
- Points milestone reached: Subtle pulse on points display

---

## Accessibility

- **Minimum tap targets**: 44x44px (iOS guideline)
- **Color contrast**: WCAG AA compliant (4.5:1 for text, 3:1 for UI components)
- **Focus indicators**: Visible brand-color ring on keyboard navigation (desktop admin)
- **Screen reader labels**: Portuguese aria-labels for icon-only buttons
- **Font scaling**: Support system font size preferences (use rem units)

---

## Images & Iconography

**Icons**: Use Heroicons (outline style for navigation, solid for emphasis)
- QR code scanner, wallet, clock/history, gift/present, settings, bell, check, x-circle

**Station Logos/Images**: Placeholder circular avatars with initials if no logo provided

**No Hero Images**: This is a utility-focused app; focus on functional UI rather than marketing visuals

---

## Portuguese (pt-BR) Terminology
- "Pontos": Points
- "Litros acumulados": Accumulated liters
- "Registrar Abastecimento": Register fuel purchase
- "Resgatar": Redeem
- "Ativo/Usado/Expirado": Active/Used/Expired
- "Posto": Gas station
- "Voucher": Voucher (same term)
- "Validade": Validity/Expiration