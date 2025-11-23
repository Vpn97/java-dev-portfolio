# Makefile for Portfolio Application

.PHONY: help build up down restart logs clean ssl-init ssl-self-signed deploy

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build Docker images
	docker-compose build

up: ## Start all services
	docker-compose up -d

down: ## Stop all services
	docker-compose down

restart: ## Restart all services
	docker-compose restart

logs: ## View logs from all services
	docker-compose logs -f

logs-app: ## View application logs
	docker-compose logs -f nextjs

logs-nginx: ## View Nginx logs
	docker-compose logs -f nginx

clean: ## Remove all containers, volumes, and images
	docker-compose down -v
	docker system prune -af

ssl-init: ## Initialize SSL with Let's Encrypt
	@read -p "Enter domain name: " domain; \
	read -p "Enter email: " email; \
	chmod +x init-ssl.sh && ./init-ssl.sh $$domain $$email

ssl-self-signed: ## Generate self-signed SSL certificate
	@read -p "Enter domain name (default: localhost): " domain; \
	domain=$${domain:-localhost}; \
	chmod +x init-ssl-self-signed.sh && ./init-ssl-self-signed.sh $$domain

deploy: ## Deploy application (interactive)
	chmod +x deploy.sh && ./deploy.sh

update: ## Update and rebuild application
	git pull
	docker-compose up -d --build

backup-ssl: ## Backup SSL certificates
	tar -czf ssl-backup-$$(date +%Y%m%d-%H%M%S).tar.gz certbot/

backup-config: ## Backup Nginx configuration
	tar -czf nginx-backup-$$(date +%Y%m%d-%H%M%S).tar.gz nginx/

status: ## Show status of all services
	docker-compose ps

health: ## Check application health
	@curl -f http://localhost/health || echo "Health check failed"

shell-app: ## Access application container shell
	docker-compose exec nextjs sh

shell-nginx: ## Access Nginx container shell
	docker-compose exec nginx sh

renew-ssl: ## Manually renew SSL certificates
	docker-compose run --rm certbot renew
	docker-compose restart nginx
