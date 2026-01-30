# Product Requirements Document (PRD)

## Project Name: **HostelOps**  
**Tagline:** *Transparent. Accountable. Data‑Driven Hostel Management*

---

## 1. Project Overview

### 1.1 Product Vision
HostelOps is a centralized digital issue‑tracking and facility‑management platform for hostels and residential institutions. It enables students to report issues transparently while empowering hostel authorities to track, assign, resolve, and analyze complaints efficiently using real‑time data.

### 1.2 Problem Statement
Current hostel issue reporting is fragmented and informal (word‑of‑mouth, WhatsApp groups, manual registers), leading to:
- Lack of accountability
- Repeated complaints
- Delayed resolutions
- No actionable analytics

### 1.3 Goal
Build a **single source of truth** for hostel issues that ensures transparency, faster resolution, and data‑driven decision‑making.

### 1.4 Key Benefits
- Transparent complaint lifecycle
- Faster response and accountability
- Elimination of manual systems
- Data‑backed facility planning
- Reduced duplicate complaints

---

## 2. Goals & Success Metrics

### 2.1 Primary Goals
- Reduce average issue resolution time
- Improve student trust and engagement
- Enable proactive hostel maintenance
- Standardize issue reporting

### 2.2 Success Metrics (KPIs)
- Average resolution time
- % issues resolved within SLA
- Duplicate issue reduction rate
- User engagement (comments, reactions)
- Issue recurrence by category/location

---

## 3. User Roles & Permissions

### 3.1 Student
**Description:** Hostel residents who report and track issues.

**Permissions**
- Register & authenticate
- Report new issues
- Upload images/videos
- Choose issue visibility (public/private)
- View reported issue status
- Comment on public issues
- View announcements
- Use Lost & Found module

**Restrictions**
- Cannot assign or close issues
- Cannot view others’ private issues
- Cannot access analytics dashboard

---

### 3.2 Management / Admin
**Description:** Hostel authorities and administrators.

**Permissions**
- Full system access
- View all issues (public + private)
- Assign issues to staff
- Update issue status
- Merge duplicate issues
- Post announcements
- Moderate comments & claims
- Access analytics dashboard

**Restrictions**
- None (superuser role)

---

### 3.3 Maintenance Staff / Caretaker (Optional)
**Description:** Personnel responsible for resolving issues.

**Permissions**
- View assigned issues
- Update progress/status
- Add internal notes (optional)

**Restrictions**
- Cannot post announcements
- Cannot access analytics dashboard

---

## 4. Functional Requirements (Module‑Wise)

### 4.1 Authentication & RBAC

**Features**
- Secure login/signup
- JWT‑based authentication
- Role‑based dashboards
- Supabase Row Level Security (RLS)

**Acceptance Criteria**
- Students only see permitted data
- Management has full visibility
- Unauthorized access blocked at DB level

---

### 4.2 Issue Reporting System (Core Module)

#### Student Flow
1. Select issue category
2. Set priority (Low → Emergency)
3. Add description
4. Upload image/video (optional)
5. Choose visibility (Public / Private)
6. Auto‑tag hostel, block, room
7. Submit issue

#### Issue Attributes
- Category
- Priority
- Status
- Location metadata
- Reporter(s)
- Assigned staff
- Timestamps

#### Management Capabilities
- View & filter issues
- Assign caretaker
- Modify priority
- Merge duplicates

---

### 4.3 Issue Lifecycle & Workflow

**Status Flow**
```
Reported → Assigned → In Progress → Resolved → Closed
```

**Rules**
- Only management/staff can update status
- All changes are timestamped
- Students receive real‑time updates
- Closed issues are immutable

---

### 4.4 Hostel Announcements & News

**Purpose**  
Centralized communication for hostel‑wide updates.

**Features**
- Create announcements
- Target by hostel / block / role
- Scheduled or instant posting

**Examples**
- Water shutdown alerts
- Cleaning schedules
- Maintenance notices
- Emergency announcements

**Permissions**
- Create: Management only
- View: All users

---

### 4.5 Lost & Found Module

**Features**
- Report lost/found items
- Upload item images
- Specify location & date
- Track claim status

**Workflow**
```
Reported → Claim Requested → Verified → Closed
```

**Moderation**
- Admin verifies claims before closure

---

### 4.6 Community Interaction

**Features**
- Comments on public issues
- Threaded replies
- Reactions (👍, ⚠️)

**Purpose**
- Crowd‑signal urgency
- Validate recurring issues
- Improve transparency

**Restrictions**
- Public issues only
- Admin moderation enabled

---

### 4.7 Duplicate Issue Management

**Problem**  
Same issue reported by multiple students.

**Solution**
- Detect issues by category + location
- Admin merges duplicates
- Multiple reporters linked to one issue
- Single resolution workflow

**Benefits**
- Reduced workload
- Cleaner analytics
- Faster resolution

---

### 4.8 Analytics & Monitoring Dashboard

**Audience**  
Management / Admin

**Metrics**
- Issue frequency by category
- Hostel/block‑wise heatmap
- Average response time
- Average resolution time
- Pending vs resolved ratio
- Recurring issue trends

**Purpose**
- Infrastructure planning
- Resource allocation
- Preventive maintenance

---

## 5. Non‑Functional Requirements

### Performance
- Server‑Side Rendering (SSR)
- Real‑time updates
- Low‑latency APIs

### Security
- Role‑based access control
- Row Level Security (RLS)
- Secure media access (signed URLs)

### Scalability
- Multi‑hostel support
- High concurrent usage
- Modular architecture

### Availability
- 24/7 uptime
- Cloud‑hosted

---

## 6. Technical Architecture

### Frontend
- Next.js
- Tailwind CSS
- ShadCN UI
- TanStack Query
- Lucide Icons

### Backend & Database
- Supabase Auth
- Supabase PostgreSQL
- Row Level Security
- Supabase Realtime
- Supabase Storage

### API Layer
- Next.js Server Actions (recommended)
- Optional: tRPC

---

## 7. Deployment Strategy

| Layer    | Platform            |
| -------- | ------------------- |
| Frontend | Vercel              |
| Backend  | Supabase Cloud      |
| Database | Supabase PostgreSQL |
| Storage  | Supabase Storage    |
| Domain   | Custom Domain       |

---

## 8. Database Design (Core Entities)

### User
- userId
- name
- email
- role
- hostel
- block
- room

### Issue
- issueId
- title
- category
- priority
- description
- mediaURLs
- visibility
- status
- assignedTo
- timestamps
- reporters[]

### Announcement
- announcementId
- title
- description
- targetHostel
- targetBlock
- createdBy

### LostFound
- itemId
- type (lost/found)
- description
- image
- location
- status

---

**HostelOps** is designed as a production‑grade, enterprise‑ready platform aligned with modern SaaS and hackathon evaluation standards.

