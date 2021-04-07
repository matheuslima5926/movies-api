import { ApplicationError  } from '../../utils';
import { User } from '../../models';
import { IUsersRepository } from '../../repositories/interfaces';

class DeleteUserService {
  constructor(
        private usersRepository: IUsersRepository,
  ) { }

  public async execute(id: string): Promise<User> {
    const checkUserExists = await this.usersRepository.findById(id);

    if (!checkUserExists) {
      throw new ApplicationError('Usuário não encontrado');
    }

    return this.usersRepository.delete(id);
  }
}

export default DeleteUserService;
