const CustomErrorHandler = require("./custom.js");
const { StatusCodes } = require("http-status-codes");

class Not_Found extends CustomErrorHandler {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = Not_Found;
