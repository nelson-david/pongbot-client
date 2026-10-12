# PongCast Client

The web dashboard for PongCast. Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS. It provides a minimal, distraction-free interface featuring progressive section disclosure, live terminal streaming, custom export modals, and responsive dark mode.

**Repository**: [https://github.com/nelson-david/pongbot-client.git](https://github.com/nelson-david/pongbot-client.git)

---

## Design System & Features

- **Progressive Disclosure**: Only Section 01 (Upload & Player Config) appears on load; Sections 02 (Pipeline) and 03 (Broadcast Suite) reveal automatically once processing begins.
- **Strict Zero Border-Radius**: Precision technical aesthetic (`rounded-none` across all modals, badges, inputs, and buttons).
- **Typography**: Clean monospace and geometric sans with DM Mono and DM Sans.
- **Client-Side Size Guard**: Restricts file drops to a maximum of 100 MB with inline error alerts.
- **Export Suite**: Zero-radius custom modals for downloading the rendered 1080p MP4 broadcast, summary text reports, or match highlights.

---

## Setup & Running

### 1. Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Configure your backend API base URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```
*(In production, set this to your server's public domain or IP, e.g. `http://<YOUR_EC2_PUBLIC_IP>:8000`).*

### 4. Start Development Server
```bash
npm run dev
```
> Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```
