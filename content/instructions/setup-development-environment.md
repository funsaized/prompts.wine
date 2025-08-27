---
title: "Development Environment Setup"
description: "Complete guide for setting up a modern development environment"
category: "instructions"
tags: ["instructions", "setup", "development", "environment"]
author: "DevOps Team"
date: "2024-01-27"
---

# Development Environment Setup

A comprehensive guide for setting up a modern development environment with all necessary tools and configurations.

## Prerequisites

Before starting, ensure you have:
- Administrative access to your machine
- Stable internet connection
- At least 8GB RAM and 50GB free disk space

## Step 1: Install Core Tools

### Package Manager
**macOS:**
```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add to PATH
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**Windows:**
```powershell
# Install Chocolatey (Run as Administrator)
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

**Linux (Ubuntu/Debian):**
```bash
# Update package manager
sudo apt update && sudo apt upgrade -y
```

### Git Configuration
```bash
# Install Git
# macOS: brew install git
# Windows: choco install git
# Linux: sudo apt install git

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main

# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Display public key (add to GitHub/GitLab)
cat ~/.ssh/id_ed25519.pub
```

## Step 2: Install Development Environment

### Node.js and Package Managers
```bash
# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install latest LTS Node.js
nvm install --lts
nvm use --lts
nvm alias default node

# Install package managers
npm install -g pnpm yarn

# Verify installation
node --version
npm --version
pnpm --version
yarn --version
```

### Python Development
```bash
# macOS: brew install python3
# Windows: choco install python3
# Linux: sudo apt install python3 python3-pip

# Install Python package manager
pip3 install --upgrade pip

# Install virtual environment tools
pip3 install virtualenv pipenv

# Verify installation
python3 --version
pip3 --version
```

### Docker and Container Tools
```bash
# Install Docker Desktop
# macOS: brew install --cask docker
# Windows: choco install docker-desktop
# Linux: Follow official Docker installation guide

# Install Docker Compose
# macOS/Windows: Included with Docker Desktop
# Linux: 
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

## Step 3: Code Editors and IDE Setup

### Visual Studio Code
```bash
# Install VS Code
# macOS: brew install --cask visual-studio-code
# Windows: choco install vscode
# Linux: snap install --classic code

# Install essential extensions
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-eslint
code --install-extension ms-python.python
code --install-extension ms-vscode.docker
```

### VS Code Configuration
Create `.vscode/settings.json` in your projects:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/dist": true,
    "**/build": true
  }
}
```

## Step 4: Terminal and Shell Setup

### Zsh with Oh My Zsh (Recommended)
```bash
# Install Zsh
# macOS: Already installed
# Windows: Use WSL2
# Linux: sudo apt install zsh

# Install Oh My Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Install useful plugins
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Update ~/.zshrc
plugins=(git node npm docker zsh-syntax-highlighting zsh-autosuggestions)
```

### Terminal Multiplexer (tmux)
```bash
# Install tmux
# macOS: brew install tmux
# Windows: Use WSL2
# Linux: sudo apt install tmux

# Create ~/.tmux.conf
cat > ~/.tmux.conf << 'EOF'
# Set prefix to Ctrl-a
set -g prefix C-a
unbind C-b

# Enable mouse mode
set -g mouse on

# Start windows and panes at 1
set -g base-index 1
setw -g pane-base-index 1

# Split panes using | and -
bind | split-window -h
bind - split-window -v
EOF
```

## Step 5: Database Tools

### PostgreSQL
```bash
# Install PostgreSQL
# macOS: brew install postgresql
# Windows: choco install postgresql
# Linux: sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
# macOS: brew services start postgresql
# Windows: Services -> PostgreSQL
# Linux: sudo systemctl start postgresql

# Create database user
createuser --interactive --pwprompt
```

### Database GUI Tools
```bash
# Install database management tools
# macOS: brew install --cask pgadmin4
# Windows: choco install pgadmin4
# Linux: Follow official installation guide

# Alternative: Install DBeaver
# macOS: brew install --cask dbeaver-community
# Windows: choco install dbeaver
```

## Step 6: Cloud and DevOps Tools

### AWS CLI
```bash
# Install AWS CLI
# macOS: brew install awscli
# Windows: choco install awscli
# Linux: pip3 install awscli

# Configure AWS CLI
aws configure
```

### Kubernetes Tools
```bash
# Install kubectl
# macOS: brew install kubectl
# Windows: choco install kubernetes-cli
# Linux: Follow official installation guide

# Install k9s (Kubernetes dashboard)
# macOS: brew install k9s
# Windows: choco install k9s
# Linux: Follow GitHub releases
```

## Step 7: Environment Configuration

### Environment Variables
Create `~/.env.local` for project-specific variables:
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/myapp"

# API Keys
OPENAI_API_KEY="your-openai-key"
GITHUB_TOKEN="your-github-token"

# Application
NODE_ENV="development"
PORT="3000"
```

### SSH Configuration
Create `~/.ssh/config`:
```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519

Host production-server
  HostName your-server.com
  User deploy
  IdentityFile ~/.ssh/production_key
  Port 22
```

## Step 8: Verification and Testing

### System Health Check
```bash
#!/bin/bash
echo "🔧 Development Environment Health Check"
echo "========================================"

# Check core tools
echo "Git: $(git --version)"
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "Python: $(python3 --version)"
echo "Docker: $(docker --version)"

# Check database
echo "PostgreSQL: $(psql --version)"

# Check cloud tools
echo "AWS CLI: $(aws --version)"
echo "kubectl: $(kubectl version --client)"

echo "✅ Environment setup complete!"
```

## Troubleshooting

### Common Issues

**Permission Errors:**
```bash
# Fix npm permission issues
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

**Port Conflicts:**
```bash
# Check what's using a port
lsof -i :3000

# Kill process using port
kill -9 $(lsof -t -i:3000)
```

**Docker Issues:**
```bash
# Reset Docker
docker system prune -a --volumes

# Restart Docker service
# macOS/Windows: Restart Docker Desktop
# Linux: sudo systemctl restart docker
```

## Next Steps

After completing this setup:
1. Clone your first project repository
2. Run project-specific setup scripts
3. Configure IDE workspace settings
4. Set up project-specific environment variables
5. Install project dependencies
6. Run tests to verify everything works

## Maintenance

### Weekly Tasks
- Update package managers: `brew update && brew upgrade`
- Update Node.js: `nvm install node --reinstall-packages-from=node`
- Update global packages: `npm update -g`

### Monthly Tasks
- Update OS and security patches
- Clean Docker images: `docker system prune`
- Backup SSH keys and configuration files
- Review and update development tools