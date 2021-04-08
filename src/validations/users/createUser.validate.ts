import Joi from 'joi';
import { CreateUserDTO } from '../../dtos/users';
import { ApplicationError } from '../../utils';

export default async ({ password, email, name, password_confirmation }: CreateUserDTO): Promise<void> => {

  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      password_confirmation: Joi.any().valid(Joi.ref('password')).required(),
    });
  
    await schema.validateAsync({
      name, email, password, password_confirmation,
    });
  } catch (error) {
    throw new ApplicationError(error.details);
  }
  
}