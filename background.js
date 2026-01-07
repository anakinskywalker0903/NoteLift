chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "notelift-save",
    title: "Save to NoteLift",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (!info.selectionText) return;

  chrome.storage.local.get(
    ["notesByModule", "currentModule"],
    (result) => {
      const module = result.currentModule || "Uncategorized";
      const notesByModule = result.notesByModule || {};

      if (!notesByModule[module]) {
        notesByModule[module] = [];
      }

      notesByModule[module].push(info.selectionText);

      chrome.storage.local.set({ notesByModule });
    }
  );
});
