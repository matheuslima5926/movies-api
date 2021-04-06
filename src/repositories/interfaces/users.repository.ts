import { CreateUserDTO, UpdateUserDTO } from "../../dtos/users";
import { User } from "../../models";

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  update(data: UpdateUserDTO): Promise<User>;
  delete(id: string): Promise<User>;
  save(user: User): Promise<User>;
}
