# Quick Start Guide - Production Deployment

## 🚀 Deploy in 3 Steps

### Step 1: Prepare Your Server

```bash
# SSH into your Linux server
ssh user@your-server-ip

# Clone your repository
git clone <your-repo-url>
cd Portfolio
```

### Step 2: Run Deployment Script

```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

The script will:
- ✅ Install Docker and Docker Compose (if needed)
- ✅ Ask for your domain and email
- ✅ Set up SSL certificates automatically
- ✅ Start all services

### Step 3: Verify

Visit your domain:
- `https://yourdomain.com` - Your portfolio
- `https://yourdomain.com/health` - Health check

---

## 📋 Manual Deployment (Alternative)

If you prefer manual setup:

### 1. Install Docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### 2. Install Docker Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 3. Set Up SSL

**Option A: Let's Encrypt (Production)**
```bash
chmod +x init-ssl.sh
./init-ssl.sh yourdomain.com your@email.com
```

**Option B: Self-Signed (Testing)**
```bash
chmod +x init-ssl-self-signed.sh
./init-ssl-self-signed.sh yourdomain.com
```

### 4. Start Services

```bash
docker-compose up -d
```

---

## 🛠️ Using Makefile (Recommended)

If you have `make` installed:

```bash
# Deploy interactively
make deploy

# Or use individual commands
make ssl-init          # Set up Let's Encrypt SSL
make up                # Start services
make logs              # View logs
make status            # Check status
```

View all available commands:
```bash
make help
```

---

## 🔧 Common Commands

```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Stop services
docker-compose down

# Update application
git pull
docker-compose up -d --build
```

---

## 📝 Before Deployment

1. **Point your domain to your server's IP**
   - Create an A record in your DNS settings
   - Wait for DNS propagation (can take up to 48 hours)

2. **Open firewall ports**
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

3. **Update configuration**
   - Edit `nginx/conf.d/default.conf` if needed
   - Set environment variables in `.env`

---

## 🆘 Troubleshooting

**Port already in use?**
```bash
sudo lsof -i :80
sudo lsof -i :443
# Stop conflicting services
```

**Certificate issues?**
```bash
docker-compose run --rm certbot certificates
```

**Application not starting?**
```bash
docker-compose logs nextjs
```

---

## 📚 Full Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete documentation.

---

## 🔒 Security Checklist

- ✅ HTTPS enabled
- ✅ HTTP redirects to HTTPS
- ✅ Security headers configured
- ✅ Rate limiting enabled
- ✅ Non-root user in containers
- ✅ Firewall configured

---

**Need help?** Check the logs: `docker-compose logs -f`
