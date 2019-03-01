"use strict";

class Login {
  get sanitizationRules() {
    return {
      email: "normalize_email"
    };
  }

  get rules() {
    return {
      username: "required",
      email: "required|email",
      password: "required"
    };
  }

  get messages() {
    return {
      "email.required": "o campo e-mail é obrigatório.",
      "email.email": "o e-mail deve ser um campo válido.",
      "password.required": "o campo password é obrigatório.",
      "username.required": "o campo username é obrigatório."
    };
  }
}

module.exports = Login;
