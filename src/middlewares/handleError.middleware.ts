import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { ApplicationError, errors } from "../utils";

export default (err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof ApplicationError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.log(err);
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: errors.genericError,
  });

};
