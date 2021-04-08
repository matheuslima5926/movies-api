import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { CreatePersonService } from '../../services/people';
import { PeopleRepository } from '../../repositories/implementations';
import { StatusCodes } from 'http-status-codes';
import { buildResponse } from '../../helpers';

export default class CreatePersonController {
  public async create(request: Request, response: Response): Promise<Object | void> {

    try {
      const personsRepository = new PeopleRepository();
      const {
        name,
        age,
      } = request.body;
      const createPerson = new CreatePersonService(
        personsRepository,
      );
      const person = await createPerson.execute({
        name,
        age,
      });
      return buildResponse(response, { body: classToClass(person), statusCode: StatusCodes.CREATED });
    } catch (error) {
      return buildResponse(response, error);
    }



  }
}
