# 🚀 VUNA Calculator — Complete CI/CD Pipeline Setup Guide
### For Set 2025/26 Software Engineering — Assignment Defence

---

## 🗺️ What We're Building (The Big Picture)

Your lecturer wants to see this whole chain working automatically:

```
You edit code → Push to GitHub → GitHub runs tests automatically
→ Builds a Docker image → Pushes to Docker Hub
→ SSHes into your VPS → Deploys live on your subdomain
```

All of this happens **automatically** every time you push code. That is the CI/CD pipeline.

---

## ✅ The 7 Things Your Lecturer Will Check

| # | What | Where It Comes From |
|---|------|---------------------|
| 1 | Calculator app on your laptop | `npm start` → opens at `localhost:3000` |
| 2 | Calculator in your GitHub repo | All files pushed to GitHub |
| 3 | GitHub Actions setup | `.github/workflows/ci-cd.yml` file |
| 4 | Your Dockerfile | `Dockerfile` in your repo |
| 5 | Your Docker Hub account | hub.docker.com — image pushed there |
| 6 | Subdomain on your VPS | Created in CyberPanel |
| 7 | Real-time changes when you push | The full pipeline working end-to-end |

---

## 📋 Accounts You Need (Create These First)

1. **GitHub** — github.com (free) — stores your code
2. **Docker Hub** — hub.docker.com (free) — stores your Docker images
3. **CyberPanel VPS** — you said you already have this ✅

---

## 🛠️ PHASE 1: Set Up Your Laptop

### Step 1 — Install Node.js
1. Go to **nodejs.org**
2. Download the **LTS version** (the one that says "Recommended for most users")
3. Install it like a normal program
4. Open your terminal/Command Prompt and check:
   ```bash
   node --version
   # Should show: v20.x.x or similar
   
   npm --version
   # Should show: 10.x.x or similar
   ```

### Step 2 — Install Git
1. Go to **git-scm.com/downloads**
2. Download and install Git for your system
3. After installing, configure it (replace with your name and email):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

### Step 3 — Install Docker Desktop
1. Go to **docker.com/products/docker-desktop**
2. Download Docker Desktop for your system (Windows/Mac)
3. Install it and **start it** — you'll see the Docker whale icon in your taskbar
4. Check:
   ```bash
   docker --version
   # Should show: Docker version 24.x.x or similar
   ```

---

## 📁 PHASE 2: Set Up Your Calculator Project

### Step 4 — Create the Project Folder
Open your terminal and run these commands one by one:

```bash
# Create a new folder for your project
mkdir vuna-calculator
cd vuna-calculator

# Create the subfolders you need
mkdir -p assets/css assets/js tests .github/workflows
```

### Step 5 — Copy the Project Files
Copy all the files from this guide's file package into your `vuna-calculator` folder.

Your folder structure should look like this:
```
vuna-calculator/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          ← The pipeline (DO NOT RENAME)
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── script.js
├── tests/
│   └── app.test.js
├── index.html
├── server.js
├── package.json
├── Dockerfile
├── .dockerignore
└── .gitignore
```

### Step 6 — Install Dependencies
In your terminal (make sure you're inside the `vuna-calculator` folder):

```bash
npm install
```

This installs Express.js, Jest, and Supertest into a `node_modules` folder.
(This will take about 30–60 seconds)

### Step 7 — Test the App on Your Laptop
```bash
npm start
```

Then open your browser and go to: **http://localhost:3000**

You should see your calculator! This is what your lecturer wants to see
for point #1 (Calculator app on your laptop).

To stop the server: press `Ctrl + C` in the terminal.

### Step 8 — Run the Tests
```bash
npm test
```

You should see something like:
```
PASS tests/app.test.js
  VUNA Calculator Server
    ✓ should load the calculator homepage (status 200)
    ✓ should return health status "ok"
    ✓ should return app name in health response
    ✓ should return 404 for unknown pages

Tests: 4 passed
```

**All 4 tests must pass before you continue.** ✅

### Step 9 — Test Docker Locally
```bash
# Build the Docker image
docker build -t vuna-calculator:local .

# Run the container
docker run -p 3000:3000 --name test-calc vuna-calculator:local
```

Open **http://localhost:3000** — the calculator should work inside Docker.

Stop and remove the test container:
```bash
docker stop test-calc && docker rm test-calc
```

---

## 🐙 PHASE 3: GitHub Setup

### Step 10 — Create a GitHub Account
If you don't have one, go to **github.com** and sign up (it's free).

### Step 11 — Create a GitHub Repository
1. Log into GitHub
2. Click the **"+"** icon at the top right → **"New repository"**
3. Set:
   - **Repository name:** `vuna-calculator`
   - **Visibility:** Public (so your lecturer can see it)
   - **DO NOT** check "Add a README file" (you already have files)
4. Click **"Create repository"**

### Step 12 — Push Your Code to GitHub
In your terminal (inside the `vuna-calculator` folder):

```bash
# Initialize git
git init

# Stage all files
git add .

# Make your first commit
git commit -m "feat: VUNA Calculator with CI/CD pipeline"

# Connect to your GitHub repo (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/vuna-calculator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

You'll be asked to log in to GitHub. Use your GitHub username and password
(or a personal access token if you have 2FA enabled).

After this, refresh your GitHub repo page — you should see all your files! ✅

---

## 🐳 PHASE 4: Docker Hub Setup

### Step 13 — Create a Docker Hub Account
1. Go to **hub.docker.com** and click **"Sign Up"** (it's free)
2. Choose a username — **remember this**, you'll need it later
   (e.g., your name or initials, like `johndoe23`)

### Step 14 — Create a Docker Hub Repository
1. After logging in, click **"Create Repository"**
2. Set:
   - **Repository name:** `vuna-calculator`
   - **Visibility:** Public
3. Click **"Create"**

You now have a Docker Hub repo at: `hub.docker.com/r/YOUR_USERNAME/vuna-calculator`

### Step 15 — Create a Docker Hub Access Token
This is like a password for GitHub to log in to Docker Hub on your behalf.

1. In Docker Hub, click your profile picture (top right) → **"Account Settings"**
2. Click **"Security"** in the left menu
3. Click **"New Access Token"**
4. Give it a name: `github-actions`
5. Set permissions: **Read, Write, Delete**
6. Click **"Generate"**
7. **COPY THE TOKEN NOW** — you won't see it again!
   It looks like: `dckr_pat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 🖥️ PHASE 5: Set Up Your VPS (CyberPanel)

### Step 16 — Log Into Your CyberPanel
1. Open your browser and go to: `https://YOUR_VPS_IP:8090`
   (Replace `YOUR_VPS_IP` with your server's IP address)
2. Log in with your CyberPanel admin credentials

### Step 17 — Install Docker on Your VPS
SSH into your VPS first. You need a terminal on your laptop:
- **Windows:** Use PuTTY or Windows Terminal
- **Mac/Linux:** Open Terminal

Connect to your VPS:
```bash
ssh root@YOUR_VPS_IP
```

Once connected, install Docker:
```bash
# Download and install Docker automatically
curl -fsSL https://get.docker.com | sh

# Verify Docker is installed
docker --version

# Test Docker works
docker run --rm hello-world
```

You should see "Hello from Docker!" at the end — Docker is working ✅

### Step 18 — Create a "Deploy" User on Your VPS
Never use `root` for automatic deployments (it's a security risk).
Create a dedicated deploy user:

```bash
# Create the deploy user
useradd -m -s /bin/bash deploy

# Add deploy user to the docker group (so it can run docker commands)
usermod -aG docker deploy

# Create the app directory
mkdir -p /opt/vuna-calculator
chown deploy:deploy /opt/vuna-calculator

# Set a password for deploy user (choose something secure)
passwd deploy
```

### Step 19 — Create a Subdomain in CyberPanel
Your lecturer wants to see point #6: your subdomain.

1. In CyberPanel, go to **"Websites"** → **"Create Website"**
2. Fill in:
   - **Domain:** `calculator.yourdomain.com`
     (Use your actual domain — or if you don't have one,
      use your VPS IP address directly)
   - **Email:** your email
   - **PHP Version:** doesn't matter (we won't use PHP)
   - **SSL:** Yes (tick this for HTTPS)
3. Click **"Create Website"**

### Step 20 — Configure Reverse Proxy in CyberPanel
Your subdomain needs to forward traffic to your Docker container on port 3000.

**Option A — Through CyberPanel UI (Recommended):**
1. In CyberPanel, go to **"Websites"** → **"List Websites"**
2. Click on your website/subdomain
3. Look for **"Rewrite Rules"** or **"Proxy"** or **"Config"**
4. Add this proxy configuration:

In the vHost config, add:
```
extprocessor nodejs_backend {
  type                proxy
  address             localhost:3000
  maxConns            100
  pcKeepAliveTimeout  60
  initTimeout         60
  retryTimeout        0
  respBuffer          0
}

context / {
  type                proxy
  handler             nodejs_backend
  addDefaultCharset   off
}
```

**Option B — Through SSH (if Option A is not available):**
```bash
# Find your OpenLiteSpeed vhost config file
ls /usr/local/lsws/conf/vhosts/

# Edit the config for your subdomain
# (replace "calculator.yourdomain.com" with your actual subdomain folder name)
nano /usr/local/lsws/conf/vhosts/calculator.yourdomain.com/vhconf.conf
```

Add this at the end of the file before the closing tag:
```
extProcessor nodejs_backend{
  type proxy
  address localhost:3000
}

context /{
  type proxy
  handler nodejs_backend
  addDefaultCharset off
}
```

Then restart OpenLiteSpeed:
```bash
/usr/local/lsws/bin/lswsctrl restart
```

---

## 🔑 PHASE 6: Generate SSH Key & Add Secrets to GitHub

This is how GitHub Actions will securely log into your VPS to deploy.

### Step 21 — Generate an SSH Key Pair

On your **laptop** (not the VPS), open your terminal:

```bash
# Generate a new SSH key pair specifically for GitHub Actions
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy_key -N ""
```

This creates two files:
- `~/.ssh/github_deploy_key` — the **private key** (stays on your laptop & goes to GitHub)
- `~/.ssh/github_deploy_key.pub` — the **public key** (goes to your VPS)

### Step 22 — Copy the Public Key to Your VPS

```bash
# Show the public key (copy all of this output)
cat ~/.ssh/github_deploy_key.pub
```

Now SSH into your VPS and add it:
```bash
ssh root@YOUR_VPS_IP

# Create the SSH authorized_keys file for the deploy user
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh

# Paste the public key (replace everything in quotes with your actual public key)
echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> /home/deploy/.ssh/authorized_keys

chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
```

Test that it works (run this on your **laptop**):
```bash
ssh -i ~/.ssh/github_deploy_key deploy@YOUR_VPS_IP "echo SSH works!"
```

If you see "SSH works!" — you're connected ✅

### Step 23 — View Your Private Key
On your laptop:
```bash
cat ~/.ssh/github_deploy_key
```

Copy the ENTIRE output, including the lines:
```
-----BEGIN OPENSSH PRIVATE KEY-----
...all the letters and numbers...
-----END OPENSSH PRIVATE KEY-----
```

### Step 24 — Add All 5 Secrets to GitHub

Go to your GitHub repository → **"Settings"** → **"Secrets and variables"** → **"Actions"** → **"New repository secret"**

Add these 5 secrets one by one:

| Secret Name | What to Put In It |
|-------------|-------------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username (e.g., `johndoe23`) |
| `DOCKERHUB_TOKEN` | The Docker Hub access token from Step 15 |
| `SERVER_HOST` | Your VPS IP address (e.g., `192.168.1.100`) |
| `SERVER_USER` | `deploy` (the user we created in Step 18) |
| `SERVER_SSH_KEY` | The entire private key from Step 23 |
| `SERVER_PORT` | `22` (this is the standard SSH port) |

After adding all 6, you should see them listed in Settings → Secrets → Actions.

---

## 🧪 PHASE 7: Test Your Complete Pipeline

### Step 25 — Trigger the Pipeline
Make a small change to your code to trigger the pipeline:

```bash
# Open index.html in your editor and make a tiny change
# (e.g., change "VUNA CALCULATOR" to "VUNA CALCULATOR ✨")
# Then save the file

# Push to GitHub
git add .
git commit -m "test: trigger CI/CD pipeline"
git push
```

### Step 26 — Watch It Run on GitHub
1. Go to your GitHub repository
2. Click the **"Actions"** tab
3. You'll see your pipeline running — click on it to watch in real time
4. You'll see 3 jobs:
   - **Run Tests** → should go green ✅
   - **Build & Push Docker Image** → should go green ✅
   - **Deploy to VPS** → should go green ✅

### Step 27 — Verify the Live Site
After the pipeline completes (about 3–5 minutes):

1. Open your browser and go to: `http://calculator.yourdomain.com`
   (or `http://YOUR_VPS_IP:3000` if you don't have a custom domain)
2. You should see your calculator live! ✅

This demonstrates point #7: real-time reflection of changes.

---

## 🛡️ What to Do If Something Goes Wrong

### Tests fail on GitHub Actions
- Check the error message in the Actions tab
- Make sure `npm test` passes on your laptop first

### Docker build fails
- Check the Dockerfile syntax
- Make sure `docker build -t test .` works on your laptop

### SSH connection fails
- Verify the deploy user and SSH key are set up correctly (Step 22)
- Check that `ssh -i ~/.ssh/github_deploy_key deploy@YOUR_VPS_IP "echo test"` works

### Calculator not showing on subdomain
- Check that Docker container is running on VPS: `docker ps`
- Check the reverse proxy config in CyberPanel (Step 20)
- Try accessing directly via `http://YOUR_VPS_IP:3000` first

---

## ✅ Final Defence Checklist

Go through this before your defence date (Friday 29th May 2026):

- [ ] `npm start` on laptop → calculator opens at `localhost:3000`
- [ ] `npm test` passes all 4 tests
- [ ] `docker build` and `docker run` work locally
- [ ] All files pushed to GitHub — repo is public
- [ ] GitHub Actions tab shows green checkmarks
- [ ] `.github/workflows/ci-cd.yml` is visible in GitHub repo
- [ ] `Dockerfile` is visible in GitHub repo
- [ ] Docker Hub account has `vuna-calculator` image
- [ ] Subdomain created in CyberPanel
- [ ] `http://calculator.yourdomain.com` shows the calculator live
- [ ] Make a change, push to GitHub, wait 5 mins → change appears on live site (this is the real-time demo!)

---

## 📱 Quick Reference — Commands You'll Use Often

```bash
# Start app locally
npm start

# Run tests
npm test

# Build Docker image locally
docker build -t vuna-calculator:local .

# Run Docker container locally
docker run -p 3000:3000 vuna-calculator:local

# Push changes to trigger pipeline
git add .
git commit -m "your message here"
git push

# Check running containers on VPS (run after SSHing in)
docker ps

# Check container logs on VPS
docker logs vuna-calculator
```

---

*Good luck with your defence! Remember: the key demonstration is showing that
a push to GitHub automatically updates your live website. Practice this once
before the defence day so it feels natural.*
