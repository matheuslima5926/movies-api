import { Request, Response } from 'express';

import { DeleteUserService } from '../../services/users';
import { UsersRepository } from '../../repositories/implementations';
import { buildResponse } from '../../helpers';
import { StatusCodes } from 'http-status-codes';

export default class DeleteUserController {

  public async delete(request: Request, response: Response): Promise<Object | void> {

    try {
      const usersRepository = new UsersRepository();
      const { id } = request.params;
      const deleteUser = new DeleteUserService(
        usersRepository,
      );
      await deleteUser.execute(id);
      return buildResponse(response, { statusCode: StatusCodes.NO_CONTENT });
    } catch (error) {
      return buildResponse(response, error);
    }

  }
}
