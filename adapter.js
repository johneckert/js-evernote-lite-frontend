const Adapter = (function() {
  return class Adapter {
    static get_notes() {
      return fetch("http://localhost:3000/api/v1/notes").then(response =>
        response.json()
      );
    }

    static createNoteFetch(formData) {
      return fetch("http://localhost:3000/api/v1/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      }).then(response => response.json());
    }

    static updateNoteFetch(formData) {
      return fetch(`http://localhost:3000/api/v1/notes/${formData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      }).then(response => {
        return response.json();
      });
    }

    static deleteNoteFetch(id) {
      fetch(`http://localhost:3000/api/v1/notes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
    }
  };
})();
