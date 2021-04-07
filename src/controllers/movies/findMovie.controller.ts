import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { FindOneMovieService } from '../../services/movies';
import { MoviesRepository } from '../../repositories/implementations';

export default class FindMovieController {
  public async show(request: Request, response: Response): Promise<Response> {
    const moviesRepository = new MoviesRepository();
    const { id } = request.params;
    const findOneMovieService = new FindOneMovieService(moviesRepository);
    const movie = await findOneMovieService.execute(id);
    return response.json(classToClass(movie));
  }
}
