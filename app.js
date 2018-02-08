const App = (function() {
  return class App {
    static init() {
      Adapter.get_notes().then(data => {
        data.forEach(function(data) {
          let currentNote = new Note(data);
          let noteUL = document.querySelector("#notes");
          noteUL.append(currentNote.renderPreviewItem());
        });
      });
      const noteUL = document.querySelector("#notes");
      noteUL.addEventListener("click", function(event) {
        let noteId = event.target.dataset.id;
        Adapter.get_notes().then(data => {
          let relevantNote = data.find(noteObject => {
            return noteObject.id == noteId;
          });
          let note = new Note(relevantNote);
          note.renderMainContent();
        });
      });
      const form = document.getElementById("itemForm");
      form.addEventListener("submit", function(event) {
        event.preventDefault();
      });
    }
  };
})();
