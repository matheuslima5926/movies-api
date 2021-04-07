import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { StatusCodes } from "http-status-codes";

import authConfig from '../config/auth';
import { ApplicationError } from '../utils';

interface ITokenPayload {
    iat: number,
    exp: number,
    sub: string
}

export default function ensureAuthenticated(
  request: Request, response: Response, next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new ApplicationError('JWT token is missing!', StatusCodes.UNAUTHORIZED);
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as ITokenPayload;
    request.user = {
      id: sub,
    };
    next();
  } catch (err) {
    throw new ApplicationError('Invalid JWT Token', StatusCodes.UNAUTHORIZED);
  }
}
