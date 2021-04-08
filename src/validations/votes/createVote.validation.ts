import Joi from 'joi';
import { CreateVoteDTO } from '../../dtos/votes';
import { ApplicationError } from '../../utils';

export default async ({ movie_id, grade }: CreateVoteDTO): Promise<void> => {

  try {
    const schema = Joi.object({
      movie_id: Joi.string().required(),
      grade: Joi.number().min(0).max(4).required(),
    });
  
    await schema.validateAsync({
      movie_id, grade
    });
  } catch (error) {
    throw new ApplicationError(error.details);
  }
  
}