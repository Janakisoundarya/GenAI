# PowerShell script to commit and push to GitHub
# Run this script after Git is installed

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Git Commit and Push to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is available
$gitCheck = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCheck) {
    Write-Host "ERROR: Git is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "After installing Git, restart your terminal and run this script again." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Git found! Version: $($gitCheck.Version)" -ForegroundColor Green
Write-Host ""

# Check if already a git repository
if (Test-Path .git) {
    Write-Host "Git repository already initialized." -ForegroundColor Green
} else {
    Write-Host "Step 1: Initializing Git repository..." -ForegroundColor Yellow
    git init
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to initialize git repository" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
    Write-Host ""
}

# Add all files
Write-Host "Step 2: Adding files to staging area..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to add files" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Files added" -ForegroundColor Green
Write-Host ""

# Show status
Write-Host "Step 3: Checking status..." -ForegroundColor Yellow
git status --short
Write-Host ""

# Commit
Write-Host "Step 4: Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: User Story to Tests Generator with Jira integration"
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to commit. Maybe no changes to commit?" -ForegroundColor Red
    git status
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Commit created successfully" -ForegroundColor Green
Write-Host ""

# Check if remote exists
Write-Host "Step 5: Configuring remote repository..." -ForegroundColor Yellow
$remoteExists = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Remote 'origin' already exists. Updating URL..." -ForegroundColor Yellow
    git remote set-url origin https://github.com/Janakisoundarya/GenAI.git
} else {
    git remote add origin https://github.com/Janakisoundarya/GenAI.git
}
Write-Host "✓ Remote repository configured" -ForegroundColor Green
Write-Host ""

# Rename branch to main
Write-Host "Step 6: Setting branch to main..." -ForegroundColor Yellow
git branch -M main 2>$null
Write-Host "✓ Branch set to main" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next step: Push to GitHub" -ForegroundColor Yellow
Write-Host ""
Write-Host "Run this command to push:" -ForegroundColor Cyan
Write-Host "  git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "When prompted:" -ForegroundColor Yellow
Write-Host "  Username: Janakisoundarya" -ForegroundColor White
Write-Host "  Password: Use a Personal Access Token (NOT your GitHub password)" -ForegroundColor White
Write-Host ""
Write-Host "Create token at: https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host "  Select scope: repo (Full control of private repositories)" -ForegroundColor White
Write-Host ""
Write-Host "Would you like to push now? (Y/N)" -ForegroundColor Yellow
$response = Read-Host

if ($response -eq 'Y' -or $response -eq 'y') {
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git push -u origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host "View your repository at: https://github.com/Janakisoundarya/GenAI" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "Push failed. Please check your credentials and try again." -ForegroundColor Red
    }
} else {
    Write-Host ""
    Write-Host "You can push later by running: git push -u origin main" -ForegroundColor Cyan
}

Write-Host ""
Read-Host "Press Enter to exit"

