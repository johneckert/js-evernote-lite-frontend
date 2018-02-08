const App = (function() {
  return class App {
    static init() {
      Adapter.get_notes().then(data => {
        data.forEach(function(data) {
          let currentNote = new Note(data);
          currentNote.renderPreviewItem();
        });
      });

      //Event for Clicking on a note title
      const noteUL = document.querySelector("#notes");
      noteUL.addEventListener("click", function(event) {
        document.querySelector("#noteTitle").innerText = "";
        document.querySelector("#noteBody").innerHTML = "";

        let noteId = event.target.dataset.id;
        Adapter.get_notes().then(data => {
          let relevantNote = data.find(noteObject => {
            return noteObject.id == noteId;
          });
          let note = new Note(relevantNote);
          note.renderMainContent();
        });
      });
      //event for clicking submit to create new note
      const form = document.getElementById("itemForm");
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        let newTitle = document.getElementById("titleInput").value;
        let newBody = document.getElementById("bodyInput").value;
        let formData = { title: newTitle, body: newBody };
        Adapter.createNoteFetch(formData).then(data => {
          let currentNote = new Note(data);
          currentNote.renderPreviewItem();
          document.getElementById("titleInput").value = "";
          document.getElementById("bodyInput").value = "";
        });
      });
      //event for updating a note
      const updateForm = document.getElementById("mainContentForm");
      updateForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let updatedTitle = document.getElementById("noteTitle").value;
        let noteTitleForID = document.getElementById("noteTitle");
        let updatedBody = document.getElementById("noteBody").value;
        let noteID = parseInt(noteTitleForID.dataset.id);
        let formData = { title: updatedTitle, body: updatedBody, id: noteID };
        Adapter.updateNoteFetch(formData).then(data => {
          let updateNote = new Note(data);
          let relevantLi = document.querySelector(
            '#notes > [data-id="' + noteID + '"]'
          );
          relevantLi.innerHTML = updateNote.title;
        });
      });
      const deleteButton = document.getElementById("delete");
      deleteButton.addEventListener("click", function(event) {
        let noteTitleForID = document.getElementById("noteTitle");
        let noteID = parseInt(noteTitleForID.dataset.id);
        Adapter.deleteNoteFetch(noteID);
        const relevantNote = document.querySelector(
          "#notes > [data-id='" + noteID + "']"
        );
        noteTitleForID.value = "";
        let mainBody = document.getElementById("noteBody");
        mainBody.value = "";
        relevantNote.remove();
      });
    }
  };
})();
