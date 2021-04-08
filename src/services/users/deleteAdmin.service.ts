import { ApplicationError, errors } from '../../utils';
import { User } from '../../models';
import {IUsersRepository} from '../../repositories/interfaces';
import { deleteUserValidation } from '../../validations/users';
import { StatusCodes } from 'http-status-codes';

class DeleteAdminService {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(id: string): Promise<User> {

    await deleteUserValidation(id);

    const checkUserExists = await this.usersRepository.findById(id);

    if (!checkUserExists) {
      throw new ApplicationError(errors.notFound("user"), StatusCodes.NOT_FOUND);
    }

    return this.usersRepository.delete(id);
  }
}

export default DeleteAdminService;
