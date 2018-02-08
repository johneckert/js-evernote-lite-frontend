const Adapter = (function() {
  return class Adapter {
    static get_notes() {
      return fetch("http://localhost:3000/api/v1/notes").then(response =>
        response.json()
      );
    }

    static createNoteFetch() {
      let newTitle = document.getElementById("titleInput").value;
      let newBody = document.getElementById("bodyInput").value;
      let formData = { title: newTitle, body: newBody };
      return fetch("http://localhost:3000/api/v1/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          let currentNote = new Note(data);
          currentNote.renderPreviewItem();
        });

      ///FORM NOT SUBMITTING!!!!
    }
  };
})();
