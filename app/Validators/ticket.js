"use strict";

class ticket {
  get rules() {
    return {
      title: "required",
      content: "required",
      status: "required"
    };
  }

  get messages() {
    return {
      "title.required": "o campo title é obrigatório.",
      "content.required": "o campo content é obrigatório.",
      "status.required": "o campo status é obrigatório."
    };
  }
}

module.exports = ticket;
