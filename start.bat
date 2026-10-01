@echo off
setlocal
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed. Check Node.js/npm and your network connection.
    pause
    exit /b 1
  )
)
echo.
echo Starting OM Patel portfolio...
echo Keep this window open while using the site.
echo.
call npm run dev -- --host 127.0.0.1
pause
