// ============================================================
//  Background Service Worker
//  Handles extension install event and keeps permissions alive
// ============================================================

chrome.runtime.onInstalled.addListener(() => {
  console.log("Quick Copy-Paste Extension installed successfully.");
});
