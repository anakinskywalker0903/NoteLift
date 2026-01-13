# NoteLift

NoteLift is a lightweight, local-first Chrome extension that helps students convert highlighted text from PDFs and web pages into clean, module-wise revision notes.

## Why NoteLift?

While studying from PDFs or online material, important points are often scattered across pages. NoteLift was built to solve a simple problem: capturing only what _you_ find important and organizing it into structured, module-wise notes for easy revision.
The extension is intentionally minimal, privacy-friendly, and works entirely offline without any cloud services or accounts.

## Design Principles

- **Local-first:** All notes are stored locally in the browser.
- **No AI by default:** Notes reflect the user’s judgment, not automated summaries.
- **Minimal workflow:** Capture → Review → Export.
- **Privacy-friendly:** No login, no tracking, no external APIs.

## Features

- Capture highlighted text from PDFs and web pages
- Organize notes explicitly by module or chapter
- Store all notes locally using Chrome storage
- Review saved notes directly inside the extension
- Export notes as a single file per module
- Supports export in **TXT** and **Markdown (MD)** formats
- Clear all notes safely with confirmation

## How It Works

1. Set the current module name inside the extension.
2. While studying, highlight important text in a PDF or web page.
3. Save the highlighted text to NoteLift (via context menu or clipboard capture).
4. Notes are grouped automatically under the selected module.
5. Review notes anytime inside the popup.
6. Export notes as TXT or Markdown when revision is needed.

## Export Formats

NoteLift supports two export formats:

- **TXT:** Plain text format for simple revision and sharing.
- **Markdown (MD):** Structured format suitable for tools like Obsidian, Notion, or GitHub-based notes.
  Both formats export notes module-wise and name the file after the selected module.

## Limitations

- NoteLift captures only user-selected text.
- Diagrams, formulas rendered as images, and scanned PDFs cannot be extracted automatically.
- The extension does not summarize or modify notes — it preserves exactly what the user saves.
  These limitations are intentional to keep the workflow simple, transparent, and reliable.

## Installation (Developer Mode)

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the project folder.
5. The NoteLift extension will appear in the toolbar.

## Project Status

NoteLift is currently in active dogfooding and testing. The core workflow is stable and usable, and feedback is being collected before publishing to the Chrome Web Store.

## Feedback

Feedback, bug reports, and workflow suggestions are welcome.
If you try NoteLift and notice anything confusing or improvable, feel free to open an issue or share feedback through this repository.

## Future Scope

- Optional OCR support for image-based or scanned PDFs may be explored in a future version.
- Any such feature would be designed carefully with privacy, performance, and user control in mind.

## License

This project is licensed under the MIT License.
