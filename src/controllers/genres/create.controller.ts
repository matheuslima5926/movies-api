import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { CreateGenreService } from '../../services/genres';
import { GenresRepository } from '../../repositories/implementations';
import { buildResponse } from '../../helpers';

import { StatusCodes } from "http-status-codes"

export default class CreateGenreController {
  public async create(request: Request, response: Response): Promise<Object | void> {

    try {
      const genresRepository = new GenresRepository();
      const {
        title,
      } = request.body;
      const createMovie = new CreateGenreService(
        genresRepository,
      );
      const genre = await createMovie.execute({
        title,
      });
      return buildResponse(response, { body: classToClass(genre), statusCode: StatusCodes.CREATED })
    } catch (error) {
      return buildResponse(response, {}, error);
    }
    
  }
}
