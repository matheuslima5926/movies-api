import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import {UpdateUserService} from '../../services/users';
import {UsersRepository} from '../../repositories/implementations';
import { StatusCodes } from 'http-status-codes';
import { buildResponse } from '../../helpers';

export default class UpdateUserController {

  public async update(request: Request, response: Response): Promise<Object | void> {

    try {
      const usersRepository = new UsersRepository();
      const { id } = request.params;
      const {
        name, email,
      } = request.body;
      const updateUser = new UpdateUserService(
        usersRepository,
      );
      const user = await updateUser.execute({
        id, name, email,
      });
      return buildResponse(response, { body: classToClass(user), statusCode: StatusCodes.CREATED });
    } catch (error) {
      return buildResponse(response, error);
    }
    
  }

}
