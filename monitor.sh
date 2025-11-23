#!/bin/bash

# Monitoring and Health Check Script
# Run this script to monitor your application

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=== Portfolio Application Monitoring ===${NC}"
echo ""

# Check if docker-compose is running
if ! docker-compose ps | grep -q "Up"; then
    echo -e "${RED}❌ Services are not running!${NC}"
    echo "Start services with: docker-compose up -d"
    exit 1
fi

echo -e "${GREEN}✅ Services Status${NC}"
docker-compose ps
echo ""

# Check application health
echo -e "${BLUE}Checking application health...${NC}"
HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/health)

if [ "$HEALTH_CHECK" = "200" ]; then
    echo -e "${GREEN}✅ Application is healthy${NC}"
    curl -s http://localhost/health | jq '.' 2>/dev/null || curl -s http://localhost/health
else
    echo -e "${RED}❌ Application health check failed (HTTP $HEALTH_CHECK)${NC}"
fi
echo ""

# Check SSL certificate
echo -e "${BLUE}Checking SSL certificate...${NC}"
docker-compose run --rm certbot certificates 2>/dev/null | grep -A 5 "Certificate Name" || echo -e "${YELLOW}⚠️  No SSL certificate found${NC}"
echo ""

# Check disk usage
echo -e "${BLUE}Disk Usage:${NC}"
df -h / | tail -n 1 | awk '{print "  Used: " $3 " / " $2 " (" $5 ")"}'
echo ""

# Check memory usage
echo -e "${BLUE}Memory Usage:${NC}"
free -h | grep Mem | awk '{print "  Used: " $3 " / " $2}'
echo ""

# Check container resource usage
echo -e "${BLUE}Container Resource Usage:${NC}"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" | grep -E "NAME|portfolio"
echo ""

# Check recent errors in logs
echo -e "${BLUE}Recent Errors (last 50 lines):${NC}"
ERROR_COUNT=$(docker-compose logs --tail=50 2>&1 | grep -i error | wc -l)
if [ "$ERROR_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Found $ERROR_COUNT errors in recent logs${NC}"
    docker-compose logs --tail=50 2>&1 | grep -i error | tail -n 5
else
    echo -e "${GREEN}✅ No recent errors${NC}"
fi
echo ""

# Check Nginx access log
echo -e "${BLUE}Recent Access (last 5 requests):${NC}"
if [ -f "nginx/logs/access.log" ]; then
    tail -n 5 nginx/logs/access.log
else
    echo -e "${YELLOW}⚠️  Access log not found${NC}"
fi
echo ""

# Summary
echo -e "${BLUE}=== Summary ===${NC}"
echo -e "Services: ${GREEN}Running${NC}"
echo -e "Health: $([ "$HEALTH_CHECK" = "200" ] && echo -e "${GREEN}OK${NC}" || echo -e "${RED}Failed${NC}")"
echo -e "Errors: $([ "$ERROR_COUNT" -eq 0 ] && echo -e "${GREEN}None${NC}" || echo -e "${YELLOW}$ERROR_COUNT${NC}")"
echo ""

# Helpful commands
echo -e "${BLUE}Helpful Commands:${NC}"
echo "  View live logs:        docker-compose logs -f"
echo "  Restart services:      docker-compose restart"
echo "  Check certificate:     docker-compose run --rm certbot certificates"
echo "  View Nginx errors:     docker-compose logs nginx | grep error"
echo ""
