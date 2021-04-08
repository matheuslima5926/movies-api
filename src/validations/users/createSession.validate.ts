import Joi from 'joi';
import { CreateSessionDTO } from '../../dtos/users';
import { ApplicationError } from '../../utils';

export default async ({ password, email, }: CreateSessionDTO): Promise<void> => {

  try {
    const schema = Joi.object({
      genre_id: Joi.string().required().uuid(),
      movie_id: Joi.string().required().uuid(),
    });
  
    await schema.validateAsync({
      password, email,
    });
  } catch (error) {
    throw new ApplicationError(error.details);
  }
  
}