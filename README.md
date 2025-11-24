<div align="center">

# 🚀 Professional Developer Portfolio Template

### Production-Ready Portfolio with Automated Docker Deployment & SSL

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[🌐 Live Demo](https://vishal.apkzube.com) • [📖 Documentation](./DEPLOYMENT.md) • [⭐ Star this repo](https://github.com/Vpn97/java-dev-portfolio)

![Portfolio Preview](./public/screenshots/hero-dark.png)

</div>

---

## 📖 About This Project

**A complete, production-ready portfolio solution** that goes beyond just a template. This project provides everything you need to deploy a professional developer portfolio with **enterprise-grade infrastructure** in minutes, not hours.

### 🎯 What Makes This Different?

Unlike typical portfolio templates that only give you the frontend code, this project includes:

- ✅ **Complete Infrastructure** - Docker, Nginx, SSL certificates, everything configured
- ✅ **One-Command Deployment** - Automated script handles everything from SSL to server setup
- ✅ **Production-Ready** - Battle-tested configuration used in real production environments
- ✅ **Zero DevOps Knowledge Required** - Just run the script and you're live with HTTPS
- ✅ **Fully Customizable** - Modern Next.js 14 with TypeScript and Tailwind CSS
- ✅ **Cost-Effective** - Deploy on any $5/month VPS (AWS EC2, DigitalOcean, etc.)

### 💡 Perfect For

Whether you're a **job seeker** wanting to impress recruiters, a **freelancer** building your brand, or a **developer** showcasing your work - this template provides a professional, secure, and fast portfolio that you can deploy in under 10 minutes.

### 🌟 Key Highlights

- **🚀 Deploy in 5 Minutes** - Seriously. Clone, run script, enter domain, done.
- **🔒 Automatic HTTPS** - Let's Encrypt SSL with auto-renewal built-in
- **🐳 Docker-Based** - Consistent deployment across any Linux server
- **📱 Fully Responsive** - Perfect on mobile, tablet, and desktop
- **🎨 Dark/Light Mode** - Beautiful UI with theme switching
- **⚡ Blazing Fast** - Optimized for performance (Lighthouse 95+)
- **🔄 Easy Updates** - One command to deploy new changes

---

## 🖼️ Screenshots

### Dark Mode
![Hero Section Dark](./public/screenshots/hero-dark.png)
![About Section Dark](./public/screenshots/about-dark.png)

### Light Mode
![Hero Section Light](./public/screenshots/hero-light.png)
![About Section Light](./public/screenshots/about-light.png)

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Vpn97/java-dev-portfolio.git
cd java-dev-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Customization

### Update Your Information

Edit `data/portfolio.json` with your details:

```json
{
  "personal": {
    "name": "Your Name",
    "role": "Your Role",
    "email": "your.email@example.com",
    "summary": "Your professional summary..."
  }
}
```

### Add Your Resume

Place your CV/resume PDF in the `public` folder and name it `cv.pdf`.

## 🌐 Deployment

### Option 1: Deploy with Docker (Recommended for Production)

Perfect for deploying on **Amazon EC2**, **DigitalOcean**, or any **Linux server**.

#### Requirements
- Linux server (Ubuntu 20.04+)
- Docker and Docker Compose
- Domain name pointing to your server
- Ports 80 and 443 open

#### Quick Deploy

```bash
# On your Linux server
git clone https://github.com/Vpn97/java-dev-portfolio.git
cd java-dev-portfolio

# Run deployment script
chmod +x deploy.sh
./deploy.sh

# Choose option 1 for production with SSL
# Enter your domain and email
```

The script will:
- ✅ Install Docker & Docker Compose (if needed)
- ✅ Set up SSL certificate (Let's Encrypt)
- ✅ Configure Nginx reverse proxy
- ✅ Start your application with HTTPS

#### Update Production Deployment

```bash
# Pull latest changes
git pull origin main

# Run deployment script
./deploy.sh

# Choose option 4: Update existing production deployment
```

#### Manual Docker Deployment

```bash
# Build and start services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Option 2: Deploy without Docker

#### Deploy to Vercel (Easiest)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Deploy!

Your site will be live at `https://your-project.vercel.app`

#### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

#### Deploy to GitHub Pages

1. Update `next.config.mjs`:
```javascript
const nextConfig = {
  output: "export",
  basePath: "/java-dev-portfolio",
  images: { unoptimized: true },
};
```

2. Build and deploy:
```bash
npm run build
# Push the `out` folder to gh-pages branch
```

## 🐳 Docker Configuration

The project includes:
- **Dockerfile** - Multi-stage build for optimized images
- **docker-compose.yml** - Orchestrates Next.js, Nginx, and Certbot
- **Nginx** - Reverse proxy with SSL/TLS
- **Certbot** - Automatic SSL certificate management

### Docker Services

| Service | Purpose | Port |
|---------|---------|------|
| nextjs | Next.js application | 3000 (internal) |
| nginx | Reverse proxy & SSL | 80, 443 |
| certbot | SSL certificate management | - |

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [React Icons](https://react-icons.github.io/react-icons/) - Icons
- [Docker](https://www.docker.com/) - Containerization
- [Nginx](https://nginx.org/) - Web server

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🔒 Security Features

- HTTPS enforced (HTTP redirects to HTTPS)
- Modern TLS 1.2/1.3 only
- Security headers (HSTS, X-Frame-Options, CSP)
- Rate limiting for DDoS protection
- Non-root Docker containers

## 📊 Performance

- Optimized Docker images (multi-stage builds)
- Nginx caching for static assets
- Gzip compression
- HTTP/2 support
- Image optimization

---

## 💎 Feature Highlights

<table>
<tr>
<td width="50%">

### 🎨 Beautiful UI/UX
- Modern, clean design
- Dark/Light mode toggle
- Smooth animations
- Responsive layouts
- Professional typography

</td>
<td width="50%">

### ⚡ Performance First
- Lighthouse score 95+
- Optimized images
- Code splitting
- Lazy loading
- Fast page loads

</td>
</tr>
<tr>
<td width="50%">

### 🔒 Enterprise Security
- HTTPS enforced
- Security headers
- Rate limiting
- DDoS protection
- Regular updates

</td>
<td width="50%">

### 🚀 Easy Deployment
- One-command deploy
- Auto SSL setup
- Docker ready
- CI/CD friendly
- Zero downtime updates

</td>
</tr>
</table>

---

## 📈 Why Developers Love This

> **"The easiest portfolio deployment I've ever done. Literally 5 minutes from clone to live!"**  
> — *Happy Developer*

### ⭐ Key Benefits

| Feature | This Template | Others |
|---------|---------------|--------|
| Docker Setup | ✅ Included | ❌ Manual |
| SSL Certificate | ✅ Automatic | ❌ Manual |
| Nginx Config | ✅ Pre-configured | ❌ DIY |
| Production Ready | ✅ Yes | ❌ Dev only |
| One-Command Deploy | ✅ Yes | ❌ No |
| Auto Updates | ✅ Yes | ❌ No |

---

## 🎯 Perfect For

- 💼 **Job Seekers** - Impress recruiters with a professional portfolio
- 👨‍💻 **Developers** - Showcase your projects and skills
- 🎓 **Students** - Build your online presence
- 🚀 **Freelancers** - Attract more clients
- 📚 **Learners** - Study modern web development practices

---

## 🌟 Show Your Support

If this project helped you, please consider:

- ⭐ **Star this repository** - It helps others discover it!
- 🔀 **Fork it** - Make it your own
- 📣 **Share it** - Help other developers
- 🐛 **Report issues** - Help improve it
- 💡 **Suggest features** - Share your ideas

<div align="center">

### ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Vpn97/java-dev-portfolio&type=Date)](https://star-history.com/#Vpn97/java-dev-portfolio&Date)

</div>

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest new features  
- 🔧 Submit pull requests
- 📖 Improve documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

## 📧 Contact & Connect

**Vishal Nagvadiya** - Senior Java Developer

[![Email](https://img.shields.io/badge/Email-vpn0097%40gmail.com-red?style=for-the-badge&logo=gmail)](mailto:vpn0097@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/vishalnagvadiya)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/Vpn97)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-green?style=for-the-badge&logo=google-chrome)](https://vishal.apkzube.com)

---

### 🎉 Thank You for Visiting!

<p>
<img src="https://img.shields.io/github/stars/Vpn97/java-dev-portfolio?style=social" alt="GitHub stars">
<img src="https://img.shields.io/github/forks/Vpn97/java-dev-portfolio?style=social" alt="GitHub forks">
<img src="https://img.shields.io/github/watchers/Vpn97/java-dev-portfolio?style=social" alt="GitHub watchers">
</p>

**If you found this helpful, please ⭐ star this repository!**

It motivates me to create more open-source projects.

---

<sub>Built with ❤️ using Next.js, TypeScript, Docker, and lots of ☕</sub>

<sub>© 2024 Vishal Nagvadiya. All rights reserved.</sub>

</div>
