# TabVault — Save Tabs as Tasks

> Convert any browser tab into an actionable task with one right-click.

## Install on Chrome

[Install TabVault on Chrome Web Store](https://chrome.google.com/webstore/detail/oagpalgblbgkhppmebhjbnihdkdhfemg)

Works on Chrome, Edge, and Brave.

## What it does

TabVault sits in your toolbar and lets you save any open tab as a task — with a note, due date, and priority — so you stop losing important tabs when you close the browser.

## Features

- **One right-click save** — Save any tab 
  or link as a task in under 2 seconds
- **Due dates** — Set deadlines, see 
  overdue tasks highlighted in red
- **Smart sorting** — Overdue tasks 
  automatically rise to the top
- **Priority tags** — Mark tasks P1, 
  P2, or P3 with color-coded dots
- **Live badge count** — Toolbar icon 
  shows active task count. Turns red 
  when tasks are overdue
- **Inline editing** — Edit title, note, 
  or due date directly in the popup
- **Real-time search** — Filter by title, 
  note, or domain instantly
- **Weekly nudge** — Optional Monday 
  morning reminder for unfinished tasks
- **Light / Dark / Auto theme** — Follows 
  your system or set manually
- **Export** — Download all tasks as 
  JSON or CSV anytime
- **100% local** — No account, no server, 
  no tracking. Ever.

## Architecture

TabVault is built entirely on Chrome 
Extensions Manifest V3:

src/
├── storage.js   # chrome.storage CRUD operations
├── task.js      # Task model and due date logic
├── badge.js     # Toolbar badge management
├── search.js    # Real-time search and filtering
├── nudge.js     # Weekly alarm notifications
└── export.js    # JSON and CSV export

## Privacy

All data is stored locally in your browser using chrome.storage.local.
Nothing is sent to any external server.
No account is required.

[Full Privacy Policy](https://uwaisbaig.github.io/tabvault-extension/privacy.html)

## Developer

**M. Uwais Baig**
Full-Stack & Chrome Extension Developer

- Portfolio: https://uwaisbaig.netlify.app
- LinkedIn: https://linkedin.com/in/m-uwais-baig-ba1168296
- Support: https://buymeacoffee.com/uwaisbaig

## License

MIT License — see LICENSE file

---

*TabVault is built with Manifest V3 — future-proof from day one.*
