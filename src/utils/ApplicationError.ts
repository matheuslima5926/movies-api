import { StatusCodes } from "http-status-codes";

class ApplicationError {
  public readonly message: string | Array<String>;
  public readonly statusCode: number;

  constructor(message: string, statusCode = StatusCodes.BAD_REQUEST) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default ApplicationError;
