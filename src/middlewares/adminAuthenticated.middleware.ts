import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { StatusCodes } from "http-status-codes";

import authConfig from '../config/auth';
import {ApplicationError} from '../utils';
import {UsersRepository} from '../repositories/implementations';

interface ITokenPayload {
    iat: number,
    exp: number,
    sub: string
}

export default async function adminAuthenticated(
  request: Request, response: Response, next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new ApplicationError('JWT token is missing!', StatusCodes.UNAUTHORIZED);
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as ITokenPayload;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(sub);

    if (user) {
      if (user.role !== 'admin') {
        throw new ApplicationError('User without permission!', StatusCodes.UNAUTHORIZED);
      }
      request.user = {
        id: sub,
      };
      next();
    } else {
      throw new ApplicationError('User not found!', StatusCodes.UNAUTHORIZED);
    }
  } catch (err) {
    throw new ApplicationError('User without permission!', StatusCodes.UNAUTHORIZED);
  }
}
