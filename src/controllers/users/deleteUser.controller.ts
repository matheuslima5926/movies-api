import { Request, Response } from 'express';

import { DeleteAdminService } from '../../services/users';
import { UsersRepository } from '../../repositories/implementations';
import { buildResponse } from '../../helpers';
import { StatusCodes } from 'http-status-codes';

export default class DeleteAdminController {

  public async delete(request: Request, response: Response): Promise<Object | void> {

    try {
      const usersRepository = new UsersRepository();
      const { id } = request.params;
      const deleteAdmin = new DeleteAdminService(
        usersRepository,
      );
      await deleteAdmin.execute(id);
      return buildResponse(response, { statusCode: StatusCodes.NO_CONTENT });
    } catch (error) {
      return buildResponse(response, error);
    }

  }
}
