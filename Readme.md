# NoteLift

NoteLift is a local-first Chrome extension that helps students convert highlighted text from PDFs and web pages into clean, module-wise revision notes — without accounts, cloud sync, or AI interference.

👉 Live on the Chrome Web Store: https://chrome.google.com/webstore/detail/appchfdfnjlebnpabaocabfjconhemjp

## Why NoteLift?

When studying from PDFs or online material, important points are scattered across pages and sources. Existing tools often force logins, cloud sync, or AI-driven summaries that dilute user intent.

NoteLift was built to solve a simpler, more deliberate problem:

Capture only what you choose, organize it your way, and keep it entirely local.

## Design Principles

* Local-first — all notes stay in the browser
* No AI by default — preserves user judgment
* Explicit organization — module names are user-defined
* Minimal workflow — Highlight → Save → Export
* Privacy-first — no login, no tracking, no analytics

## Features

* Save highlighted text from PDFs and web pages via right-click
* Organize notes explicitly by module or chapter
* Review saved notes directly inside the extension popup
* Export notes module-wise, named after the module
* Supports TXT and Markdown (MD) exports
* Clear all notes safely with confirmation
* Works fully offline using browser storage

## How It Works

1. Set a module name inside the extension
2. Highlight important text while studying
3. Right-click → Save to NoteLift
4. Notes are grouped under the active module
5. Review notes anytime from the toolbar
6. Export notes when revision is needed

## Export Formats

* TXT — simple plain-text revision files
* Markdown (MD) — structured notes compatible with Obsidian, Notion, and GitHub

Each export produces a single file per module, named automatically.

## Limitations (By Design)

* Only user-selected text is captured
* Scanned PDFs / image-only content are not supported yet
* No automatic summarization or rewriting

These constraints are intentional to keep the workflow transparent, fast, and predictable.

## OCR & Future Scope

OCR support for scanned or image-based PDFs is being explored as a future feature.

If implemented, it will:
* Be optional
* Run on-device or user-controlled
* Avoid forced cloud dependency

No OCR or external AI services are used in the current version.

## Security & Trust Notice

Newly published Chrome extensions may display:

"Not trusted by Enhanced Safe Browsing"

This is normal for new extensions and typically resolves over time as usage and reputation build. NoteLift does not execute remote code, collect personal data, or communicate with external servers.

## Name Clarification

NoteLift (this extension) is not affiliated with the website `notelift.com`. The Chrome extension operates independently and focuses on local note organization.

## Tech Stack

* JavaScript (Manifest V3)
* Chrome Extensions API
* Local storage (`chrome.storage`)
* Context menus & downloads API

## License

MIT License

## Feedback

Ideas, issues, and workflow feedback are welcome. This project was built from first principles and continues to evolve based on real study use.