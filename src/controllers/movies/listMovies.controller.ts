import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { FindMovieService } from '../../services/movies';
import { MoviesRepository } from '../../repositories/implementations';
import { buildResponse } from '../../helpers';
import { StatusCodes } from 'http-status-codes';

export default class ListMoviesController {
  public async index(request: Request, response: Response): Promise<Object | void> {

    try {
      const moviesRepository = new MoviesRepository();
      const {
        title, director, actor, genre,
      } = request.query;

      const findMovieService = new FindMovieService(moviesRepository);
      const movies = await findMovieService.execute({
        title: title ? String(title) : undefined,
        director: director ? String(director) : undefined,
        actor: actor ? String(actor) : undefined,
        genre: genre ? String(genre) : undefined,
      });

      return buildResponse(response, { body: classToClass(movies), statusCode: StatusCodes.OK });
    } catch (error) {
      return buildResponse(response, error);
    }

  }
}
