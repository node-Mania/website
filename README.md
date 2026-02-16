# NodeMaina - High Performance Hosting

NodeMaina is a modern, high-performance hosting company website built with the latest web technologies to deliver speed, reliability, and a premium user experience.

## 🚀 Technologies

This project is built using the following stack:

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## ✨ Features

- **Premium Dark Mode:** Sleek, deep space theme designed for developers.
- **Bento Grid Layouts:** Modern, organized content presentation.
- **High Performance:** Optimized with Next.js best practices and `next/image`.
- **SEO Optimized:** Auto-generated `sitemap.xml` and `robots.txt` configuration.
- **Interactive UI:** Smooth transitions and micro-interactions powered by Framer Motion.
- **Glassmorphism:** Elegant UI elements with backdrop blur effects.

## 📂 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Homepage
│   ├── globals.css       # Global styles & Tailwind
│   ├── robots.ts         # Robots.txt generation
│   └── sitemap.ts        # Sitemap generation
├── components/           # React Components
│   ├── layout/           # Shared layout components (Navbar, Footer)
│   ├── sections/         # Feature-rich page sections (Hero, Features, HostingPlans, FlashDeals, GlobalInfrastructure)
│   └── ui/               # Reusable UI components (Button, etc.)
└── lib/                  # Utilities
    └── utils.ts          # Helper functions
```

## 🛠️ Getting Started

Follow these steps to set up the project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/nodeMaina.git
    cd nodeMaina/website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to catch code issues.

## 🎨 Design System

The application uses a custom color palette tailored for NodeMaina:
- **Primary:** Electric Node Blue (`#2563EB`)
- **Secondary:** Mania Teal (`#0D9488`)
- **Background:** Deep Space (`#0B0E14`)
- **Surface:** Glass Slate (`#1E293B`)
- **Text:** High Contrast White (`#F8FAFC`)
- **Accent:** Warning Amber (`#F59E0B`)

---

Developed with ❤️ for the NodeMaina team.
