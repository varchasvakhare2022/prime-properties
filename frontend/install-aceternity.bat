@echo off
echo 🎨 Installing Aceternity UI Dependencies for Prime Properties
echo =============================================================

REM Check if we're in the frontend directory
if not exist "package.json" (
    echo ❌ Please run this script from the frontend directory
    pause
    exit /b 1
)

echo 📦 Installing new dependencies...
npm install

echo.
echo ✅ Dependencies installed successfully!
echo.
echo 🚀 New Aceternity UI Components Available:
echo    • Animated Cards with hover effects
echo    • Shimmer buttons and cards
echo    • Gradient borders and text
echo    • Animated navbar with mobile menu
echo    • Framer Motion animations
echo.
echo 🎯 To start the development server:
echo    npm start
echo.
echo 📚 Components are located in:
echo    src/components/ui/
echo.
echo 🎉 Your homepage now features stunning Aceternity UI components!
pause
