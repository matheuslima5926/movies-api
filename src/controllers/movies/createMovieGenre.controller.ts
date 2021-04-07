import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { GenresRepository, MoviesGenresRepository, MoviesRepository } from '../../repositories/implementations';
import { CreateMovieGenreService } from '../../services/movies';


export default class MoviesController {
  public async create(request: Request, response: Response): Promise<Response> {
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
    return response.json(classToClass(movieGenre));
  }
}
