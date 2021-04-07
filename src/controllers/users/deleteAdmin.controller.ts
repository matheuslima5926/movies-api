import { Request, Response } from 'express';

import {DeleteUserService} from '../../services/users';
import {UsersRepository} from '../../repositories/implementations';

export default class DeleteUserController {

  public async delete(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const { id } = request.params;
    const deleteUser = new DeleteUserService(
      usersRepository,
    );
    await deleteUser.execute(id);
    return response.status(204).send();
  }
}
