#!/bin/bash

# Self-Signed Certificate Setup Script (for testing/development)
# Use this if you don't have a domain or want to test locally

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}=== Self-Signed SSL Certificate Setup ===${NC}"
echo ""

DOMAIN=${1:-localhost}

echo -e "${YELLOW}Creating self-signed certificate for: ${DOMAIN}${NC}"
echo ""

# Create directories
mkdir -p certbot/conf/live/${DOMAIN}
mkdir -p certbot/www
mkdir -p nginx/logs

# Generate self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout certbot/conf/live/${DOMAIN}/privkey.pem \
    -out certbot/conf/live/${DOMAIN}/fullchain.pem \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=${DOMAIN}"

# Set proper permissions
chmod 644 certbot/conf/live/${DOMAIN}/fullchain.pem
chmod 600 certbot/conf/live/${DOMAIN}/privkey.pem

echo ""
echo -e "${GREEN}Self-signed certificate created successfully!${NC}"
echo -e "${YELLOW}Note: Browsers will show a security warning for self-signed certificates.${NC}"
echo -e "${YELLOW}This is normal and safe for development/testing.${NC}"
echo ""
echo -e "${GREEN}You can now start the application with: docker-compose up -d${NC}"
