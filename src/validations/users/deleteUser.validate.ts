import Joi from 'joi';
import { ApplicationError } from '../../utils';

export default async (id : string): Promise<void> => {

  try {
    const schema = Joi.object({
      id: Joi.string().required().uuid(),
    });
  
    await schema.validateAsync({
      id
    });
  } catch (error) {
    throw new ApplicationError(error.details);
  }
  
}