import { format } from "date-fns";
import { getRepository, Repository, IsNull } from "typeorm";

import { CreateUserDTO, UpdateUserDTO } from "../../dtos/users";
import { User } from "../../models";
import { IUsersRepository } from "../interfaces";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: {
        id,
        deleted_at: IsNull(),
      },
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: {
        email,
        deleted_at: IsNull(),
      },
    });
    return user;
  }

  public async create({
    name,
    email,
    role,
    password,
  }: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      role,
      password,
    });
    await this.ormRepository.save(user);
    return user;
  }

  public async update({ id, name, email }: UpdateUserDTO): Promise<User> {
    return this.ormRepository.save({
      id,
      name,
      email,
    });
  }

  public async delete(id: string): Promise<User> {
    return this.ormRepository.save({
      id,
      deleted_at: format(new Date(), "yyyy-MM-dd"),
    });
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
