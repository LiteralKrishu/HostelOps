# 🌐 HostelOps — Website Operation Flow & Screen-to-Flow Mapping

This document explains **how the HostelOps website operates end-to-end**, mapping **screens (UI pages)** to **user actions, backend operations, and data flows**. It is designed for **developers, reviewers, and judges** to clearly understand how the system functions in production.

---

## 1. High-Level Website Operation Flow

```text
User visits website
  → Authentication
    → Role Detection (RLS + Profile)
      → Role-Based Dashboard
        → Feature Interaction
          → Database Operations (Supabase)
            → Realtime Updates
              → Analytics & Monitoring
```

---

## 2. Core Website Sections

| Section | Description |
|------|------------|
| Public Pages | Landing, Login, Register |
| Student Portal | Issue reporting, tracking, community, lost & found |
| Admin Portal | Issue management, analytics, announcements |
| Staff Portal | Assigned issue handling |

---

## 3. Authentication & Entry Flow

### Screens
- `/` — Landing Page
- `/login`
- `/register`

### Operation Flow
1. User opens landing page
2. Clicks Login / Register
3. Credentials submitted to Supabase Auth
4. JWT issued on success
5. Profile fetched from `profiles` table
6. Role identified (`student`, `management`, `staff`)
7. Redirect to role-specific dashboard

### Backend Interaction
- Supabase Auth → `auth.users`
- Profiles fetch → `profiles`

---

## 4. Student Website Operation Flow

### 4.1 Student Dashboard

**Screen**: `/student/dashboard`

**Visible Components**
- My Issues
- Report Issue CTA
- Public Issues Feed
- Announcements
- Lost & Found

**Data Sources**
- `issues` (RLS filtered)
- `announcements`
- `lost_found_items`

---

### 4.2 Report Issue Flow

**Screens**
- `/student/issues/new`
- `/student/issues/[id]`

**Flow**
1. Student opens Report Issue
2. Fills issue form
3. Media uploaded to Supabase Storage
4. Issue inserted into `issues`
5. Media linked in `issue_media`
6. Status defaults to `reported`

**Tables Touched**
- `issues`
- `issue_media`

---

### 4.3 Track & View Issue Flow

**Screen**: `/student/issues/[id]`

**Flow**
1. Student opens issue detail page
2. Issue fetched via RLS
3. Status timeline rendered
4. Comments loaded (public only)
5. Realtime subscription established

---

### 4.4 Public Issues & Community Interaction

**Screen**: `/student/issues/public`

**Flow**
1. Fetch public issues
2. Filter/search applied client-side
3. Comments added (validated via RLS)
4. Reactions stored

**Tables**
- `issues`
- `comments`

---

### 4.5 Lost & Found Flow (Student)

**Screens**
- `/student/lost-found`
- `/student/lost-found/new`

**Flow**
1. Submit lost/found entry
2. Data stored in `lost_found_items`
3. Entry visible to all users
4. Claim request initiated

---

## 5. Management / Admin Website Operation Flow

### 5.1 Admin Dashboard

**Screen**: `/admin/dashboard`

**Widgets**
- Issue overview
- SLA indicators
- Analytics charts

**Tables Queried**
- `issues`
- SQL views (analytics)

---

### 5.2 Issue Management & Assignment

**Screens**
- `/admin/issues`
- `/admin/issues/[id]`

**Flow**
1. Admin views all issues
2. Filters applied (status, priority, hostel)
3. Assigns issue to staff
4. Status updated to `assigned`
5. Staff notified in real time

---

### 5.3 Duplicate Issue Merge Flow

**Screen**: `/admin/issues/duplicates`

**Flow**
1. Potential duplicates detected
2. Admin selects primary issue
3. Duplicates merged
4. `merged_into` updated
5. Reporters linked

---

### 5.4 Announcements Management

**Screens**
- `/admin/announcements`
- `/admin/announcements/new`

**Flow**
1. Admin creates announcement
2. Target filters applied
3. Announcement inserted
4. Visible to target users

---

### 5.5 Analytics & Monitoring

**Screen**: `/admin/analytics`

**Flow**
1. Dashboard queries SQL views
2. Charts rendered
3. Insights used for planning

---

## 6. Maintenance Staff Website Operation Flow

### 6.1 Staff Dashboard

**Screen**: `/staff/dashboard`

**Flow**
1. Staff logs in
2. Assigned issues fetched
3. Issue details accessed

---

### 6.2 Issue Resolution Flow (Staff)

**Screen**: `/staff/issues/[id]`

**Flow**
1. Staff updates status
2. Progress saved
3. Realtime update sent
4. Admin reviews closure

---

## 7. Screen-to-Flow Mapping (Quick Reference)

| Screen | Role | Primary Action | Tables / Services |
|-----|-----|---------------|------------------|
| `/login` | All | Authenticate | Supabase Auth |
| `/student/dashboard` | Student | View issues | issues, announcements |
| `/student/issues/new` | Student | Create issue | issues, issue_media |
| `/student/issues/[id]` | Student | Track issue | issues, comments |
| `/student/lost-found` | Student | Lost & Found | lost_found_items |
| `/admin/issues` | Admin | Manage issues | issues |
| `/admin/analytics` | Admin | View insights | SQL views |
| `/admin/announcements` | Admin | Broadcast info | announcements |
| `/staff/dashboard` | Staff | Assigned work | issues |

---

## 8. Operational Guarantees

- All access enforced by RLS
- No frontend-only security
- Realtime updates via Supabase Realtime
- SSR ensures fast load & SEO

---

## 9. Summary

The HostelOps website operation flow ensures **clear role separation**, **secure data access**, and **predictable system behavior**, making it suitable for both **hackathon evaluation** and **real-world deployment**.

