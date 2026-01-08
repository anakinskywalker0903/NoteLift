const moduleInput = document.getElementById("moduleInput");
const notesDiv = document.getElementById("notes");
const capturePdfBtn = document.getElementById("capturePdfBtn");

/* Load current module */
chrome.storage.local.get(["currentModule"], (result) => {
  if (result.currentModule) {
    moduleInput.value = result.currentModule;
  }
});

/* Save module on change */
moduleInput.addEventListener("input", () => {
  chrome.storage.local.set({ currentModule: moduleInput.value });
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

    if (Object.keys(notesByModule).length === 0) {
      notesDiv.innerText = "No notes saved yet.";
    }
  });
}

loadNotes();
exportBtn.addEventListener("click", () => {
  chrome.storage.local.get(["notesByModule"], (result) => {
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

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download({
      url: url,
      filename: "NoteLift_Notes.txt",
      saveAs: true
    });
  });
});
