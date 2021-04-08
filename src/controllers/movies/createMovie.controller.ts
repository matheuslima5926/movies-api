import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { CreateMovieService } from '../../services/movies';
import { MoviesRepository } from '../../repositories/implementations';
import { buildResponse } from '../../helpers';
import { StatusCodes } from 'http-status-codes';

export default class CreateMovieController {
  public async create(request: Request, response: Response): Promise<Object | void> {
    try {
      const moviesRepository = new MoviesRepository();
      const {
        title, original_title, release_year, rating, duration,
      } = request.body;
      const createMovie = new CreateMovieService(
        moviesRepository,
      );
      const movie = await createMovie.execute({
        title, original_title, release_year, rating, duration,
      });
      return buildResponse(response, { body: classToClass(movie), statusCode: StatusCodes.CREATED });
    } catch (error) {
      return buildResponse(response, error);
    }

  }
}
