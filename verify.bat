@echo off
REM Verification Script for Backend API Integration - Windows Version

setlocal enabledelayedexpansion

echo.
echo ============================================
echo Checking Backend API Integration Files...
echo ============================================
echo.

REM Initialize counters
set found=0
set missing=0

REM Check Core Integration Files
echo.
echo [1/3] Checking Core Integration Files...
echo.

if exist "src\utils\api.js" (
    echo [OK] src\utils\api.js
    set /a found+=1
) else (
    echo [MISSING] src\utils\api.js
    set /a missing+=1
)

if exist "src\services\apiService.js" (
    echo [OK] src\services\apiService.js
    set /a found+=1
) else (
    echo [MISSING] src\services\apiService.js
    set /a missing+=1
)

if exist "src\auth\AuthContext.jsx" (
    echo [OK] src\auth\AuthContext.jsx
    set /a found+=1
) else (
    echo [MISSING] src\auth\AuthContext.jsx
    set /a missing+=1
)

if exist "src\component\LoginIntegrated.jsx" (
    echo [OK] src\component\LoginIntegrated.jsx
    set /a found+=1
) else (
    echo [MISSING] src\component\LoginIntegrated.jsx
    set /a missing+=1
)

if exist "src\component\RegisterIntegrated.jsx" (
    echo [OK] src\component\RegisterIntegrated.jsx
    set /a found+=1
) else (
    echo [MISSING] src\component\RegisterIntegrated.jsx
    set /a missing+=1
)

if exist "src\component\UserProfileIntegrated.jsx" (
    echo [OK] src\component\UserProfileIntegrated.jsx
    set /a found+=1
) else (
    echo [MISSING] src\component\UserProfileIntegrated.jsx
    set /a missing+=1
)

if exist "src\component\UsersListIntegrated.jsx" (
    echo [OK] src\component\UsersListIntegrated.jsx
    set /a found+=1
) else (
    echo [MISSING] src\component\UsersListIntegrated.jsx
    set /a missing+=1
)

REM Check Documentation Files
echo.
echo [2/3] Checking Documentation Files...
echo.

if exist "README_INTEGRATION.md" (
    echo [OK] README_INTEGRATION.md
    set /a found+=1
) else (
    echo [MISSING] README_INTEGRATION.md
    set /a missing+=1
)

if exist "SETUP_GUIDE.md" (
    echo [OK] SETUP_GUIDE.md
    set /a found+=1
) else (
    echo [MISSING] SETUP_GUIDE.md
    set /a missing+=1
)

if exist "INTEGRATION_GUIDE.md" (
    echo [OK] INTEGRATION_GUIDE.md
    set /a found+=1
) else (
    echo [MISSING] INTEGRATION_GUIDE.md
    set /a missing+=1
)

if exist "QUICK_REFERENCE.md" (
    echo [OK] QUICK_REFERENCE.md
    set /a found+=1
) else (
    echo [MISSING] QUICK_REFERENCE.md
    set /a missing+=1
)

if exist "CODE_EXAMPLES.md" (
    echo [OK] CODE_EXAMPLES.md
    set /a found+=1
) else (
    echo [MISSING] CODE_EXAMPLES.md
    set /a missing+=1
)

if exist "APP_INTEGRATION_EXAMPLE.jsx" (
    echo [OK] APP_INTEGRATION_EXAMPLE.jsx
    set /a found+=1
) else (
    echo [MISSING] APP_INTEGRATION_EXAMPLE.jsx
    set /a missing+=1
)

if exist "DEPLOYMENT_CHECKLIST.md" (
    echo [OK] DEPLOYMENT_CHECKLIST.md
    set /a found+=1
) else (
    echo [MISSING] DEPLOYMENT_CHECKLIST.md
    set /a missing+=1
)

if exist "SUMMARY.md" (
    echo [OK] SUMMARY.md
    set /a found+=1
) else (
    echo [MISSING] SUMMARY.md
    set /a missing+=1
)

REM Check Configuration
echo.
echo [3/3] Checking Configuration...
echo.

if exist ".env.local" (
    echo [OK] .env.local exists
    set /a found+=1
    echo   Checking content...
    findstr "REACT_APP_API_URL" .env.local >nul
    if errorlevel 1 (
        echo   [WARNING] REACT_APP_API_URL not found in .env.local
    ) else (
        echo   [OK] REACT_APP_API_URL configured
    )
) else (
    echo [WARNING] .env.local not found
    echo   Create with: echo REACT_APP_API_URL=http://localhost:5000/api ^> .env.local
    set /a missing+=1
)

findstr "axios" package.json >nul
if errorlevel 0 (
    echo [OK] axios in package.json
    set /a found+=1
) else (
    echo [MISSING] axios not in package.json
    echo   Run: npm install axios
    set /a missing+=1
)

findstr "react-toastify" package.json >nul
if errorlevel 0 (
    echo [OK] react-toastify in package.json
    set /a found+=1
) else (
    echo [MISSING] react-toastify not in package.json
    echo   Run: npm install react-toastify
    set /a missing+=1
)

REM Summary
echo.
echo ============================================
echo Summary: %found% found, %missing% missing
echo ============================================
echo.

if %missing% equ 0 (
    echo SUCCESS! All integration files are in place.
    echo.
    echo Next steps:
    echo 1. npm install axios react-toastify
    echo 2. Create .env.local if not done yet
    echo 3. Update App.jsx with AuthProvider
    echo 4. Read SETUP_GUIDE.md for detailed instructions
    echo 5. npm run dev
) else (
    echo ERROR: Some files are missing or not configured
    echo.
    echo Please check the missing items above
    echo and refer to README_INTEGRATION.md
)

echo.
pause
