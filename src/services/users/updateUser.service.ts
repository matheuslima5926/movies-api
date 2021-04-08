import { ApplicationError, errors } from '../../utils';
import { User } from '../../models';
import {IUsersRepository} from '../../repositories/interfaces';
import { updateUserValidation } from '../../validations/users';
import { StatusCodes } from 'http-status-codes';

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

    await updateUserValidation({ id, name, email });

    const checkUserExists = await this.usersRepository.findById(id);

    if (!checkUserExists) {
      throw new ApplicationError(errors.notFound("user"), StatusCodes.NOT_FOUND);
    }

    const checkUserEmail = await this.usersRepository.findByEmail(email);

    if (checkUserEmail && checkUserEmail.id !== id) {
      throw new ApplicationError(errors.alreadyExists("email"), StatusCodes.BAD_REQUEST);
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
