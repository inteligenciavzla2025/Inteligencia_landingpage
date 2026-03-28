$ErrorActionPreference = "Stop"

cd c:/Users/PERSONAL/Desktop/InteligencIA/landing_inteligencia/web-app

# Re-initialize clean if needed
if (Test-Path .git) { 
    Remove-Item -Recurse -Force .git 
}

git init
git config user.name "InteligencIA Dev"
git config user.email "inteligenciavzla2025@gmail.com"
git branch -M main
git remote add origin https://github.com/inteligenciavzla2025/Inteligencia_landingpage.git

# 1. Base Setup
Write-Host "--- Committing base setup ---"
git add package.json package-lock.json vite.config.ts tailwind.config.js postcss.config.js tsconfig.json tsconfig.node.json index.html src/vite-env.d.ts .eslintrc.cjs .gitignore
git add public/ src/main.tsx src/index.css src/lib/ src/components/ui/
git commit -m "chore: setup project infrastructure, Tailwind, and core UI components"

# 2. Layouts
Write-Host "--- Committing layout ---"
git checkout -b feature/layout
git add src/components/layout/
git commit -m "feat: implement responsive Navbar and Footer"
git checkout main
git merge feature/layout

# 3. Hero
Write-Host "--- Committing hero ---"
git checkout -b feature/hero
git add src/components/sections/Hero.tsx
git commit -m "feat: build Hero section with primary CTA and animations"
git checkout main
git merge feature/hero

# 4. Process & Bridge
Write-Host "--- Committing process ---"
git checkout -b feature/process
git add src/components/sections/Process.tsx src/components/sections/Bridge.tsx
git commit -m "feat: add problem-awareness Bridge and Methodology timelines"
git checkout main
git merge feature/process

# 5. Services
Write-Host "--- Committing services ---"
git checkout -b feature/services
git add src/components/sections/Services.tsx
git commit -m "feat: list AI and automation services with tech-friendly cards"
git checkout main
git merge feature/services

# 6. Lead Capture
Write-Host "--- Committing lead capture ---"
git checkout -b feature/lead-capture
git add src/components/sections/LeadCapture.tsx
git commit -m "feat: create robust lead capture form with React Hook Form and Zod"
git checkout main
git merge feature/lead-capture

# 7. Final App Integration and any remaining files
Write-Host "--- Committing remaining files ---"
git checkout -b feature/app-integration
git add .
git commit -m "feat: assemble all sections into the main App component and cleanup"
git checkout main
git merge feature/app-integration

Write-Host "--- Pushing branches to GitHub ---"
git push -u origin main
git push -u origin feature/layout
git push -u origin feature/hero
git push -u origin feature/process
git push -u origin feature/services
git push -u origin feature/lead-capture
git push -u origin feature/app-integration

Write-Host "--- Done! ---"
