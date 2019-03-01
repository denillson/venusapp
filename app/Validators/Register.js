"use strict";

class Register {
  get rules() {
    return {
      username: "required",
      email: "required|email|unique:users,email",
      password: "required"
    };
  }

  get messages() {
    return {
      "email.required": "o campo e-mail é obrigatório.",
      "email.email": "o e-mail deve ser um campo válido.",
      "email.unique": "o campo e-mail deve ser único.",
      "password.required": "o campo password é obrigatório.",
      "username.required": "o campo username é obrigatório."
    };
  }
}

module.exports = Register;
