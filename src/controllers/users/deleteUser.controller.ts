import { Request, Response } from 'express';

import {DeleteAdminService} from '../../services/users';
import {UsersRepository} from '../../repositories/implementations';

export default class DeleteAdminController {

  public async delete(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const { id } = request.params;
    const deleteAdmin = new DeleteAdminService(
      usersRepository,
    );
    await deleteAdmin.execute(id);
    return response.status(204).send();
  }
}
