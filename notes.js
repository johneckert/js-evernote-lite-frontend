const Note = (function() {
  return class Note {
    constructor({ user_id, title, body, id }) {
      this.user_id = user_id;
      this.title = title;
      this.body = body;
      this.id = id;
    }

    renderPreviewItem() {
      let noteItem = document.createElement("li");
      noteItem.dataset.id = this.id;
      let noteTitleText = document.createTextNode(this.title);
      noteItem.append(noteTitleText);
      document.querySelector("#notes").append(noteItem);
    }

    renderMainContent() {
      let mainContentTitle = document.querySelector("#noteTitle");
      mainContentTitle.value = this.title;
      mainContentTitle.dataset.id = this.id;
      let mainContentBody = document.querySelector("#noteBody");
      mainContentBody.value = this.body;
      mainContentBody.dataset.id = this.id;
    }
  };
})();
