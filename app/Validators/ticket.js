"use strict";

class ticket {
  get rules() {
    return {
      title: "required",
      content: "required"
    };
  }

  get messages() {
    return {
      "title.required": "o campo title é obrigatório.",
      "content.required": "o campo content é obrigatório."
    };
  }
}

module.exports = ticket;
