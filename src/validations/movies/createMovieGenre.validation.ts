import Joi from 'joi';
import { CreateMovieActorDTO } from '../../dtos/movies';
import { ApplicationError } from '../../utils';

export default async ({ person_id, movie_id, }: CreateMovieActorDTO): Promise<void> => {

  try {
    const schema = Joi.object({
      genre_id: Joi.string().required().uuid(),
      movie_id: Joi.string().required().uuid(),
    });
  
    await schema.validateAsync({
      person_id, movie_id,
    });
  } catch (error) {
    throw new ApplicationError(error.details);
  }
  
}