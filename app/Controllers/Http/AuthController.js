"use strict";

const User = use("App/Models/User");
const Mail = use("Mail");
const Env = use("Env");
const { InternalServerError } = use("App/Exceptions/CustomException");

class AuthController {
  async register({ request }) {
    const payload = request.only(["username", "email", "password"]);

    try {
      const user = (await User.create(payload)).toJSON();

      await Mail.send("mails.welcome", { user, Env }, message => {
        message
          .to(user.email, user.username)
          .from(Env.get("APP_EMAIL"), Env.get("APP_NAME"))
          .subject(`Seja bem-vindo ${user.username}`);
      });

      return user;
    } catch (e) {
      throw new InternalServerError();
    }
  }

  async login({ request, auth }) {
    const { email, password } = request.all();

    return await auth.attempt(email, password);
  }
}

module.exports = AuthController;
