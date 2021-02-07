import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: "Not authorized" }];
  }

  constructor() {
    super("Not authorized");
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}
