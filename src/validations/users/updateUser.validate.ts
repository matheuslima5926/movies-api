import Joi from 'joi';
import { UpdateUserDTO } from '../../dtos/users';
import { ApplicationError } from '../../utils';

export default async ({ email, name, id }: UpdateUserDTO): Promise<void> => {

  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      id: Joi.string().required().uuid(),
      email: Joi.string().required().email(),
    });
  
    await schema.validateAsync({
      email, name, id
    });
  } catch (error) {
    throw new ApplicationError(error.details);
  }
  
}