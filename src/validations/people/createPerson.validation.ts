import Joi from 'joi';
import { CreatePersonDTO } from '../../dtos/people';
import { ApplicationError } from '../../utils';

export default async ({ name, age }: CreatePersonDTO): Promise<void> => {

  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
    });
  
    await schema.validateAsync({
      name, age
    });
  } catch (error) {
    throw new ApplicationError(error.details);
  }
  
}