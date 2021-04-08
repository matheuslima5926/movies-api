import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { CreateUserService } from '../../services/users';
import { UsersRepository } from '../../repositories/implementations';
import { StatusCodes } from 'http-status-codes';
import { buildResponse } from '../../helpers';

export default class CreateUserController {
  public async create(request: Request, response: Response): Promise<Object | void> {

    try {
      const usersRepository = new UsersRepository();
      const {
        name, email, password, password_confirmation
      } = request.body;
      const createUser = new CreateUserService(
        usersRepository,
      );
      const user = await createUser.execute({
        name, email, password, password_confirmation
      });
      return buildResponse(response, { body: classToClass(user), statusCode: StatusCodes.CREATED });
    } catch (error) {
      return buildResponse(response, error);
    }
  }

}
