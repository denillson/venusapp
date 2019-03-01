"use strict";

const Ticket = use("App/Models/Ticket");

class TicketController {
  async index({ request }) {
    const currentPage = request.all();
    return Ticket.query()
      .with("user")
      .paginate(currentPage.page, 10);
  }

  async store({ request, response }) {}

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = TicketController;
