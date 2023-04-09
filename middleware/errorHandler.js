const CustomErrorHandler = require("../errors/custom.js");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleWare = (err, req, res, next) => {
  if (err instanceof CustomErrorHandler) {
    res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

module.exports = errorHandlerMiddleWare;
