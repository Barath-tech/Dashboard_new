@echo off
echo Starting Dashboard Backend and Frontend...
echo.
echo Step 1: Installing backend dependencies...
cd backend
pip install fastapi uvicorn python-multipart -q
echo Backend dependencies installed.
cd ..

echo.
echo Step 2: Installing frontend dependencies...
cd dashboard-ui
if not exist node_modules (
    pnpm install -q
)
cd ..

echo.
echo ============================================
echo Dashboard Setup Complete!
echo ============================================
echo.
echo To start the application:
echo.
echo Terminal 1 (Backend):
echo   cd backend
echo   uvicorn app:app --reload --host 0.0.0.0 --port 8000
echo.
echo Terminal 2 (Frontend):
echo   cd dashboard-ui
echo   pnpm dev
echo.
echo Then open: http://localhost:3000
echo.
pause
