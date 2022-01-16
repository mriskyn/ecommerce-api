import { NextFunction, Response, Request } from 'express';
import * as CustomError from '../errors';
import { isTokenValid } from '../utils/jwt';

declare namespace Express {
  export interface Request2 extends Request {
    user : {
      userId?: string  
      role?: string  
    }
  }
}

const authenticateUser = async (
  req: Express.Request2,
  res: Response,
  next: NextFunction
) => {

  let token: any;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }
  // check cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
  try {
    const payload = isTokenValid(token);

    // Attach the user and his permissions to the req object
    req.user = {
      userId: payload.user.userId,
      role: payload.user.role,
    };

    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
};

const authorizeRoles = (...roles: any[]) => {
  return (req: Express.Request2, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

export { authenticateUser, authorizeRoles };
