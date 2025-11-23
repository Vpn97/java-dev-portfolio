# Deployment Fix Guide

## Issue: Missing nginx/conf.d/default.conf

If you get this error during deployment:
```
sed: can't read nginx/conf.d/default.conf: No such file or directory
```

This means the nginx configuration files weren't pushed to Git.

---

## ✅ Solution

### Step 1: Update .gitignore (Already Done)

The `.gitignore` has been updated to include nginx config files.

### Step 2: Commit and Push the Files

On your **local Windows machine**, run:

```powershell
# Check what files will be added
git status

# Add all files
git add .

# Commit
git commit -m "Add nginx configuration and deployment files"

# Push to GitHub
git push origin main
```

### Step 3: Pull on Server

On your **EC2 server**, run:

```bash
# Pull the latest changes
git pull origin main

# Verify nginx config exists
ls -la nginx/conf.d/default.conf

# Now run deployment again
./deploy.sh
```

---

## 📋 Files That Should Be in Git

Make sure these files exist in your repository:

### Nginx Configuration
- ✅ `nginx/nginx.conf`
- ✅ `nginx/conf.d/default.conf`
- ✅ `nginx/logs/.gitkeep`

### Docker Files
- ✅ `Dockerfile`
- ✅ `docker-compose.yml`
- ✅ `docker-compose.dev.yml`
- ✅ `docker-compose.prod.yml`
- ✅ `.dockerignore`

### Scripts
- ✅ `deploy.sh`
- ✅ `init-ssl.sh`
- ✅ `init-ssl-self-signed.sh`
- ✅ `monitor.sh`

### Directories (with .gitkeep)
- ✅ `certbot/conf/.gitkeep`
- ✅ `certbot/www/.gitkeep`
- ✅ `nginx/logs/.gitkeep`

---

## 🔍 Verify Before Pushing

```powershell
# Check if nginx config exists locally
Test-Path nginx\conf.d\default.conf

# Should return: True
```

If it returns `False`, the file is missing. Check the `nginx/` directory.

---

## 🚀 Quick Commands

### On Local Machine (Windows):
```powershell
# Add all files
git add .

# Commit
git commit -m "Add nginx config and deployment files"

# Push
git push origin main
```

### On EC2 Server (Linux):
```bash
# Pull latest
git pull origin main

# Verify files
ls -la nginx/conf.d/
ls -la nginx/nginx.conf

# Run deployment
./deploy.sh
```

---

## ✅ After Fix

Once you've pushed and pulled, you should see:

```bash
[ec2-user@ip-172-31-11-168 java-dev-portfolio]$ ls -la nginx/conf.d/
total 8
drwxr-xr-x 2 ec2-user ec2-user   30 Nov 23 10:00 .
drwxr-xr-x 4 ec2-user ec2-user   40 Nov 23 10:00 ..
-rw-r--r-- 1 ec2-user ec2-user 4567 Nov 23 10:00 default.conf
```

Then deployment will work! 🎉

---

## 🆘 Still Having Issues?

1. **Check Git status:**
   ```bash
   git status
   ```

2. **Force add nginx files:**
   ```bash
   git add -f nginx/
   ```

3. **Verify .gitignore:**
   ```bash
   cat .gitignore | grep nginx
   ```

Should show:
```
nginx/logs/*
!nginx/logs/.gitkeep
```

NOT:
```
nginx/  # This would exclude everything!
```

---

**Last Updated:** 2025-11-23
