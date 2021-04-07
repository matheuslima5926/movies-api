import { getRepository, Repository } from "typeorm";

import { CreatePersonDTO } from "../../dtos/people";
import { Person } from "../../models";
import { IPeopleRepository } from "../interfaces";

class PeopleRepository implements IPeopleRepository {
  private ormRepository: Repository<Person>;

  constructor() {
    this.ormRepository = getRepository(Person);
  }

  public async create({ name, age }: CreatePersonDTO): Promise<Person> {
    const person = this.ormRepository.create({
      name,
      age,
    });
    await this.ormRepository.save(person);
    return person;
  }

  public async save(person: Person): Promise<Person> {
    return this.ormRepository.save(person);
  }

  public async findById(id: string): Promise<Person> {
    return this.ormRepository.findOne(id);
  }
}

export default PeopleRepository;
