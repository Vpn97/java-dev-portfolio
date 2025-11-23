# Production Deployment Checklist

Use this checklist to ensure a smooth deployment.

## Pre-Deployment

### Server Setup
- [ ] Linux server provisioned (Ubuntu 20.04+ recommended)
- [ ] SSH access configured
- [ ] Server has at least 2GB RAM and 20GB disk space
- [ ] Server has a public IP address

### Domain Configuration
- [ ] Domain name registered
- [ ] DNS A record points to server IP
- [ ] DNS propagation completed (check with `nslookup yourdomain.com`)
- [ ] Subdomain configured (if needed)

### Firewall Configuration
- [ ] Port 80 (HTTP) opened
- [ ] Port 443 (HTTPS) opened
- [ ] Port 22 (SSH) secured
- [ ] UFW or iptables configured

### Dependencies
- [ ] Docker installed
- [ ] Docker Compose installed
- [ ] Git installed (for cloning repository)
- [ ] Make installed (optional, for Makefile commands)

## Deployment

### Code Preparation
- [ ] Repository cloned to server
- [ ] All files uploaded (if not using git)
- [ ] File permissions set correctly
- [ ] Scripts made executable (`chmod +x *.sh`)

### Configuration
- [ ] `.env` file created (copy from `.env.example`)
- [ ] Domain name updated in `nginx/conf.d/default.conf`
- [ ] Email address configured for SSL certificates
- [ ] Environment variables set correctly

### SSL Certificate
- [ ] SSL initialization script executed
- [ ] Certificate obtained successfully
- [ ] Certificate files present in `certbot/conf/`
- [ ] Nginx configuration updated with domain

### Application
- [ ] Docker images built successfully
- [ ] All containers started
- [ ] No errors in logs
- [ ] Health check endpoint responding

## Post-Deployment

### Verification
- [ ] HTTP redirects to HTTPS
- [ ] HTTPS site loads correctly
- [ ] SSL certificate valid (check with browser)
- [ ] No mixed content warnings
- [ ] All pages accessible
- [ ] Images and assets loading
- [ ] Forms working (if applicable)
- [ ] API endpoints responding (if applicable)

### Performance
- [ ] Page load time acceptable
- [ ] Lighthouse score checked
- [ ] Gzip compression working
- [ ] Static assets cached
- [ ] Images optimized

### Security
- [ ] HTTPS enforced
- [ ] Security headers present
- [ ] Rate limiting working
- [ ] No sensitive data exposed
- [ ] Environment variables secured
- [ ] SSL Labs test passed (A+ rating)

### Monitoring
- [ ] Logs accessible
- [ ] Health check endpoint working
- [ ] Resource usage monitored
- [ ] Alerts configured (optional)
- [ ] Backup strategy in place

### Documentation
- [ ] Deployment documented
- [ ] Team members notified
- [ ] Access credentials shared securely
- [ ] Runbook created for common tasks

## Maintenance

### Regular Tasks
- [ ] SSL certificate auto-renewal working
- [ ] Logs rotated
- [ ] Backups automated
- [ ] Security updates scheduled
- [ ] Performance monitoring active

### Testing
- [ ] Deployment tested on staging (if available)
- [ ] Rollback procedure tested
- [ ] Backup restoration tested
- [ ] Disaster recovery plan in place

## Troubleshooting

If issues occur, check:
- [ ] Docker containers running: `docker-compose ps`
- [ ] Application logs: `docker-compose logs -f nextjs`
- [ ] Nginx logs: `docker-compose logs -f nginx`
- [ ] Certificate status: `docker-compose run --rm certbot certificates`
- [ ] Nginx config: `docker-compose exec nginx nginx -t`
- [ ] Disk space: `df -h`
- [ ] Memory usage: `free -m`
- [ ] Network connectivity: `ping yourdomain.com`

## Rollback Plan

If deployment fails:
1. [ ] Stop containers: `docker-compose down`
2. [ ] Restore previous version
3. [ ] Restart services: `docker-compose up -d`
4. [ ] Verify rollback successful
5. [ ] Investigate and fix issues
6. [ ] Document lessons learned

## Sign-off

- [ ] Deployment completed successfully
- [ ] All checks passed
- [ ] Documentation updated
- [ ] Stakeholders notified

**Deployed by:** _______________  
**Date:** _______________  
**Version:** _______________  

---

**Notes:**
