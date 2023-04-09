const CustomErrorHandler = require("./custom.js");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends CustomErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
