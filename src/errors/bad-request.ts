import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api';

interface A {
  message: string
}

class BadRequestError extends CustomAPIError {
  statusCode: StatusCodes;
  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
