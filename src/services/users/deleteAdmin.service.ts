import { ApplicationError } from '../../utils';
import { User } from '../../models';
import {IUsersRepository} from '../../repositories/interfaces';

class DeleteAdminService {
  constructor(
        private usersRepository: IUsersRepository,
  ) { }

  public async execute(id: string): Promise<User> {
    const checkUserExists = await this.usersRepository.findById(id);

    if (!checkUserExists) {
      throw new ApplicationError('Usuário not found');
    }

    return this.usersRepository.delete(id);
  }
}

export default DeleteAdminService;
