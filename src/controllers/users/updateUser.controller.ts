import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import {UpdateAdminService} from '../../services/users';
import {UsersRepository} from '../../repositories/implementations';

export default class UpdateAdminController {

  public async update(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const { id } = request.params;
    const {
      name, email,
    } = request.body;
    const updateUser = new UpdateAdminService(
      usersRepository,
    );
    const user = await updateUser.execute({
      id, name, email,
    });
    return response.json(classToClass(user));
  }

}
