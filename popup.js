const moduleInput = document.getElementById("moduleInput");
const notesDiv = document.getElementById("notes");
const setModuleBtn = document.getElementById("setModuleBtn");
const currentModuleText = document.getElementById("currentModuleText");
const clearAllBtn = document.getElementById("clearAllBtn");
const exportTxtBtn = document.getElementById("exportTxtBtn");
const exportMdBtn = document.getElementById("exportMdBtn");

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
// Allow Enter key to set module
moduleInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // prevents form-like behavior
    setModuleBtn.click();   // reuse existing logic
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

/* Export notes (TXT or MD) */
function exportNotes(format) {
  chrome.storage.local.get(
    ["notesByModule", "currentModule"],
    (result) => {
      const notesByModule = result.notesByModule;

      if (!notesByModule || Object.keys(notesByModule).length === 0) {
        alert("No notes to export.");
        return;
      }

      let content = "";
      let extension = format === "md" ? ".md" : ".txt";

      for (const module in notesByModule) {
        if (format === "md") {
          content += `# ${module}\n\n`;
          notesByModule[module].forEach((note) => {
            content += `- ${note}\n`;
          });
          content += "\n";
        } else {
          content += `=== ${module} ===\n\n`;
          notesByModule[module].forEach((note) => {
            content += note + "\n\n";
          });
        }
      }

      let filename = "NoteLift_Notes" + extension;

      if (result.currentModule) {
        const safeName = result.currentModule
          .trim()
          .replace(/\s+/g, "_")
          .replace(/[^\w\-]/g, "");

        if (safeName) {
          filename = safeName + extension;
        }
      }

      const mimeType =
  format === "md" ? "text/markdown" : "text/plain";

const blob = new Blob([content], { type: mimeType });

      const url = URL.createObjectURL(blob);

      chrome.downloads.download({
        url,
        filename,
        saveAs: true
      });
    }
  );
}

/* Export buttons */
exportTxtBtn.addEventListener("click", () => {
  exportNotes("txt");
});

exportMdBtn.addEventListener("click", () => {
  exportNotes("md");
});

/* Clear all notes */
clearAllBtn.addEventListener("click", () => {
  const confirmClear = confirm(
    "This will delete ALL notes and modules.\nThis action cannot be undone.\n\nAre you sure?"
  );

  if (!confirmClear) return;

  chrome.storage.local.clear(() => {
    currentModuleText.innerText = "No module selected";
    notesDiv.innerText = "No notes saved yet.";
  });
});
