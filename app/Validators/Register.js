'use strict'

class Register {
  get rules () {
    return {
      username: 'required',
      email: 'required|email|unique:users,email',
      password: 'required'
    }
  }

  get messages () {
    return {
      'email.required': 'O Campo e-mail é obrigatório!',
      'email.email': 'Você deve passar um e-mail válido.',
      'email.unique': 'O e-mail deve ser unico!',
      'password.required': 'O campo senha é obrigatória',
      'username.required': 'O Campo username é obrigatório'
    }
  }

}

module.exports = Register
