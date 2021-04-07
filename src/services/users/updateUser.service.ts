import { ApplicationError } from '../../utils';
import { User } from '../../models';
import {IUsersRepository} from '../../repositories/interfaces';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateUserService {
  constructor(
        private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    id, name, email,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findById(id);

    if (!checkUserExists) {
      throw new ApplicationError('User not found');
    }

    const checkUserEmail = await this.usersRepository.findByEmail(email);

    if (checkUserEmail && checkUserEmail.id !== id) {
      throw new ApplicationError('E-mail already in use');
    }

    const user = await this.usersRepository.update({
      id,
      name,
      email,
    });

    return user;
  }
}

export default UpdateUserService;
