# Portfolio Application - Production Deployment Guide

This guide will help you deploy your portfolio application to a Linux server with Docker, Nginx, and HTTPS support.

## 📋 Prerequisites

- Linux server (Ubuntu 20.04+ recommended)
- Docker and Docker Compose installed
- Domain name pointing to your server's IP address
- Ports 80 and 443 open in your firewall

## 🚀 Quick Start

### 1. Install Docker and Docker Compose (if not already installed)

```bash
# Update package index
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add your user to docker group (optional, to run docker without sudo)
sudo usermod -aG docker $USER
```

### 2. Clone/Upload Your Application

```bash
# Upload your application files to the server
# You can use git, scp, or any other method
git clone <your-repo-url>
cd Portfolio
```

### 3. Configure Your Domain

Update the Nginx configuration with your domain name:

```bash
# Edit nginx/conf.d/default.conf
# Replace 'localhost' with your actual domain name
nano nginx/conf.d/default.conf
```

### 4. Obtain SSL Certificate

#### Option A: Let's Encrypt (Production - Recommended)

```bash
# Make the script executable
chmod +x init-ssl.sh

# Run the SSL initialization script
./init-ssl.sh yourdomain.com your@email.com
```

This script will:
- Create necessary directories
- Update Nginx configuration with your domain
- Request SSL certificate from Let's Encrypt
- Configure automatic certificate renewal

#### Option B: Self-Signed Certificate (Testing/Development)

```bash
# Make the script executable
chmod +x init-ssl-self-signed.sh

# Generate self-signed certificate
./init-ssl-self-signed.sh yourdomain.com
```

**Note:** Self-signed certificates will show browser warnings. Use only for testing.

### 5. Start the Application

```bash
# Build and start all services
docker-compose up -d

# Check if services are running
docker-compose ps

# View logs
docker-compose logs -f
```

### 6. Verify Deployment

- HTTP: `http://yourdomain.com` (should redirect to HTTPS)
- HTTPS: `https://yourdomain.com`
- Health check: `https://yourdomain.com/health`

## 🔧 Manual SSL Setup (Alternative)

If the automated script doesn't work, you can manually obtain certificates:

```bash
# Create directories
mkdir -p certbot/conf certbot/www nginx/logs

# Start only Nginx
docker-compose up -d nginx

# Request certificate
docker-compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email your@email.com \
  --agree-tos \
  --no-eff-email \
  -d yourdomain.com

# Restart Nginx
docker-compose restart nginx
```

## 📝 Configuration Files

### Docker Compose Services

- **nextjs**: Your Next.js application (port 3000 internally)
- **nginx**: Reverse proxy and SSL termination (ports 80, 443)
- **certbot**: SSL certificate management and auto-renewal

### Nginx Configuration

- `nginx/nginx.conf`: Main Nginx configuration
- `nginx/conf.d/default.conf`: Server blocks and proxy settings
- `nginx/logs/`: Nginx access and error logs

### SSL Certificates

- `certbot/conf/`: SSL certificates and Let's Encrypt configuration
- `certbot/www/`: Certbot challenge files

## 🔄 Common Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# View logs
docker-compose logs -f [service-name]

# Rebuild application
docker-compose up -d --build

# Update SSL certificates manually
docker-compose run --rm certbot renew

# Access application container
docker-compose exec nextjs sh

# Access Nginx container
docker-compose exec nginx sh
```

## 🛠️ Maintenance

### Certificate Renewal

Certificates are automatically renewed by the Certbot container. The renewal check runs every 12 hours.

To manually renew:
```bash
docker-compose run --rm certbot renew
docker-compose restart nginx
```

### Updating the Application

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose up -d --build
```

### Viewing Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f nextjs
docker-compose logs -f nginx

# Nginx access logs
docker-compose exec nginx tail -f /var/log/nginx/access.log

# Nginx error logs
docker-compose exec nginx tail -f /var/log/nginx/error.log
```

### Backup

```bash
# Backup SSL certificates
tar -czf ssl-backup-$(date +%Y%m%d).tar.gz certbot/

# Backup Nginx configuration
tar -czf nginx-backup-$(date +%Y%m%d).tar.gz nginx/
```

## 🔒 Security Features

- **HTTPS Only**: All HTTP traffic redirected to HTTPS
- **Modern TLS**: TLS 1.2 and 1.3 only
- **Security Headers**: HSTS, X-Frame-Options, CSP, etc.
- **Rate Limiting**: Protection against DDoS and brute force
- **Gzip Compression**: Reduced bandwidth usage
- **Non-root User**: Application runs as non-privileged user

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Check what's using port 80/443
sudo lsof -i :80
sudo lsof -i :443

# Stop conflicting services
sudo systemctl stop apache2  # or nginx if installed globally
```

### Certificate Issues

```bash
# Check certificate status
docker-compose run --rm certbot certificates

# Test certificate renewal
docker-compose run --rm certbot renew --dry-run
```

### Application Not Starting

```bash
# Check logs
docker-compose logs nextjs

# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Nginx Configuration Errors

```bash
# Test Nginx configuration
docker-compose exec nginx nginx -t

# Reload Nginx
docker-compose exec nginx nginx -s reload
```

## 📊 Performance Optimization

The setup includes:
- **Gzip compression** for text files
- **Static file caching** for Next.js assets
- **HTTP/2** support
- **Keep-alive connections**
- **Optimized worker processes**

## 🌐 Environment Variables

Create a `.env` file for custom configuration:

```env
NODE_ENV=production
PORT=3000
# Add your custom variables
```

## 📱 Monitoring

### Health Check

```bash
curl https://yourdomain.com/health
```

### Resource Usage

```bash
# Container stats
docker stats

# Disk usage
docker system df
```

## 🔐 Firewall Configuration

```bash
# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable
```

## 📚 Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)

## 💡 Tips

1. **Domain Setup**: Ensure your domain's DNS A record points to your server's IP
2. **Firewall**: Make sure ports 80 and 443 are open
3. **Testing**: Use self-signed certificates for testing before going to production
4. **Monitoring**: Set up monitoring and alerts for your application
5. **Backups**: Regularly backup your SSL certificates and configuration

## 📞 Support

If you encounter issues:
1. Check the logs: `docker-compose logs -f`
2. Verify Nginx config: `docker-compose exec nginx nginx -t`
3. Check certificate status: `docker-compose run --rm certbot certificates`

---

**Note**: Replace `yourdomain.com` and `your@email.com` with your actual domain and email address throughout this guide.
