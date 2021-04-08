import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes"

import authConfig from '../../config/auth';
import { ApplicationError, errors } from '../../utils';
import { User } from '../../models';
import { IUsersRepository } from '../../repositories/interfaces';
import { createSessionValidation } from '../../validations/users';

interface IRequest {
  email: string,
  password: string
}

interface IResponse {
  user: User,
  token: string
}

class AuthenticateUserService {
  constructor(
        private usersRepository: IUsersRepository,
  ) { }
  public async execute({ email, password } : IRequest): Promise<IResponse> {

    await createSessionValidation({ email, password });

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ApplicationError(errors.notFound("users"), StatusCodes.NOT_FOUND);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new ApplicationError(errors.invalidCombination, StatusCodes.BAD_REQUEST);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ }, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
