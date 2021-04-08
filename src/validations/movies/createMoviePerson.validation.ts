import Joi from 'joi';
import { CreateMovieGenreDTO } from '../../dtos/movies';
import { ApplicationError } from '../../utils';

export default async ({ genre_id, movie_id, }: CreateMovieGenreDTO): Promise<void> => {

  try {
    const schema = Joi.object({
      genre_id: Joi.string().required().uuid(),
      movie_id: Joi.string().required().uuid(),
    });
  
    await schema.validateAsync({
      genre_id, movie_id,
    });
  } catch (error) {
    throw new ApplicationError(error.details);
  }
  
}