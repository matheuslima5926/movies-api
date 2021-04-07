import Joi from 'joi';
import { CreateGenreDTO } from '../../dtos/genres';
import { ApplicationError } from '../../utils';

export default async ({ title }: CreateGenreDTO): Promise<void> => {

  try {
    const schema = Joi.object({
      title: Joi.string().required(),
    });
  
    await schema.validateAsync({
      title
    });
  } catch (error) {
    console.log(error)
    throw new ApplicationError(error);
  }
  
}