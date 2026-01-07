const moduleInput = document.getElementById("moduleInput");
const notesDiv = document.getElementById("notes");

/* Load current module */
chrome.storage.local.get(["currentModule"], (result) => {
  if (result.currentModule) {
    moduleInput.value = result.currentModule;
  }
});

/* Save module when changed */
moduleInput.addEventListener("input", () => {
  chrome.storage.local.set({ currentModule: moduleInput.value });
});

/* Load and display notes by module */
chrome.storage.local.get(["notesByModule"], (result) => {
  const notesByModule = result.notesByModule || {};
  notesDiv.innerHTML = "";

  for (const module in notesByModule) {
    const header = document.createElement("h4");
    header.innerText = module;
    notesDiv.appendChild(header);

    notesByModule[module].forEach((note) => {
      const p = document.createElement("div");
      p.className = "note";
      p.innerText = note;
      notesDiv.appendChild(p);
    });
  }

  if (Object.keys(notesByModule).length === 0) {
    notesDiv.innerText = "No notes saved yet.";
  }
});
