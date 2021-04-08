import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { FindOneMovieService } from '../../services/movies';
import { MoviesRepository } from '../../repositories/implementations';
import { buildResponse } from '../../helpers';
import { StatusCodes } from 'http-status-codes';

export default class FindMovieController {
  public async show(request: Request, response: Response): Promise<Object | void> {

    try {
      const moviesRepository = new MoviesRepository();
      const { id } = request.params;
      const findOneMovieService = new FindOneMovieService(moviesRepository);
      const movie = await findOneMovieService.execute(id);
      return buildResponse(response, { body: classToClass(movie), statusCode: StatusCodes.CREATED });
    } catch (error) {
      return buildResponse(response, error);
    }
    
  }
}
