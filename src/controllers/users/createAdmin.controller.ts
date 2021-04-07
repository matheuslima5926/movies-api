import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import {CreateAdminService} from '../../services/users';
import {UsersRepository} from '../../repositories/implementations';

export default class CreateAdminController {
  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const {
      name, email, password,
    } = request.body;
    const createAdmin = new CreateAdminService(
      usersRepository,
    );
    const admin = await createAdmin.execute({
      name, email, password,
    });
    return response.json(classToClass(admin));
  }

}
