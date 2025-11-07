# Instagram Campaign Planner - Design Guidelines

## Design Approach
**Reference-Based Approach:** Drawing inspiration from professional social media scheduling tools like Buffer and Later, with emphasis on clean calendar interfaces and intuitive drag-and-drop interactions. The design prioritizes visual organization, clear status indicators, and professional polish suitable for marketing professionals.

## Layout Architecture

### Double Sidebar System
- **Left Navigation Sidebar:** Fixed width 240px, always visible, vertical navigation with logo, primary CTA, menu items, and user profile at bottom
- **Center Content Area:** Flex-1, contains calendar grid with month navigation header
- **Right Content Sidebar:** Fixed width 320px, collapsible with smooth 300ms slide animation, displays scrollable content list with sticky date headers

### Calendar Grid Layout
- Monthly view with 7 columns (Sun-Sat)
- Each day cell: minimum height 128px (min-h-32), white background, rounded corners, bordered
- Day names header row above grid
- Current day highlighted with blue circle indicator
- Weekend cells: subtle light gray background (#F9FAFB)
- Calendar header: Month/Year centered with previous/next navigation arrows plus "Today" quick jump button

## Typography System

**Font Stack:** Inter or system fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)

**Hierarchy:**
- Page titles: text-2xl, font-semibold, #111827
- Section headers: text-lg, font-semibold, #111827
- Card titles: text-base, font-medium, #111827
- Body text: text-sm, font-normal, #6B7280
- Metadata/timestamps: text-xs, font-normal, #6B7280
- Button labels: text-sm, font-medium

## Spacing System
**Tailwind Primitives:** Use units of 1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32
- Component padding: p-3, p-4, p-6
- Section spacing: mb-4, mb-6, mb-8
- Grid gaps: gap-4, gap-6
- Sidebar padding: p-4, p-6

## Component Library

### Content Blocks
**Visual Treatment:**
- Card style: white background, rounded-lg (8px), shadow-sm
- Left border accent: 3px solid, blue (#3B82F6) for posts, purple (#A855F7) for reels
- Internal padding: p-3
- Hover state: scale 1.02 with increased shadow
- Drag handle: GripVertical icon, gray color, cursor changes to grab/grabbing

**Content Layout:**
- Top row: Drag handle icon + Type icon (Camera/Video) + Title text + Status badge (right-aligned)
- Second row: Time display in small gray text
- Third row: Description text truncated if needed
- Sidebar variant adds: Canva link input field + Edit/Delete icon buttons

**Status Badges:**
- Draft: gray background, gray text
- Scheduled: blue background, white text  
- Published: green (#10B981) background, white text
- Style: rounded-full, px-2, py-1, text-xs

### Multi-Step Modal
**Container:**
- Max-width 600px, centered overlay with dark backdrop
- White card with rounded-xl (12px), shadow-2xl
- Close button (X icon) in top-right corner

**Progress Indicator:**
- 4 circles in horizontal row showing steps
- Active step: filled blue circle
- Completed steps: filled blue with checkmark
- Future steps: gray outline circle
- Connected by thin horizontal lines

**Navigation:**
- Back button (left): secondary gray style
- Next/Create button (right): primary blue style
- Buttons disabled state when required fields empty
- ESC key closes modal

**Step Forms:**
- Form fields: full width with consistent spacing (mb-4, mb-6)
- Dropdowns: white background, border, rounded-lg
- Text inputs/areas: white background, border, rounded-lg, focus:blue ring
- Number inputs: with +/- buttons on sides
- Date pickers: calendar dropdown interface
- Labels: text-sm, font-medium, mb-2

### Navigation Items
**Left Sidebar:**
- Logo area: logo icon + "Campaign Planner" text at top
- "Create Campaign" button: primary blue, full width, prominent
- Menu items: icon + label, hover with light blue background
- Active state: blue background, blue text, left border accent
- User profile card at bottom: avatar + name + role

### Calendar Controls
**Month Navigation:**
- Previous/Next buttons: icon-only, hover state
- Month/Year display: centered, larger text
- "Today" button: secondary style, text button

### Right Sidebar Content List
**Structure:**
- Header: "All Content" title with toggle button
- Scrollable area with grouped content blocks
- Sticky date headers as content scrolls
- Each group: date header + content blocks vertically stacked
- Toggle button: arrow icon on left edge, rotates when collapsed

## Color Palette

**Primary Colors:**
- Blue (primary): #3B82F6 (posts, primary actions, active states)
- Purple (reels): #A855F7 (reel content type indicator)
- Success Green: #10B981 (published status, success messages)

**Neutrals:**
- Page background: #F9FAFB
- Card backgrounds: #FFFFFF
- Text primary: #111827
- Text secondary: #6B7280
- Borders: #E5E7EB
- Weekend background: #F9FAFB

**Status Colors:**
- Draft: Gray (#6B7280)
- Scheduled: Blue (#3B82F6)
- Published: Green (#10B981)

## Interaction Design

### Drag-and-Drop Behavior
- Dragging: Content block at 50% opacity, cursor changes to grabbing
- Drop zones: Calendar cells show blue-50 background with dashed blue border on hover
- Drop completion: Smooth animation to new position, toast notification appears
- Reordering: Within same day, vertical reordering with smooth transitions

### Animations
**Timing:** All transitions use 200ms ease-in-out
- Hover effects: scale 1.02 + shadow increase
- Active/pressed: scale 0.98
- Sidebar toggle: 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Content block movements: smooth position transitions
- Modal open/close: fade in/out with slight scale

### Toast Notifications
- Position: top-right, fixed
- Style: white card, shadow-lg, rounded-lg, padding
- Icon + message layout
- Auto-dismiss after 3 seconds
- Types: Success (green accent), Error (red accent), Info (blue accent)

## Images
This application does not use hero images or marketing imagery. It is a productivity tool focused on data visualization through calendars and content cards. All visual elements are UI components, icons, and user-generated content placeholders.