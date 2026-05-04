// ============================================================
//  Quick Copy-Paste Extension - Content Script
//  Ctrl  + Left Click  => Copy selected text
//  Shift + Left Click  => Paste clipboard content at cursor
// ============================================================

(function () {
  "use strict";

  // ── Visual Toast Notification ──────────────────────────────
  function showToast(message, color = "#323232") {
    const existing = document.getElementById("qcp-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "qcp-toast";
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 28px;
      right: 28px;
      background: ${color};
      color: #fff;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-family: Arial, sans-serif;
      z-index: 2147483647;
      box-shadow: 0 4px 14px rgba(0,0,0,0.35);
      opacity: 1;
      transition: opacity 0.4s ease;
      pointer-events: none;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 400);
    }, 1800);
  }

  // ── Shared click handler for BOTH Copy and Paste ───────────
  document.addEventListener(
    "click",
    function (e) {

      // ── Ctrl + Left Click → COPY ─────────────────────────
      if (e.ctrlKey && !e.shiftKey) {
        const selectedText = window.getSelection().toString().trim();

        if (!selectedText) {
          showToast("⚠️ No text selected!", "#e65100");
          return;
        }

        navigator.clipboard
          .writeText(selectedText)
          .then(() => {
            showToast(
              `✅ Copied: "${selectedText.substring(0, 40)}${selectedText.length > 40 ? "…" : ""}"`,
              "#2e7d32"
            );
          })
          .catch(() => {
            fallbackCopy(selectedText);
          });

        return;
      }

      // ── Shift + Left Click → PASTE ───────────────────────
      if (e.shiftKey && !e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();

        // Determine the target element — focused or element under cursor
        let targetEl = document.activeElement;

        const isEditable = (el) =>
          el &&
          (el.tagName === "INPUT" ||
            el.tagName === "TEXTAREA" ||
            el.isContentEditable);

        // If the currently focused element is not editable,
        // check the element directly under the cursor
        if (!isEditable(targetEl)) {
          const elUnder = document.elementFromPoint(e.clientX, e.clientY);
          if (isEditable(elUnder)) {
            elUnder.focus();
            targetEl = elUnder;
          } else {
            showToast("⚠️ Click inside a text field to paste!", "#c62828");
            return;
          }
        }

        navigator.clipboard
          .readText()
          .then((clipText) => {
            if (!clipText) {
              showToast("⚠️ Clipboard is empty!", "#e65100");
              return;
            }
            insertTextAtCursor(clipText);
            showToast(
              `📋 Pasted: "${clipText.substring(0, 40)}${clipText.length > 40 ? "…" : ""}"`,
              "#1565c0"
            );
          })
          .catch(() => {
            showToast("❌ Clipboard read blocked by browser!", "#b71c1c");
          });

        return;
      }
    },
    true // Use capture phase so we intercept before page handlers
  );

  // ── Insert text at the current cursor position ─────────────
  function insertTextAtCursor(text) {
    const el = document.activeElement;

    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      const start = el.selectionStart ?? el.value.length;
      const end   = el.selectionEnd   ?? el.value.length;
      const before = el.value.substring(0, start);
      const after  = el.value.substring(end);
      el.value = before + text + after;

      // Move cursor to end of pasted text
      const newPos = start + text.length;
      el.setSelectionRange(newPos, newPos);

      // Fire input + change so React / Vue / Angular pick up the change
      el.dispatchEvent(new Event("input",  { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));

    } else if (el.isContentEditable) {
      // Preserve undo history in contentEditable areas
      document.execCommand("insertText", false, text);
    }
  }

  // ── Fallback copy using hidden textarea trick ───────────────
  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0;";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand("copy");
      showToast(
        `✅ Copied (fallback): "${text.substring(0, 40)}…"`,
        "#2e7d32"
      );
    } catch (err) {
      showToast("❌ Copy failed!", "#b71c1c");
    }
    document.body.removeChild(ta);
  }

})();
