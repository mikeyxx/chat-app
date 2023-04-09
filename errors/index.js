const CustomErrorHandler = require("./custom.js");
const Not_Found = require("./not-found.js");
const BadRequestError = require("./badRequest.js");
const UnauthenticatedError = require("./unauthenticated.js");

module.exports = {
  CustomErrorHandler,
  Not_Found,
  BadRequestError,
  UnauthenticatedError,
};
