import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { CreateMovieService } from '../../services/movies';
import { MoviesRepository } from '../../repositories/implementations';

export default class CreateMovieController {
  public async create(request: Request, response: Response): Promise<Response> {
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
    return response.json(classToClass(movie));
  }
}
