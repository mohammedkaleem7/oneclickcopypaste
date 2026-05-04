# oneclickcopypaste
Quick Copy-Paste Extension
# ⚡ Quick Copy-Paste Browser Extension

A lightweight Chrome / Firefox extension that lets you copy and paste text
using simple mouse + keyboard shortcuts — no menus, no popups, just instant
one-click clipboard control.

---

## 🖱️ Shortcuts

| Action | Shortcut |
|--------|----------|
| **Copy** selected text | `Ctrl` + `Left Click` on selected text |
| **Paste** clipboard text | `Shift` + `Left Click` inside any text field |

---

## 📁 File Structure

quick-copy-paste-extension/

├── manifest.json # Extension config (Manifest V3)

├── content.js # Core copy/paste logic (injected into every page)

├── background.js # Service worker (install event handler)

└── icons/

└── icon48.png # Optional extension icon (48x48 px)

---

## 🚀 Installation

### Chrome / Microsoft Edge

1. Open your browser and navigate to `chrome://extensions`
2. Toggle **Developer Mode** ON (top-right corner)
3. Click **"Load unpacked"**
4. Select the `quick-copy-paste-extension/` folder
5. The extension is now active on all pages ✅

### Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click **"Load Temporary Add-on..."**
3. Browse into the `quick-copy-paste-extension/` folder
4. Select the `manifest.json` file
5. The extension is now active ✅

> **Note:** Temporary add-ons in Firefox are removed when the browser is
> closed. To install permanently, package the folder as a `.zip`, rename
> it to `.xpi`, and load it via `about:addons`.

---

## 🔧 How to Use

### Copying Text
1. Select any word or sentence on a webpage by highlighting it
2. While the text is still highlighted, hold `Ctrl` and `Left Click`
3. A **green toast** notification confirms the text was copied

### Pasting Text
1. Click inside any input field, textarea, or editable area to focus it
2. Hold `Shift` and `Left Click` inside the field
3. The copied text is inserted at the cursor position
4. A **blue toast** notification confirms the text was pasted

---

## 💬 Toast Notifications

Every action shows a small notification in the bottom-right corner of
the screen so you always know what happened.

| Toast Color | Meaning |
|-------------|---------|
| 🟢 Green | Text copied successfully |
| 🔵 Blue | Text pasted successfully |
| 🟠 Orange | No text selected / Clipboard is empty |
| 🔴 Red | Error — paste target is not a text field |

---

## ⚙️ Technical Details

| Property | Value |
|----------|-------|
| Manifest Version | V3 |
| Browsers Supported | Chrome, Edge, Firefox |
| Permissions Required | `clipboardRead`, `clipboardWrite`, `activeTab`, `scripting` |
| Works On | All URLs (`<all_urls>`) |
| Framework Compatibility | React, Vue, Angular (fires `input` + `change` events) |
| Fallback Copy Method | Hidden `<textarea>` + `execCommand` for restricted pages |

---

## 🔒 Permissions Explained

| Permission | Why It Is Needed |
|------------|-----------------|
| `clipboardRead` | Required to read clipboard content when pasting |
| `clipboardWrite` | Required to write selected text to the clipboard |
| `activeTab` | Allows the extension to interact with the current tab |
| `scripting` | Allows content scripts to be injected into pages |

---

## ♻️ Reloading After Updates

If you make any changes to the extension files, follow these steps to
apply them:

1. Go to `chrome://extensions` (or `about:debugging` in Firefox)
2. Click the **refresh / reload icon** on the extension card
3. Reload any browser tabs that were already open

---

## 🐛 Known Limitations

- **Paste only works inside editable fields** — inputs, textareas, and
  `contentEditable` elements. It cannot paste into non-editable page content.
- **Clipboard API requires HTTPS** — on plain `http://` pages, the
  `navigator.clipboard` API may be blocked by the browser. The extension
  falls back to the `execCommand` method for copying in those cases.
- **Firefox temporary installs** are cleared on browser restart. Use an
  `.xpi` package for a persistent install.
- **`Shift + Left Click`** may interfere with some web apps that use
  Shift+Click for range selection (e.g., file managers, spreadsheets).

---

## 🗺️ Roadmap / Possible Enhancements

- [ ] Options page to customize keyboard shortcuts
- [ ] Support for multiple clipboard slots (clipboard history)
- [ ] Visual highlight on the copied text
- [ ] Right-click context menu integration as an alternative trigger
- [ ] Cross-tab clipboard sync

---

## 👤 Author

Developed by Mohammed Kaleem

mk.klm787@gmail.com
---

> 💡 **Tip:** If the extension stops working on a specific page, try
> reloading that tab. Some pages with strict Content Security Policies
> (CSP) may restrict clipboard access.
