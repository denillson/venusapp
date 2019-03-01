'use strict'

const User = use('App/Models/User');

class AuthController {
    async register({ request }) {
        const payload = request.only(["username", "email", "password"]);
        return await User.create({ ...payload });
    }

    async login({ request, auth }) {
        const { email, password } = request.all();
   
        return await auth.attempt(email, password);
    }
}

module.exports = AuthController
    