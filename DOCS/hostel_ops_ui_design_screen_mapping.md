# 🎨 UI Design Document
## Smart Hostel Issue Tracking System

---

## 1. UI Design Goals
- Minimal learning curve for students
- Fast issue reporting (≤30 seconds)
- Clear issue status visibility
- Data‑dense but clean admin dashboard
- **Mobile‑first for students**, **desktop‑first for admins**

**Design Inspiration**  
Modern SaaS + civic‑tech hybrid UI focused on clarity, trust, and speed.

---

## 2. Global Design System

### 2.1 Color Palette
| Purpose            | Color   |
| ------------------ | ------- |
| Primary (CTAs)     | #2563EB |
| Accent / Nav       | #4F46E5 |
| Success            | #22C55E |
| Warning            | #FACC15 |
| Critical           | #EF4444 |
| Neutral Background | #F3F4F6 |

### 2.2 Typography
- Font: **Inter / System UI**
- Headings: Semi‑Bold
- Body: Regular
- Labels: Medium

### 2.3 Core UI Components (ShadCN‑style)
- Cards
- Badges
- Toggle Switch
- Dropdown Select
- Progress / Status Stepper
- Modal Dialogs
- Data Tables

---

## 3. Student Web UI

### 3.1 Student Home Dashboard

**Layout Structure**
- Top Bar (Welcome + Room Info)
- Quick Action Icons
- Issue List (Scrollable Cards)
- Floating Action Button (+)

**Quick Actions**
- Report Issue
- Announcements
- Lost & Found
- Help

### 3.2 Issue Cards (Core Element)
Each issue card displays:
- Issue Title
- Category Tag
- Priority Badge (color‑coded)
- Status Pill
- Progress Indicator (Reported → Resolved)

**UX Rationale**  
Instant clarity on pending vs resolved issues.

---

## 4. Report Issue UI (Critical Screen)

### 4.1 Layout
Two‑column card layout:
- **Left:** Issue Details Form
- **Right:** Auto‑filled User Context

### 4.2 Issue Details Form
Fields (top → bottom):
- Category (Dropdown)
- Priority (Low / Medium / High / Emergency)
- Visibility Toggle (Public / Private)
- Description (Multiline textarea)
- Media Upload (Image / Video)
- Submit Button (Primary Blue, disabled until valid)

### 4.3 User Context Panel (Auto‑Filled)
- Hostel Name
- Block
- Room Number

*Non‑editable to prevent misuse and build trust.*

---

## 5. Issue Detail Page (Student)

**Layout**
- Title + Status Badge
- Meta Row (Category | Priority | Location)
- Description
- Media Gallery
- Status Timeline (Vertical Stepper)
- Comments (Public issues only)

**Status Timeline Steps**
- Reported
- Assigned
- In Progress
- Resolved

---

## 6. Admin / Management Web Dashboard

### 6.1 Layout Structure
- Sidebar Navigation
- Top KPI Metrics Bar
- Main Content Area

### 6.2 Sidebar Modules
- Dashboard
- Issue Queue
- Announcements
- Lost & Found
- Analytics
- Staff Settings

### 6.3 KPI Metrics Bar
- Total Open Issues
- Critical Issues
- Avg Response Time
- Resolved Today

---

## 7. Issue Queue (Admin Core Screen)

### 7.1 Table Columns
- Issue ID
- Category
- Priority
- Status
- Reported By
- Assigned To
- Actions

### 7.2 Actions
- Assign Staff
- Change Status
- Merge Duplicate

### 7.3 Filters
- Status
- Category
- Hostel / Block
- Priority

---

## 8. Duplicate Issue Management

**Visual Pattern**
- Grouped issue rows
- "Possible Duplicate" label
- Merge action

**Post‑Merge Behavior**
- Single master issue
- Linked reporters
- Clean analytics & SLA tracking

---

## 9. Announcements UI

### Student View
- Card feed
- Timestamp & scope indicators

### Admin View
- Create Announcement Modal
- Target selectors
- Preview before publish

---

## 10. Lost & Found UI

**Layout**
- Grid card layout

Each card shows:
- Item image
- Description
- Location
- Status badge
- Claim button

Admin verifies and closes claims.

---

## 11. Analytics Dashboard (Admin)

### Visualizations
- Bar Chart: Issues by Category
- Pie Chart: Category Distribution
- Line Chart: Resolution Time Trend

### KPI Cards
- Avg Resolution Time
- Pending Issues
- Emergency Count

---

## 12. Responsive Behavior

### Mobile (Students)
- Bottom Navigation / FAB
- Card‑based views
- Swipe actions

### Desktop (Admins)
- Sidebar navigation
- Tables & charts
- Multi‑column layouts

---

## 13. UI → Website Operation Mapping

| Screen            | Primary Action  | Backend Flow                                  |
| ----------------- | --------------- | --------------------------------------------- |
| Student Dashboard | View issues     | Fetch issues → RLS filtered by user           |
| Report Issue      | Submit form     | Insert issue → media upload → realtime notify |
| Issue Detail      | Track status    | Fetch issue + timeline updates                |
| Admin Dashboard   | Monitor KPIs    | Aggregate queries → analytics views           |
| Issue Queue       | Assign / update | Update issue → SLA tracking                   |
| Duplicate Manager | Merge issues    | Soft‑merge → relink reporters                 |
| Announcements     | Publish         | Insert announcement → realtime broadcast      |
| Lost & Found      | Claim item      | Update claim status → admin verify            |

---

## 14. UI → Technology Mapping

| UI Element         | Technology        |
| ------------------ | ----------------- |
| Forms & Validation | React + Zod       |
| Layout & Styling   | Tailwind CSS      |
| UI Components      | ShadCN UI         |
| Icons              | Lucide            |
| Charts             | Recharts          |
| Real‑time Updates  | Supabase Realtime |

---

**Document Purpose**  
This UI design document bridges **UX intent → system behavior**, ensuring the interface, backend logic, and RLS rules remain tightly aligned.

