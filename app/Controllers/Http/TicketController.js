"use strict";

const Ticket = use("App/Models/Ticket");

class TicketController {
  async index({ request }) {
    const currentPage = request.all();

    return Ticket.query()
      .with("user")
      .paginate(currentPage.page, 10);
  }

  async store({ request, response, auth }) {
    const payload = request.only(["title", "content", "status", "priority"]);

    try {
      const ticket = await Ticket.create({ user_id: auth.user.id, ...payload });
      response.status(201).json(ticket);
    } catch (error) {
      response.status(500).json({ message: error });
    }
  }

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = TicketController;
