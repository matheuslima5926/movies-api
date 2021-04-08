import { ApplicationError  } from '../../utils';
import { User } from '../../models';
import { IUsersRepository } from '../../repositories/interfaces';
import { deleteUserValidation } from '../../validations/users';

class DeleteUserService {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(id: string): Promise<User> {

    await deleteUserValidation(id);


    const checkUserExists = await this.usersRepository.findById(id);

    if (!checkUserExists) {
      throw new ApplicationError('Usuário não encontrado');
    }

    return this.usersRepository.delete(id);
  }
}

export default DeleteUserService;
