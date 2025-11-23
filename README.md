# Vishal Nagvadiya - Portfolio Website

A modern, responsive portfolio website for a Senior Java Developer built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

![Portfolio Preview](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🎨 **Modern Design** - Clean, professional, and minimalistic design
- 🌓 **Dark/Light Mode** - Toggle between themes with smooth transitions
- 📱 **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- ⚡ **Fast Performance** - Static site generation for optimal loading speeds
- 🎭 **Smooth Animations** - Framer Motion for elegant scroll and page transitions
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and structured data
- 🎯 **Project Filtering** - Filter projects by technology stack
- 📧 **Contact Form** - Integrated mailto contact functionality
- 📄 **CV Download** - Direct resume download button
- 🚀 **Easy Deployment** - One-click deploy to Vercel or GitHub Pages

## 🏗️ Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Footer with social links
│   ├── ThemeProvider.tsx    # Theme context provider
│   └── sections/
│       ├── Hero.tsx         # Hero section
│       ├── About.tsx        # About me section
│       ├── Skills.tsx       # Skills showcase
│       ├── Experience.tsx   # Work experience timeline
│       ├── Projects.tsx     # Projects grid with filtering
│       ├── Certifications.tsx  # Certifications display
│       └── Contact.tsx      # Contact form
├── data/
│   └── portfolio.json       # All portfolio content (editable)
├── public/
│   └── resume.pdf          # Your CV (add your PDF here)
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── package.json            # Dependencies
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/vishalnagvadiya/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Add your resume**

   - Place your CV/resume PDF in the `public` folder
   - Name it `resume.pdf` or update the link in `components/sections/Hero.tsx`

4. **Update portfolio content**

   - Edit `data/portfolio.json` with your information
   - Update personal details, skills, experience, projects, certifications

5. **Run development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization

### Update Personal Information

Edit `data/portfolio.json` to customize all content:

```json
{
  "personal": {
    "name": "Your Name",
    "role": "Your Role",
    "email": "your.email@example.com",
    "summary": "Your professional summary...",
    "social": {
      "github": "https://github.com/yourusername",
      "linkedin": "https://linkedin.com/in/yourusername"
    }
  },
  "skills": { ... },
  "experience": [ ... ],
  "projects": [ ... ],
  "certifications": [ ... ]
}
```

### Customize Colors

Update theme colors in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Customize your primary color palette
        500: '#0ea5e9',
        600: '#0284c7',
        // ...
      }
    }
  }
}
```

### Add Freelance Profile Links

Update the freelance section in `data/portfolio.json`:

```json
"freelance": {
  "fiverr": "https://www.fiverr.com/yourusername",
  "upwork": "https://www.upwork.com/freelancers/~yourprofile",
  "freelancer": "https://www.freelancer.com/u/yourusername"
}
```

Then add "Hire Me" buttons in the Hero section by uncommenting the relevant code.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel**

   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and deploy
   - Your site will be live at `https://your-project.vercel.app`

3. **Custom Domain (Optional)**
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Deploy to GitHub Pages

1. **Update `next.config.mjs`**

   ```javascript
   const nextConfig = {
     output: "export",
     basePath: "/portfolio", // Your repo name
     images: { unoptimized: true },
   };
   ```

2. **Build and export**

   ```bash
   npm run build
   ```

3. **Deploy using GitHub Actions**

   - Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: "18"
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

4. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from branch `gh-pages`
   - Your site: `https://yourusername.github.io/portfolio`

### Deploy to Netlify

1. **Install Netlify CLI**

   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**

   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=out
   ```

### Deploy to Production Server (Docker + Nginx + HTTPS)

For production deployment on your own Linux server with Docker, Nginx, and HTTPS:

#### Quick Deployment

```bash
# On your Linux server
git clone <your-repo-url>
cd Portfolio

# Run the automated deployment script
chmod +x deploy.sh
./deploy.sh
```

The script will:
- ✅ Install Docker and Docker Compose
- ✅ Set up SSL certificates (Let's Encrypt)
- ✅ Configure Nginx reverse proxy
- ✅ Start all services with HTTPS

#### Manual Deployment

See detailed instructions in:
- **[QUICKSTART.md](./QUICKSTART.md)** - Fast deployment guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete documentation
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Pre-flight checklist

#### Using Makefile

```bash
make deploy          # Interactive deployment
make ssl-init        # Set up Let's Encrypt SSL
make up              # Start services
make logs            # View logs
make help            # Show all commands
```

#### What's Included

- 🐳 **Docker** - Containerized application
- 🔒 **HTTPS** - Automatic SSL with Let's Encrypt
- 🚀 **Nginx** - Reverse proxy with caching
- 📊 **Monitoring** - Health checks and logging
- 🔄 **Auto-renewal** - SSL certificates renew automatically
- 🛡️ **Security** - Rate limiting, security headers, HSTS

#### Requirements

- Linux server (Ubuntu 20.04+)
- Docker and Docker Compose
- Domain name pointing to server
- Ports 80 and 443 open



- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 SEO Features

- Meta tags for search engines
- Open Graph tags for social media
- Twitter Card support
- Semantic HTML structure
- Optimized images
- Fast loading times
- Mobile-friendly design
- Structured data ready

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

**Vishal Nagvadiya**

- Email: vpn0097@gmail.com
- GitHub: [@Vpn_97](https://github.com/vishalnagvadiya)
- LinkedIn: [Vishal Nagvadiya](https://www.linkedin.com/in/vishalnagvadiya)

---

⭐ **Star this repo if you found it helpful!**

Built with ❤️ using Next.js and Tailwind CSS
