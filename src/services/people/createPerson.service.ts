import {Person} from '../../models';
import {IPeopleRepository} from '../../repositories/interfaces';
import { createPersonValidation } from '../../validations/people';

interface IRequest {
    name: string;
    age: number;
}

class CreatePersonService {
  constructor(
        private peopleRepository: IPeopleRepository,
  ) { }

  public async execute({
    name,
    age,
  }: IRequest): Promise<Person> {
    await createPersonValidation({ name, age })
    const person = await this.peopleRepository.create({
      name,
      age,
    });

    return person;
  }
}

export default CreatePersonService;
