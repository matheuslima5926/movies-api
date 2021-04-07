import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import {UpdateUserService} from '../../services/users';
import {UsersRepository} from '../../repositories/implementations';

export default class UpdateUserController {

  public async update(request: Request, response: Response): Promise<Response> {
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
    return response.json(classToClass(user));
  }

}
