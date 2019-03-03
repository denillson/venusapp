"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class NotFoundError extends LogicalException {
  handle(error, { response }) {
    response.status(404).json({ message: "Not Found!", status: 404 });
  }
}

class ForbbidenError extends LogicalException {
  handle(error, { response }) {
    response.status(403).json({ message: "Fobbiden for you!", status: 403 });
  }
}

class UnauthorizedError extends LogicalException {
  handle(error, { response }) {
    response
      .status(401)
      .json({ message: "Unauthorized for you!", status: 401 });
  }
}

class InternalServerError extends LogicalException {
  handle(error, { response }) {
    response.status(404).json({
      message: "Occurred a error to try process your request. Try again later",
      status: 404
    });
  }
}

module.exports = {
  NotFoundError,
  ForbbidenError,
  UnauthorizedError,
  InternalServerError
};
