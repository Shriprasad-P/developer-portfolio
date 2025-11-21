# 🚀 Full-Stack Developer Portfolio

A modern, responsive portfolio website showcasing interactive project demos and technical skills.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://developer-portfolio-shriprasad.vercel.app)
[![GitHub](https://img.shields.io/badge/github-repository-blue)](https://github.com/Shriprasad-P/developer-portfolio)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## 👨‍💻 About

Professional portfolio website featuring 5 interactive project demonstrations, built with Next.js 14, TypeScript, and modern web technologies. Designed to showcase full-stack development capabilities with a focus on user experience and performance.

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations
- 🌓 **Dark/Light Mode** - Theme toggle with system preference detection
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Performance Optimized** - Fast loading with Next.js SSG and code splitting
- 🔍 **SEO Ready** - Comprehensive meta tags, sitemap, and Open Graph support
- 📧 **Contact Form** - Functional email integration with Nodemailer
- 🎯 **Interactive Demos** - 5 fully functional project demonstrations

## 🎮 Interactive Project Demos

### 1. E-Commerce Platform
Full-featured shopping experience with:
- Product catalog with real images
- Shopping cart functionality
- Quantity management
- Responsive product grid

### 2. AI Chat Assistant
Intelligent chat interface featuring:
- Real-time message bubbles
- Typing indicators
- Predefined prompts
- Clean conversation UI

### 3. Task Management System
Kanban-style task board with:
- Drag-and-drop functionality
- Task creation and editing
- Priority indicators
- Status columns (To Do, In Progress, Done)

### 4. iOS Todo App
Native iOS experience simulation:
- iPhone 15 Pro frame with Dynamic Island
- SwiftUI-inspired design
- Swipe-to-delete gestures
- Category-based task organization

### 5. Algorithm Visualizer
Educational sorting algorithm showcase:
- 7 different sorting algorithms
- Auto-playing visualizations
- Color-coded comparisons
- Algorithm descriptions

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Email**: Nodemailer with Gmail SMTP
- **Server Actions**: Next.js Server Actions

### Development
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shriprasad-P/developer-portfolio.git
   cd developer-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   ```

   **Note**: Get your Gmail App Password from [Google Account Settings](https://myaccount.google.com/apppasswords)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Shriprasad-P/developer-portfolio)

## 📁 Project Structure

```
portfolio/
├── app/                      # Next.js app directory
│   ├── projects/            # Project demo pages
│   │   ├── ai-chat/
│   │   ├── algorithm-visualizer/
│   │   ├── e-commerce/
│   │   ├── ios-todo/
│   │   └── task-management/
│   ├── icon.tsx             # Dynamic favicon
│   ├── layout.tsx           # Root layout with metadata
│   ├── opengraph-image.tsx  # OG image generator
│   ├── page.tsx             # Home page
│   └── sitemap.ts           # Dynamic sitemap
├── components/              # React components
│   ├── ui/                  # Shadcn UI components
│   ├── about.tsx
│   ├── contact.tsx
│   ├── hero.tsx
│   ├── navbar.tsx
│   ├── projects.tsx
│   └── skills.tsx
├── actions/                 # Server actions
│   └── send-email.ts
├── public/                  # Static assets
│   ├── images/             # Project images
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO robots file
├── lib/                     # Utility functions
├── styles/                  # Global styles
└── package.json            # Dependencies
```

## 🎨 Customization

### Update Personal Information

1. **Edit contact details** in `components/contact.tsx`
2. **Update hero section** in `components/hero.tsx`
3. **Modify about section** in `components/about.tsx`
4. **Change skills** in `components/skills.tsx`

### Add New Projects

1. Create a new page in `app/projects/your-project/page.tsx`
2. Add project details to `components/projects.tsx`
3. Add project image to `public/images/`

### Update Metadata

Edit SEO metadata in `app/layout.tsx`:
- Title
- Description
- Keywords
- Open Graph tags
- Twitter Card

## 📧 Contact Form Setup

The contact form uses Gmail SMTP. To enable it:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password at [Google Account](https://myaccount.google.com/apppasswords)
3. Add credentials to `.env.local`:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-char-password
   ```
4. Restart the development server

## 🔍 SEO Features

- ✅ Comprehensive meta tags
- ✅ Open Graph protocol for social sharing
- ✅ Twitter Card support
- ✅ Dynamic sitemap generation
- ✅ Robots.txt configuration
- ✅ Semantic HTML structure
- ✅ Fast loading times
- ✅ Mobile-friendly design

## 📱 PWA Support

The portfolio is installable as a Progressive Web App:
- Manifest file configured
- Theme colors set
- Icons specified
- Standalone display mode

## 🎯 Performance

- **Bundle Size**: ~105 KB shared JavaScript
- **First Load**: < 180 KB for home page
- **Code Splitting**: Per-route optimization
- **Image Optimization**: Next.js Image component
- **Static Generation**: Pre-rendered pages

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Shriprasad R Patil**

- GitHub: [@Shriprasad-P](https://github.com/Shriprasad-P)
- LinkedIn: [Shriprasad R Patil](https://linkedin.com/in/shriprasad-patil)
- Email: shriprasadpatil8@gmail.com
- Portfolio: [Live Demo](https://developer-portfolio-shriprasad.vercel.app)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library
- [Vercel](https://vercel.com/) - Deployment platform

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/Shriprasad-P/developer-portfolio)
![GitHub last commit](https://img.shields.io/github/last-commit/Shriprasad-P/developer-portfolio)
![GitHub issues](https://img.shields.io/github/issues/Shriprasad-P/developer-portfolio)
![GitHub stars](https://img.shields.io/github/stars/Shriprasad-P/developer-portfolio?style=social)

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by Shriprasad R Patil
