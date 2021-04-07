import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import {CreateUserService} from '../../services/users';
import {UsersRepository} from '../../repositories/implementations';

export default class CreateUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const {
      name, email, password,
    } = request.body;
    const createUser = new CreateUserService(
      usersRepository,
    );
    const user = await createUser.execute({
      name, email, password,
    });
    return response.json(classToClass(user));
  }

}
