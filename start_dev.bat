@echo off
echo Starting Link Shortener Platform...

:: Start Backend in a new window
start "LinkShortener Backend" cmd /k "cd backend && python -m uvicorn main:app --reload"

:: Start Frontend in a new window
start "LinkShortener Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo Servers are starting...
echo Backend will be at: http://localhost:8000
echo Frontend will be at: http://localhost:5173
echo.
pause
