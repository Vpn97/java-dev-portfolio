#!/bin/bash

# Production Deployment Script
# This script helps deploy the application on a Linux server

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}=== Portfolio Application Deployment ===${NC}"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed!${NC}"
    echo -e "${YELLOW}Installing Docker...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    rm get-docker.sh
    echo -e "${GREEN}Docker installed successfully!${NC}"
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed!${NC}"
    echo -e "${YELLOW}Installing Docker Compose...${NC}"
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}Docker Compose installed successfully!${NC}"
fi

echo ""
echo -e "${GREEN}Prerequisites check passed!${NC}"
echo ""

# Ask for deployment type
echo -e "${YELLOW}Select deployment type:${NC}"
echo "1) Production with Let's Encrypt SSL (requires domain)"
echo "2) Development with self-signed SSL"
echo "3) HTTP only (not recommended)"
echo "4) Update existing production deployment"
read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        read -p "Enter your domain name: " domain
        read -p "Enter your email: " email
        
        if [ -z "$domain" ] || [ -z "$email" ]; then
            echo -e "${RED}Domain and email are required!${NC}"
            exit 1
        fi
        
        echo -e "${GREEN}Setting up production deployment with SSL...${NC}"
        chmod +x init-ssl.sh
        ./init-ssl.sh "$domain" "$email"
        ;;
    2)
        read -p "Enter domain name (or press Enter for localhost): " domain
        domain=${domain:-localhost}
        
        echo -e "${GREEN}Setting up development deployment with self-signed SSL...${NC}"
        chmod +x init-ssl-self-signed.sh
        ./init-ssl-self-signed.sh "$domain"
        
        # Start services
        docker-compose up -d
        ;;
    3)
        echo -e "${YELLOW}Warning: HTTP-only deployment is not secure!${NC}"
        read -p "Are you sure? (yes/no): " confirm
        
        if [ "$confirm" != "yes" ]; then
            echo -e "${RED}Deployment cancelled${NC}"
            exit 1
        fi
        
        # Modify docker-compose to remove SSL
        echo -e "${GREEN}Starting HTTP-only deployment...${NC}"
        docker-compose up -d
        ;;
    4)
        echo -e "${GREEN}Updating production deployment...${NC}"
        echo ""
        
        # Pull latest changes
        echo -e "${YELLOW}Pulling latest changes from repository...${NC}"
        git pull origin main
        
        if [ $? -ne 0 ]; then
            echo -e "${RED}Failed to pull changes!${NC}"
            exit 1
        fi
        
        echo -e "${GREEN}✓ Latest changes pulled${NC}"
        echo ""
        
        # Rebuild and restart
        echo -e "${YELLOW}Rebuilding and restarting services...${NC}"
        docker-compose up -d --build
        
        if [ $? -ne 0 ]; then
            echo -e "${RED}Failed to rebuild services!${NC}"
            exit 1
        fi
        
        echo -e "${GREEN}✓ Services rebuilt and restarted${NC}"
        echo ""
        
        # Wait for services to start
        echo -e "${YELLOW}Waiting for services to start...${NC}"
        sleep 10
        
        # Show status
        echo -e "${GREEN}Service status:${NC}"
        docker-compose ps
        
        echo ""
        echo -e "${GREEN}=== Update Complete ===${NC}"
        echo ""
        echo -e "${YELLOW}Checking logs for errors...${NC}"
        docker-compose logs --tail=20 nextjs
        
        echo ""
        echo -e "${GREEN}Deployment updated successfully!${NC}"
        echo -e "${YELLOW}Visit your site to verify changes${NC}"
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}=== Deployment Complete ===${NC}"
echo ""
echo -e "${YELLOW}Useful commands:${NC}"
echo "  View logs:           docker-compose logs -f"
echo "  Stop services:       docker-compose down"
echo "  Restart services:    docker-compose restart"
echo "  Update application:  ./deploy.sh (choose option 4)"
echo ""
