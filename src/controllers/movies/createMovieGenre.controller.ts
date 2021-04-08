import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { buildResponse } from '../../helpers';

import { GenresRepository, MoviesGenresRepository, MoviesRepository } from '../../repositories/implementations';
import { CreateMovieGenreService } from '../../services/movies';


export default class MoviesController {
  public async create(request: Request, response: Response): Promise<Object | void> {

    try {
      const moviesGenresRepository = new MoviesGenresRepository();
      const moviesRepository = new MoviesRepository();
      const genresRepository = new GenresRepository();
      const {
        movie_id, genre_id,
      } = request.body;
      const createMovieGenreService = new CreateMovieGenreService(
        moviesGenresRepository,
        moviesRepository,
        genresRepository,
      );
      const movieGenre = await createMovieGenreService.execute({
        movie_id, genre_id,
      });
      return buildResponse(response, { body: classToClass(movieGenre), statusCode: StatusCodes.CREATED });
    } catch (error) {
      return buildResponse(response, error);
    }

  }
}
