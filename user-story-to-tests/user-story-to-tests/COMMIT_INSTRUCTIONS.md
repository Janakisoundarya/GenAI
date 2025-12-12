# Quick Git Commit Guide

## Prerequisites Check

**First, verify Git is installed:**
```bash
git --version
```

If you see an error, install Git from: https://git-scm.com/download/win

**Configure Git (first time only):**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Method 1: Using the Batch Script (Easiest)

Simply double-click `setup-git.bat` or run in terminal:
```bash
.\setup-git.bat
```

Then manually push:
```bash
git push -u origin main
```

## Method 2: Manual Commands

Copy and paste these commands one by one:

```bash
# 1. Initialize Git
git init

# 2. Add all files
git add .

# 3. Check what will be committed
git status

# 4. Create initial commit
git commit -m "Initial commit: User Story to Tests Generator with Jira integration"

# 5. Add remote repository
git remote add origin https://github.com/Janakisoundarya/GenAI.git

# 6. Rename branch to main
git branch -M main

# 7. Push to GitHub
git push -u origin main
```

## Authentication

When you run `git push`, you'll be prompted for credentials:

1. **Username**: Your GitHub username (Janakisoundarya)
2. **Password**: Use a **Personal Access Token** (NOT your GitHub password)

### Create Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "GenAI Repo Access"
4. Select scopes: ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)
7. Use this token as your password when pushing

## Verify Success

After pushing, visit:
https://github.com/Janakisoundarya/GenAI

You should see all your files there!

## Troubleshooting

### "remote origin already exists"
Run this instead of `git remote add`:
```bash
git remote set-url origin https://github.com/Janakisoundarya/GenAI.git
```

### "Authentication failed"
- Make sure you're using a Personal Access Token, not password
- Token must have `repo` scope

### "Permission denied"
- Check that the repository exists and you have write access
- Verify the repository URL is correct

## What Gets Committed?

The `.gitignore` file ensures these are **NOT** committed:
- ✅ `node_modules/` folders (excluded)
- ✅ `.env` files (excluded - keep your secrets safe!)
- ✅ Build outputs (`dist/`, `build/`)
- ✅ IDE files

Everything else will be committed, including:
- ✅ Source code
- ✅ Configuration files
- ✅ README.md
- ✅ Package.json files

