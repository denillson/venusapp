"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class NotFoundError extends LogicalException {
  handle(error, { response }) {
    response.status(404).json({ message: "Não encontrado!", status: 404 });
  }
}

class ForbbidenError extends LogicalException {
  handle(error, { response }) {
    response
      .status(403)
      .json({
        message: "Você não tem permissão suficiente para continuar aqui!",
        status: 403
      });
  }
}

class UnauthorizedError extends LogicalException {
  handle(error, { response }) {
    response
      .status(401)
      .json({
        message: "Você não possui autorização para continuar aqui!",
        status: 401
      });
  }
}

class InternalServerError extends LogicalException {
  handle(error, { response }) {
    response.status(500).json({
      message:
        "Ocorreu um erro ao tentar processar sua solicitação, por favor contate um dos nossos administradores.",
      status: 500
    });
  }
}

module.exports = {
  NotFoundError,
  ForbbidenError,
  UnauthorizedError,
  InternalServerError
};
