# 🚀 Step-by-Step Guide: Commit Code to GitHub

Follow these steps in order. Each step has clear instructions.

---

## 📋 STEP 1: Check if Git is Installed

Open PowerShell or Command Prompt and type:
```powershell
git --version
```

**If you see a version number** (like `git version 2.42.0`):
- ✅ Git is installed! Skip to STEP 3.

**If you see an error** (like "git is not recognized"):
- ❌ Git is NOT installed. Go to STEP 2.

---

## 🔧 STEP 2: Install Git

### Option A: Download and Install (Recommended)

1. **Open your web browser**
2. **Go to:** https://git-scm.com/download/win
3. **Click the download button** (it will download automatically)
4. **Run the downloaded installer** (e.g., `Git-2.42.0-64-bit.exe`)
5. **In the installer:**
   - Click "Next" through the setup wizard
   - **IMPORTANT:** On the "Select Components" page, make sure these are checked:
     - ✅ Git Bash Here
     - ✅ Git GUI Here
     - ✅ Associate .git* configuration files with the default text editor
   - Continue clicking "Next"
   - On "Choosing the default editor", you can leave it as "Use Visual Studio Code" or choose your preference
   - On "Adjusting your PATH environment", select:
     - ✅ **"Git from the command line and also from 3rd-party software"** (RECOMMENDED)
   - Continue with defaults for remaining steps
   - Click "Install"
6. **Wait for installation to complete**
7. **Close and restart your PowerShell/Command Prompt**

### Option B: Using Windows Package Manager (if you have winget)

Open PowerShell as Administrator and run:
```powershell
winget install Git.Git
```

Then restart your terminal.

---

## ✅ STEP 3: Verify Git Installation

1. **Open a NEW PowerShell window** (important: restart it!)
2. **Type:**
   ```powershell
   git --version
   ```
3. **You should see:** `git version 2.x.x` (or similar)

If you still see an error, restart your computer and try again.

---

## ⚙️ STEP 4: Configure Git (First Time Only)

Run these two commands (replace with your actual name and email):

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Example:**
```powershell
git config --global user.name "Janaki Soundarya"
git config --global user.email "janaki@example.com"
```

**Verify it worked:**
```powershell
git config --global user.name
git config --global user.email
```

You should see the values you just set.

---

## 📁 STEP 5: Navigate to Your Project Folder

Open PowerShell and type:

```powershell
cd "C:\Users\janak\GenAI\user-story-to-tests\user-story-to-tests"
```

Press Enter. You should now be in your project folder.

**Verify you're in the right place:**
```powershell
pwd
```

You should see: `C:\Users\janak\GenAI\user-story-to-tests\user-story-to-tests`

---

## 🔐 STEP 6: Create GitHub Personal Access Token

**You'll need this to push code to GitHub!**

1. **Open your web browser**
2. **Go to:** https://github.com/settings/tokens
3. **Click:** "Generate new token" → "Generate new token (classic)"
4. **Note:** You may need to enter your GitHub password
5. **Fill in the form:**
   - **Note:** `GenAI Repo Access` (or any name you want)
   - **Expiration:** Choose your preference (90 days, or No expiration for convenience)
   - **Select scopes:** Scroll down and check:
     - ✅ **repo** (Full control of private repositories)
       - This will automatically check: repo:status, repo_deployment, public_repo, repo:invite, security_events
6. **Scroll to bottom and click:** "Generate token"
7. **IMPORTANT:** Copy the token immediately! It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - ⚠️ **You won't be able to see it again!** Save it somewhere safe.
8. **Keep this token open** - you'll need it in STEP 10

---

## 📝 STEP 7: Initialize Git Repository

In PowerShell (make sure you're in your project folder from STEP 5), type:

```powershell
git init
```

**Expected output:** `Initialized empty Git repository in C:\Users\janak\GenAI\user-story-to-tests\user-story-to-tests\.git`

---

## ➕ STEP 8: Add Files to Staging

Type:
```powershell
git add .
```

This adds all files (respecting .gitignore, so node_modules and .env won't be added).

**Verify files were added:**
```powershell
git status
```

You should see a list of files under "Changes to be committed".

---

## 💾 STEP 9: Create Initial Commit

Type:
```powershell
git commit -m "Initial commit: User Story to Tests Generator with Jira integration"
```

**Expected output:** You'll see something like:
```
[main (root-commit) xxxxxxx] Initial commit: User Story to Tests Generator with Jira integration
 X files changed, Y insertions(+)
```

---

## 🔗 STEP 10: Connect to GitHub Repository

Type:
```powershell
git remote add origin https://github.com/Janakisoundarya/GenAI.git
```

**If you get an error saying "remote origin already exists", run this instead:**
```powershell
git remote set-url origin https://github.com/Janakisoundarya/GenAI.git
```

**Verify it worked:**
```powershell
git remote -v
```

You should see:
```
origin  https://github.com/Janakisoundarya/GenAI.git (fetch)
origin  https://github.com/Janakisoundarya/GenAI.git (push)
```

---

## 🌿 STEP 11: Rename Branch to Main

Type:
```powershell
git branch -M main
```

This ensures your branch is named "main" (GitHub's default).

---

## 🚀 STEP 12: Push to GitHub

Type:
```powershell
git push -u origin main
```

**You'll be prompted for credentials:**

1. **Username:** Type `Janakisoundarya` and press Enter
2. **Password:** 
   - **DO NOT use your GitHub password!**
   - **Use the Personal Access Token** you created in STEP 6
   - Paste the token (it starts with `ghp_`) and press Enter

**Note:** When you type the token, you won't see anything appear (this is normal for security).

**Expected output:**
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), done.
To https://github.com/Janakisoundarya/GenAI.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## ✅ STEP 13: Verify Success

1. **Open your web browser**
2. **Go to:** https://github.com/Janakisoundarya/GenAI
3. **You should see:**
   - ✅ All your project files
   - ✅ README.md displayed
   - ✅ Commit message: "Initial commit: User Story to Tests Generator with Jira integration"

**🎉 Congratulations! Your code is now on GitHub!**

---

## 🆘 Troubleshooting

### Problem: "git is not recognized" after installation
**Solution:**
- Restart your computer
- Or manually add Git to PATH:
  - Search "Environment Variables" in Windows
  - Edit PATH variable
  - Add: `C:\Program Files\Git\cmd`

### Problem: "Authentication failed" when pushing
**Solution:**
- Make sure you're using the Personal Access Token, NOT your GitHub password
- Verify the token has `repo` scope selected
- Try creating a new token if the old one doesn't work

### Problem: "remote origin already exists"
**Solution:**
- Run: `git remote set-url origin https://github.com/Janakisoundarya/GenAI.git`
- Then continue with STEP 11

### Problem: "nothing to commit"
**Solution:**
- Check if files exist: `dir` (or `ls` in PowerShell)
- Make sure you're in the right directory
- Try: `git add .` again

---

## 📞 Need Help?

If you get stuck at any step, let me know which step you're on and what error message you see!

