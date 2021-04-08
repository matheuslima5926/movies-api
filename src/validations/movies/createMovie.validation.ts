import Joi from 'joi';
import { CreateMovieDTO } from '../../dtos/movies';
import { ApplicationError } from '../../utils';

export default async ({ title, original_title, release_year, rating, duration }: CreateMovieDTO): Promise<void> => {

  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      original_title: Joi.string().required(),
      release_year: Joi.number().required(),
      rating: Joi.number().required(),
      duration: Joi.number().required(),
    });
  
    await schema.validateAsync({
      title, original_title, release_year, rating, duration,
    });
  } catch (error) {
    throw new ApplicationError(error.details);
  }
  
}