'use strict'

class Login {
  get sanitizationRules () {
    return {
      email: 'normalize_email'
    }
  }
  
  get rules () {
    return {
      username: 'required',
      email: 'required|email',
      password: 'required'
    }
  }

  get messages () {
    return {
      'email.required': 'O Campo e-mail é obrigatório!',
      'email.email': 'Você deve passar um e-mail válido.',
      'password.required': 'O campo senha é obrigatória',
      'username.required': 'O Campo username é obrigatório'
    }
  }
}

module.exports = Login
