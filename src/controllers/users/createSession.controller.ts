import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import {AuthenticateUserService} from '../../services/users';
import {UsersRepository} from '../../repositories/implementations';

export default class CreateSessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService(usersRepository);

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
