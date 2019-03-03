"use strict";

const Ticket = use("App/Models/Ticket");
const { NotFoundError, InternalServerError } = use(
  "App/Exceptions/CustomException"
);

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
    } catch (e) {
      throw new InternalServerError();
    }
  }

  async show({ params }) {
    const ticket = await Ticket.find(params.id);
    if (!ticket) throw new NotFoundError();

    return ticket;
  }

  async update({ params, request }) {
    const ticket = await Ticket.find(params.id);

    if (!ticket) throw new NotFoundError();

    const { title, content, status, priority } = request.all();

    try {
      ticket.title = title;
      ticket.content = content;
      ticket.status = status;
      ticket.priority = priority;

      if (await ticket.save()) return ticket;
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async destroy({ params }) {
    try {
      const ticket = await Ticket.findOrFail(params.id);
      if (await ticket.delete()) return ticket;
    } catch (e) {
      throw new NotFoundError();
    }
  }
}

module.exports = TicketController;
