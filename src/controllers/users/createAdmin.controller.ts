import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { CreateAdminService } from '../../services/users';
import { UsersRepository } from '../../repositories/implementations';
import { buildResponse } from '../../helpers';
import { StatusCodes } from 'http-status-codes';

export default class CreateAdminController {
  public async create(request: Request, response: Response): Promise<Object | void> {
    try {
      const usersRepository = new UsersRepository();
      const {
        name, email, password, password_confirmation
      } = request.body;
      const createAdmin = new CreateAdminService(
        usersRepository,
      );
      const admin = await createAdmin.execute({
        name, email, password, password_confirmation
      });
      return buildResponse(response, { body: classToClass(admin), statusCode: StatusCodes.CREATED });
    } catch (error) {
      return buildResponse(response, error);
    }

  }

}
