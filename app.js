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
      document
        .querySelector("#notes")
        .addEventListener("click", App.selectNote);

      //event for clicking submit to create new note
      document
        .getElementById("itemForm")
        .addEventListener("submit", App.createNewNote);

      //event for updating a note
      document
        .getElementById("mainContentForm")
        .addEventListener("submit", App.updateNote);

      //event for deleting note
      document
        .getElementById("delete")
        .addEventListener("click", App.deleteNote);
    }

    static selectNote(event) {
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
    }

    static createNewNote(event) {
      event.preventDefault();
      let newTitle = document.getElementById("titleInput");
      let newBody = document.getElementById("bodyInput");
      let formData = { title: newTitle.value, body: newBody.value };
      Adapter.createNoteFetch(formData).then(data => {
        let currentNote = new Note(data);
        currentNote.renderPreviewItem();
        newTitle.value = "";
        newBody.value = "";
      });
    }

    static updateNote(event) {
      event.preventDefault();
      let updatedTitle = document.getElementById("noteTitle");
      let updatedBody = document.getElementById("noteBody");
      let formData = {
        title: updatedTitle.value,
        body: updatedBody.value,
        id: updatedTitle.dataset.id
      };
      Adapter.updateNoteFetch(formData).then(data => {
        let updateNote = new Note(data);
        let relevantLi = document.querySelector(
          '#notes > [data-id="' + updateNote.id + '"]'
        );
        relevantLi.innerHTML = updateNote.title;
      });
    }

    static deleteNote(event) {
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
    }
  };
})();
