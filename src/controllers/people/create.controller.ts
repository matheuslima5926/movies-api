import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { CreatePersonService } from '../../services/people';
import { PeopleRepository } from '../../repositories/implementations';

export default class CreatePersonController {
  public async create(request: Request, response: Response): Promise<Response> {
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
    return response.json(classToClass(person));
  
  }
}
