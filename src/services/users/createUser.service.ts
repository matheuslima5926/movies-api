import { hash } from 'bcryptjs';

import { ApplicationError } from '../../utils';
import {User} from '../../models';
import {IUsersRepository} from '../../repositories/interfaces';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
  constructor(
        private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    name, email, password,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new ApplicationError('User already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      role: 'user',
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
