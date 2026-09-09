# EffiBit Technologies Corporate Website

This repository contains the files for the modern corporate website of **EffiBit Technologies Pte Ltd**.

## Directory Structure
- `index.html` — The main structural page (fully semantic HTML5 and SEO ready).
- `styles.css` — CSS design system containing the styling, transitions, layout grids, and dark/light themes.
- `app.js` — Client-side interaction logic (mobile menus, tabs, theme-switching state, contact validation, scroll observers).
- `assets/` — Brand logos and visual illustrations for the hero page and focus areas.

---

## How to Run Locally

You can preview the website locally using any of the following methods:

### Method 1: VS Code Live Server (Recommended)
Since you are using VS Code:
1. Open this workspace folder in VS Code.
2. Install the extension **Live Server** (by Ritwick Dey) if you haven't already.
3. Click the **"Go Live"** button at the bottom-right corner of the status bar, or right-click `index.html` and select **"Open with Live Server"**.
4. The site will automatically open at `http://127.0.0.1:5500/index.html` and reload on changes.

### Method 2: Direct File Open
1. Navigate to the project directory in your file explorer.
2. Double-click [index.html](file:///c:/Users/ngomc/OneDrive/Coding%20Projects/Effibit%20WebSite/index.html) to open it in your default web browser (Chrome, Edge, Safari, etc.).
*Note: Some browser security policies may restrict certain script functionality when running on the `file://` protocol. Use Method 1 or 3 for full functionality.*

### Method 3: Python Web Server
If you have Python installed, open your terminal (PowerShell or Command Prompt) in this folder and run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Method 4: Node.js Web Server
If you have Node.js installed, open your terminal in this folder and run:
```bash
npx http-server -p 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## Cloud Hosting (Next Steps)
When you are ready to deploy to the cloud:
1. **GitHub Pages (Free)**: Push this repository to a GitHub repository, go to **Settings > Pages**, and choose the `main` branch to host it for free.
2. **Netlify or Vercel (Free / High Performance)**: Drag-and-drop the project folder directly onto [Netlify](https://www.netlify.com/) or import your GitHub repository to Netlify/Vercel for instantaneous cloud deployment.
