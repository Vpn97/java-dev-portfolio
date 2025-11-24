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
echo -e "${GREEN}Backing up production configuration...${NC}"
mv nginx/conf.d/default.conf nginx/conf.d/default.conf.backup

# Start nginx with temporary config
echo -e "${GREEN}Starting Nginx for certificate generation...${NC}"
docker-compose down
docker-compose up -d nginx

# Wait for nginx to start properly
echo -e "${YELLOW}Waiting for Nginx to start...${NC}"
sleep 10

# Test if nginx is responding
echo -e "${GREEN}Testing Nginx...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/ || echo "000")
if [ "$HTTP_CODE" != "200" ] && [ "$HTTP_CODE" != "301" ]; then
    echo -e "${RED}Nginx is not responding properly (HTTP $HTTP_CODE)${NC}"
    echo -e "${YELLOW}Check logs: docker-compose logs nginx${NC}"
    # Restore config
    mv nginx/conf.d/default.conf.backup nginx/conf.d/default.conf
    exit 1
fi
echo -e "${GREEN}Nginx is ready (HTTP $HTTP_CODE)${NC}"

# Request certificate
echo -e "${GREEN}Requesting SSL certificate from Let's Encrypt...${NC}"
echo -e "${YELLOW}This may take a few minutes...${NC}"

docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email ${EMAIL} \
    --agree-tos \
    --no-eff-email \
    --force-renewal \
    -d ${DOMAIN}

CERT_EXIT_CODE=$?

# Check if certificate was actually created
if [ -f "certbot/conf/live/${DOMAIN}/fullchain.pem" ] && [ $CERT_EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}Certificate obtained successfully!${NC}"
    
    # Restore the default config
    echo -e "${GREEN}Restoring production configuration...${NC}"
    rm -f nginx/conf.d/temp.conf
    mv nginx/conf.d/default.conf.backup nginx/conf.d/default.conf
    
    # Start all services with proper configuration
    echo -e "${GREEN}Starting all services...${NC}"
    docker-compose down
    docker-compose up -d
    
    # Wait for services to start
    echo -e "${YELLOW}Waiting for services to start...${NC}"
    sleep 15
    
    echo ""
    echo -e "${GREEN}=== Setup Complete ===${NC}"
    echo -e "${GREEN}Your application is now running with HTTPS!${NC}"
    echo ""
    echo -e "${YELLOW}Access your site at: https://${DOMAIN}${NC}"
    echo -e "${YELLOW}Health check: https://${DOMAIN}/health${NC}"
    echo ""
    echo -e "${GREEN}Checking service status...${NC}"
    docker-compose ps
    echo ""
    echo -e "${YELLOW}If you see 'OK' instead of your portfolio, wait 30 seconds and refresh${NC}"
else
    echo -e "${RED}Failed to obtain certificate${NC}"
    echo -e "${YELLOW}Certificate file not found or certbot failed${NC}"
    echo -e "${YELLOW}Restoring original configuration...${NC}"
    rm -f nginx/conf.d/temp.conf
    if [ -f nginx/conf.d/default.conf.backup ]; then
        mv nginx/conf.d/default.conf.backup nginx/conf.d/default.conf
    fi
    echo ""
    echo -e "${RED}Troubleshooting:${NC}"
    echo "1. Check if your domain DNS is pointing to this server"
    echo "2. Check if ports 80 and 443 are open"
    echo "3. View certbot logs: docker-compose logs certbot"
    echo "4. Try again in a few minutes"
    exit 1
fi
