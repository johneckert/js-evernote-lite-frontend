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
      return noteItem;
    }

    renderMainContent() {
      let titleText = document.createTextNode(this.title);
      let bodyText = document.createTextNode(this.body);
      document.querySelector("#noteTitle").append(titleText);
      document.querySelector("#noteBody").append(bodyText);
    }
  };
})();
