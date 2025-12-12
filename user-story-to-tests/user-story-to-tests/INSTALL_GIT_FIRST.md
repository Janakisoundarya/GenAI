# ⚠️ Git Installation Required

## Current Status
Git is **not installed** or **not in PATH** on your system.

## Quick Install Options

### Option 1: Download Installer (Recommended)
1. Go to: https://git-scm.com/download/win
2. Download the latest version
3. Run the installer with default settings
4. **Important**: Make sure "Add Git to PATH" is checked during installation
5. Restart your terminal/PowerShell after installation

### Option 2: Using winget (Windows Package Manager)
If you have winget installed:
```powershell
winget install Git.Git
```

### Option 3: Using Chocolatey
If you have Chocolatey installed:
```powershell
choco install git
```

## After Installation

1. **Restart your terminal/PowerShell**
2. **Verify installation:**
   ```powershell
   git --version
   ```
   You should see something like: `git version 2.x.x`

3. **Configure Git (first time only):**
   ```powershell
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

4. **Run the commit script:**
   ```powershell
   .\commit-to-github.ps1
   ```

## What Happens Next

Once Git is installed, the script will:
- ✅ Initialize Git repository
- ✅ Add all files
- ✅ Create initial commit
- ✅ Configure remote repository
- ✅ Prepare for push to GitHub

Then you'll need to:
- Push to GitHub (requires Personal Access Token)
- Get token from: https://github.com/settings/tokens

---

**Quick Links:**
- Download Git: https://git-scm.com/download/win
- GitHub Token: https://github.com/settings/tokens
- Your Repository: https://github.com/Janakisoundarya/GenAI

