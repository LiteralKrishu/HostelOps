<p align="center">
  <h1 align="center">🏨 HostelOps</h1>
  <p align="center">
    <strong>Modern Hostel Management Platform</strong>
  </p>
  <p align="center">
    A full-stack application for hostel issue tracking, announcements, and lost & found management.
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-Backend-green?logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss" alt="Tailwind" />
</p>

---

## ✨ Features

### For Students
- **Issue Reporting** – Submit maintenance requests with categories, priority levels, and media attachments
- **Issue Tracking** – Real-time status updates on reported issues
- **Announcements** – View hostel-wide notices and updates
- **Lost & Found** – Report and search for lost/found items

### For Administrators
- **Dashboard Analytics** – KPIs, issue distribution charts, emergency alerts
- **Issue Management** – Assign staff, update status, set priorities
- **Staff Management** – Track performance metrics and assignments
- **Announcements** – Create and manage hostel notices

### Security Features
- 🔐 **Rate Limiting** – IP-based protection against brute force attacks
- ✅ **Input Validation** – Zod schemas with strict mode
- 🛡️ **OWASP Compliance** – Security headers, password policies, session management
- 🔒 **Row Level Security** – Database-level access control via Supabase RLS

---

## 🛠️ Tech Stack

| Layer             | Technology                                                  |
| ----------------- | ----------------------------------------------------------- |
| **Framework**     | [Next.js 16](https://nextjs.org/) (App Router)              |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)               |
| **Styling**       | [Tailwind CSS v4](https://tailwindcss.com/)                 |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/)                         |
| **Backend**       | [Supabase](https://supabase.com/) (Auth, Database, Storage) |
| **Validation**    | [Zod](https://zod.dev/)                                     |
| **Icons**         | [Lucide React](https://lucide.dev/)                         |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- A [Supabase](https://supabase.com) account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/HostelOps.git
   cd HostelOps
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Set up the database**
   - Go to your Supabase project → SQL Editor
   - Run the contents of `supabase/setup.sql`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
HostelOps/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Authentication pages
│   │   ├── admin/              # Admin portal
│   │   ├── student/            # Student portal
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/             # Reusable UI components
│   │   └── ui/                 # shadcn/ui components
│   └── lib/
│       ├── data/               # Data fetching utilities
│       ├── security/           # Rate limiting, sanitization
│       ├── supabase/           # Supabase client setup
│       ├── types/              # TypeScript type definitions
│       └── validations/        # Zod validation schemas
├── supabase/
│   └── setup.sql               # Database schema & RLS policies
├── DOCS/                       # Documentation
└── .env.example                # Environment template
```

---

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repository
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Configure Supabase for Production

1. Go to Supabase → Authentication → URL Configuration
2. Set **Site URL** to your Vercel domain: `https://your-app.vercel.app`
3. Add **Redirect URLs**: `https://your-app.vercel.app/**`

---

## 🔐 Security

This application follows OWASP security best practices:

| Measure          | Implementation                                         |
| ---------------- | ------------------------------------------------------ |
| Rate Limiting    | IP-based limits on auth endpoints                      |
| Input Validation | Zod schemas with `.strict()` mode                      |
| XSS Prevention   | HTML entity encoding, CSP headers                      |
| SQL Injection    | Parameterized queries via Supabase                     |
| Session Security | HttpOnly cookies, token rotation                       |
| Password Policy  | Min 8 chars, uppercase, lowercase, digit, special char |

---

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

<p align="center">
  Made with ❤️ for better hostel management
</p>
