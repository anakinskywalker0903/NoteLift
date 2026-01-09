const moduleInput = document.getElementById("moduleInput");
const notesDiv = document.getElementById("notes");
const capturePdfBtn = document.getElementById("capturePdfBtn");
const setModuleBtn = document.getElementById("setModuleBtn");
const currentModuleText = document.getElementById("currentModuleText");
const exportBtn = document.getElementById("exportBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

/* Load current module on startup */
chrome.storage.local.get(["currentModule"], (result) => {
  if (result.currentModule) {
    currentModuleText.innerText = `Current Module: ${result.currentModule}`;
  } else {
    currentModuleText.innerText = "No module selected";
  }
});

/* Explicitly set module */
setModuleBtn.addEventListener("click", () => {
  const moduleName = moduleInput.value.trim();

  if (!moduleName) {
    alert("Please enter a module name.");
    return;
  }

  chrome.storage.local.set({ currentModule: moduleName }, () => {
    currentModuleText.innerText = `Current Module: ${moduleName}`;
    moduleInput.value = "";
  });
});

/* Capture PDF selection */
capturePdfBtn.addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();

    if (!text || text.trim() === "") {
      alert("Clipboard is empty. Copy text from the PDF first.");
      return;
    }

    chrome.storage.local.get(
      ["notesByModule", "currentModule"],
      (result) => {
        const module = result.currentModule || "Uncategorized";
        const notesByModule = result.notesByModule || {};

        if (!notesByModule[module]) {
          notesByModule[module] = [];
        }

        notesByModule[module].push(text);

        chrome.storage.local.set({ notesByModule }, loadNotes);
      }
    );
  } catch (err) {
    alert("Clipboard access failed. Please copy text manually.");
  }
});

/* Load and display notes */
function loadNotes() {
  chrome.storage.local.get(["notesByModule"], (result) => {
    const notesByModule = result.notesByModule || {};
    notesDiv.innerHTML = "";

    if (Object.keys(notesByModule).length === 0) {
      notesDiv.innerText = "No notes saved yet.";
      return;
    }

    for (const module in notesByModule) {
      const header = document.createElement("h4");
      header.innerText = module;
      notesDiv.appendChild(header);

      notesByModule[module].forEach((note) => {
        const div = document.createElement("div");
        div.className = "note";
        div.innerText = note;
        notesDiv.appendChild(div);
      });
    }
  });
}

loadNotes();

/* Export notes */
exportBtn.addEventListener("click", () => {
  chrome.storage.local.get(
    ["notesByModule", "currentModule"],
    (result) => {
      const notesByModule = result.notesByModule;

      if (!notesByModule || Object.keys(notesByModule).length === 0) {
        alert("No notes to export.");
        return;
      }

      let content = "";

      for (const module in notesByModule) {
        content += `=== ${module} ===\n\n`;

        notesByModule[module].forEach((note) => {
          content += note + "\n\n";
        });
      }

      // Decide filename
      let filename = "NoteLift_Notes.txt";

      if (result.currentModule) {
        const safeModuleName = result.currentModule
          .trim()
          .replace(/\s+/g, "_")
          .replace(/[^\w\-]/g, "");

        if (safeModuleName.length > 0) {
          filename = `${safeModuleName}.txt`;
        }
      }

      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      chrome.downloads.download({
        url: url,
        filename: filename,
        saveAs: true
      });
    }
  );
});
clearAllBtn.addEventListener("click", () => {
  const confirmClear = confirm(
    "This will delete ALL notes and modules. This action cannot be undone.\n\nAre you sure?"
  );

  if (!confirmClear) return;

  chrome.storage.local.clear(() => {
    currentModuleText.innerText = "No module selected";
    notesDiv.innerText = "No notes saved yet.";
  });
});
