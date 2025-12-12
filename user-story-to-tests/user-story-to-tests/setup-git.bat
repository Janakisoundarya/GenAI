@echo off
echo ========================================
echo Git Setup and Initial Commit
echo ========================================
echo.

REM Check if git is installed
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed or not in PATH.
    echo Please install Git from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo Git found! Proceeding with setup...
echo.

REM Initialize git repository
echo Step 1: Initializing Git repository...
git init
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to initialize git repository
    pause
    exit /b 1
)
echo Git repository initialized successfully!
echo.

REM Add all files
echo Step 2: Adding files to staging area...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)
echo Files added successfully!
echo.

REM Show status
echo Step 3: Checking status...
git status
echo.

REM Commit
echo Step 4: Creating initial commit...
git commit -m "Initial commit: User Story to Tests Generator with Jira integration"
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to commit
    pause
    exit /b 1
)
echo Commit created successfully!
echo.

REM Add remote
echo Step 5: Adding remote repository...
git remote add origin https://github.com/Janakisoundarya/GenAI.git
if %ERRORLEVEL% NEQ 0 (
    echo Warning: Remote might already exist. Continuing...
    git remote set-url origin https://github.com/Janakisoundarya/GenAI.git
)
echo Remote repository added!
echo.

REM Rename branch to main
echo Step 6: Setting branch to main...
git branch -M main
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Run: git push -u origin main
echo 2. Enter your GitHub credentials when prompted
echo    (Use Personal Access Token, not password)
echo.
echo To generate a Personal Access Token:
echo https://github.com/settings/tokens
echo.
pause

