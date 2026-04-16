# Poster Generation

## Prerequisites
- Playwright installed in `.venv` (project root)
- Chromium browser: `npx playwright install chromium`

## Generate PDF + Screenshot from HTML
```bash
cd /Users/jovan/personal/tatamata && .venv/bin/python -c "
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 794, 'height': 1123})
    page.goto('file:///Users/jovan/personal/tatamata/marketing/FOLDER/poster-a4-highschool.html', wait_until='networkidle', timeout=15000)
    page.wait_for_timeout(3000)
    page.screenshot(path='marketing/FOLDER/poster-preview.png', full_page=False)
    page.pdf(path='marketing/FOLDER/poster-a4-highschool.pdf', format='A4', print_background=True, margin={'top':'0','right':'0','bottom':'0','left':'0'})
    browser.close()
"
```
Replace `FOLDER` with `.` (root) or `color_variant_N`.

## QR Code
```bash
npx qrcode -t svg -o marketing/qr-matoteka.svg "https://matoteka.com/"
```

## Structure
Each variant folder needs `poster-a4-highschool.html` + `logo-brain.png` side by side.
