@echo off
title ChotaPlay Word World Launcher
echo ========================================================
echo   Launching ChotaPlay Word World Educational Game Suite
echo ========================================================
echo.
start "" "http://localhost:3000/"
start "" "%~dp0index.html"
echo Game opened in your browser!
echo Press any key to exit this launcher window.
pause >nul
