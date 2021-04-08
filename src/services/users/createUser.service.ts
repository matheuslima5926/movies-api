import { hash } from 'bcryptjs';

import { ApplicationError } from '../../utils';
import {User} from '../../models';
import {IUsersRepository} from '../../repositories/interfaces';
import { createUserValidation } from '../../validations/users';

interface IRequest {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    name, email, password, password_confirmation
  }: IRequest): Promise<User> {

    await createUserValidation({ name, email, password, password_confirmation, role: 'user' });

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
