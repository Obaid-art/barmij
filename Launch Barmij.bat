@echo off
title Barmij
cd /d "%~dp0"
where python >nul 2>nul || (echo Python is needed to run Barmij - install it free from python.org & pause & exit /b 1)
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:5025"
python -m http.server 5025 --directory app
