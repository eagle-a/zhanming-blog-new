@echo off
reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1 /f >nul 2>&1
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion

set "RED=[31m"
set "GREEN=[32m"
set "YELLOW=[33m"
set "BLUE=[34m"
set "RESET=[0m"

set "base_commit_msg=eagle-a"

set "year="
set "month="
set "day="
set "hour="
set "minute="
set "second="

for /f "tokens=1-3 delims=/ " %%a in ("%date%") do (
    if %%a gtr 12 (
        set "day=%%a"
        set "month=%%b"
        set "year=%%c"
    ) else (
        set "month=%%a"
        set "day=%%b"
        set "year=%%c"
    )
)

for /f "tokens=1-3 delims=:. " %%a in ("%time%") do (
    set "hour=%%a"
    set "minute=%%b"
    set "second=%%c"
)

if !month! lss 10 set "month=0!month!"
if !day! lss 10 set "day=0!day!"
if !hour! lss 10 set "hour=0!hour!"

set "commit_msg=!base_commit_msg! - !year!-!month!-!day! !hour!:!minute!:!second!"

echo ======================
echo Starting Git Push...
echo Commit Message: !commit_msg!
echo ======================
echo.

cd /d "%~dp0"

echo %BLUE%[1/3] Running git add .%RESET%
git add .
if !errorlevel! neq 0 (
    echo %RED%Error: git add . failed.%RESET%
    goto end
)
echo %GREEN%Success.%RESET%
echo.

echo %YELLOW%[2/3] Running git commit -m "!commit_msg!"%RESET%
git commit -m "!commit_msg!"
if !errorlevel! neq 0 (
    echo %RED%Error: git commit failed, no changes or config error.%RESET%
    goto end
)
echo %GREEN%Success.%RESET%
echo.

echo [Ready to Push] Current Dir:
echo %cd%
echo.

echo %RED%[3/3] Running git push%RESET%
git push
if !errorlevel! neq 0 (
    echo %RED%Error: git push failed.%RESET%
    goto end
)
echo %GREEN%Success.%RESET%
echo.

echo ======================
echo Git Commit + Push Completed.
echo ======================
:end
pause