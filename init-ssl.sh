#!/bin/bash

# SSL Certificate Setup Script for Let's Encrypt
# This script helps you obtain SSL certificates using Certbot

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== SSL Certificate Setup ===${NC}"
echo ""

# Check if domain is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Domain name is required${NC}"
    echo "Usage: ./init-ssl.sh yourdomain.com your@email.com"
    exit 1
fi

if [ -z "$2" ]; then
    echo -e "${RED}Error: Email is required${NC}"
    echo "Usage: ./init-ssl.sh yourdomain.com your@email.com"
    exit 1
fi

DOMAIN=$1
EMAIL=$2

echo -e "${YELLOW}Domain: ${DOMAIN}${NC}"
echo -e "${YELLOW}Email: ${EMAIL}${NC}"
echo ""

# Create required directories
echo -e "${GREEN}Creating required directories...${NC}"
mkdir -p certbot/conf
mkdir -p certbot/www
mkdir -p nginx/logs

# Update nginx configuration with domain
echo -e "${GREEN}Updating Nginx configuration with domain...${NC}"
sed -i "s/server_name localhost;/server_name ${DOMAIN};/g" nginx/conf.d/default.conf
sed -i "s|/etc/letsencrypt/live/localhost/|/etc/letsencrypt/live/${DOMAIN}/|g" nginx/conf.d/default.conf

# Create temporary nginx config for certificate generation
echo -e "${GREEN}Creating temporary Nginx configuration...${NC}"
cat > nginx/conf.d/temp.conf << EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'OK';
        add_header Content-Type text/plain;
    }
}
EOF

# Backup the default config
mv nginx/conf.d/default.conf nginx/conf.d/default.conf.backup

# Start nginx with temporary config
echo -e "${GREEN}Starting Nginx for certificate generation...${NC}"
docker-compose up -d nginx

# Wait for nginx to start
sleep 5

# Request certificate
echo -e "${GREEN}Requesting SSL certificate from Let's Encrypt...${NC}"
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email ${EMAIL} \
    --agree-tos \
    --no-eff-email \
    -d ${DOMAIN}

# Check if certificate was obtained
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Certificate obtained successfully!${NC}"
    
    # Restore the default config
    rm nginx/conf.d/temp.conf
    mv nginx/conf.d/default.conf.backup nginx/conf.d/default.conf
    
    # Restart nginx with SSL config
    echo -e "${GREEN}Restarting Nginx with SSL configuration...${NC}"
    docker-compose restart nginx
    
    echo ""
    echo -e "${GREEN}=== Setup Complete ===${NC}"
    echo -e "${GREEN}Your application is now running with HTTPS!${NC}"
    echo -e "${YELLOW}Access your site at: https://${DOMAIN}${NC}"
else
    echo -e "${RED}Failed to obtain certificate${NC}"
    echo -e "${YELLOW}Restoring original configuration...${NC}"
    rm nginx/conf.d/temp.conf
    mv nginx/conf.d/default.conf.backup nginx/conf.d/default.conf
    exit 1
fi
