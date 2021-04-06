import { CreatePersonDTO } from "../../dtos/people";
import { Person } from "../../models";

export default interface IPersonsRepository {
  create(data: CreatePersonDTO): Promise<Person>;
  save(person: Person): Promise<Person>;
  findById(id: string): Promise<Person>;
}
