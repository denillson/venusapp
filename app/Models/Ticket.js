"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Ticket extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async userInstance => {
      userInstance.slug = userInstance.title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "-")
        .replace(/\./g, "-")
        .replace(/\,/g, "-");
    });
  }
  static get hidden() {
    return ["user_id"];
  }
  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Ticket;
