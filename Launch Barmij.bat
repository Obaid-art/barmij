@echo off
title Barmij
cd /d "%~dp0"
start "" http://localhost:5025
python -m http.server 5025 --directory app
