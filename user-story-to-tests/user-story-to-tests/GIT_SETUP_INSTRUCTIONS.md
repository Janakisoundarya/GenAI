# Git Setup and Commit Instructions

## Prerequisites

1. **Install Git** (if not already installed):
   - Download from: https://git-scm.com/download/win
   - Or use winget: `winget install Git.Git`
   - Verify installation: `git --version`

2. **Configure Git** (if first time using Git):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

## Step-by-Step Git Setup and Commit

### Step 1: Initialize Git Repository

Open terminal/PowerShell in the project root directory and run:

```bash
git init
```

This creates a new Git repository in your project folder.

### Step 2: Check Current Status

```bash
git status
```

This shows all files that are not tracked by Git (they should all be untracked initially).

### Step 3: Add Files to Staging Area

Add all files to be committed:

```bash
git add .
```

**OR** add specific files:

```bash
git add README.md
git add .gitignore
git add package.json
# etc.
```

**Note**: `.gitignore` is already configured to exclude:
- `node_modules/` folders
- `.env` files
- Build outputs (`dist/`, `build/`)
- IDE configuration files

### Step 4: Verify What Will Be Committed

```bash
git status
```

You should see all your files listed under "Changes to be committed".

### Step 5: Create Initial Commit

```bash
git commit -m "Initial commit: User Story to Tests Generator with Jira integration"
```

**Alternative commit messages you can use:**
- `"Initial commit: Add full-stack application for test case generation"`
- `"Initial commit: User story to test case generator with AI and Jira"`
- `"feat: Initial commit with Jira integration and AI test generation"`

### Step 6: Add Remote Repository

Link your local repository to GitHub:

```bash
git remote add origin https://github.com/Janakisoundarya/GenAI.git
```

Verify the remote was added:

```bash
git remote -v
```

### Step 7: Push to GitHub

Push your code to the main branch:

```bash
git branch -M main
git push -u origin main
```

**If prompted for authentication:**
- Use your GitHub username
- For password, use a Personal Access Token (not your GitHub password)
  - Generate token: https://github.com/settings/tokens
  - Select scopes: `repo` (full control of private repositories)

### Step 8: Verify on GitHub

Visit https://github.com/Janakisoundarya/GenAI to see your code!

## Quick Reference Commands

```bash
# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# Check remote
git remote -v

# View commit history
git log
```

## Troubleshooting

### If you get "fatal: not a git repository"
- Make sure you're in the project root directory
- Run `git init` first

### If push fails with authentication error
- Make sure you're using a Personal Access Token, not password
- Generate a new token at: https://github.com/settings/tokens

### If you want to update the remote URL
```bash
git remote set-url origin https://github.com/Janakisoundarya/GenAI.git
```

## Next Steps After First Commit

1. Create a `.env.example` file (optional but recommended):
   ```bash
   # .env.example
   PORT=8080
   CORS_ORIGIN=http://localhost:5173
   groq_API_KEY=your_groq_api_key_here
   groq_API_BASE=https://api.groq.com/openai/v1
   groq_MODEL=llama3-8b-8192
   ```

2. Future commits follow the same pattern:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

