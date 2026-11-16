# Meal Planner

Helen's batch-cooking meal planner: recipe library, weekly plan from a rotation, shopping list and nutrition. Installs on the phone as an app and keeps working offline.

## Files
- `index.html` – the whole app
- `manifest.webmanifest`, `sw.js`, `icon*.png`, `icon.svg` – make it installable and work offline
- `apps-script.gs` – Google Drive sync (not used by the website itself; paste it into Apps Script)

## Publish on GitHub Pages
Settings → Pages → Source: Deploy from a branch → Branch: `main`, folder `/ (root)` → Save.
The app appears at `https://helen844.github.io/meal-planner/` after a minute or two.

## Connect Google Drive
1. Go to script.google.com → New project. Paste in `apps-script.gs`.
2. Change `TOKEN` to your own phrase. Save.
3. Deploy → New deployment → type **Web app**. Execute as **Me**, Who has access **Anyone**. Deploy and allow access.
4. Copy the web app link (ends in `/exec`).
5. In the app: Settings (gear) → paste the link and token → Save & connect.

Everything is saved on the phone straight away and copied to `meal-planner-data.json` in your Drive. Open the app on another device with the same link and token and it picks up the same data.
