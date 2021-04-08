import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import {AuthenticateUserService} from '../../services/users';
import {UsersRepository} from '../../repositories/implementations';
import { StatusCodes } from 'http-status-codes';
import { buildResponse } from '../../helpers';

export default class CreateSessionController {
  public async create(request: Request, response: Response): Promise<Object | void> {
    try {
      const usersRepository = new UsersRepository();
      const { email, password } = request.body;

      const authenticateUserService = new AuthenticateUserService(usersRepository);

      const { user, token } = await authenticateUserService.execute({
        email,
        password,
      });

      return buildResponse(response, { body: { user: classToClass(user), token }, statusCode: StatusCodes.CREATED });
    } catch (error) {
      return buildResponse(response, error);
    }
    
  }
}
