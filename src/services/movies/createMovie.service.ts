import {Movie} from '../../models';
import { IMoviesRepository } from '../../repositories/interfaces';
import { createMovieValidation } from '../../validations/movies';

interface IRequest {
    title: string;
    original_title: string;
    rating: number;
    release_year: number;
    duration: number;
}

class CreateMovieService {
  constructor(
        private moviesRepository: IMoviesRepository,
  ) { }

  public async execute({
    title, original_title, release_year, rating, duration,
  }: IRequest): Promise<Movie> {

    await createMovieValidation({title, original_title, release_year, rating, duration,})

    const movie = await this.moviesRepository.create({
      title, original_title, release_year, rating, duration,
    });

    return movie;
  }
}

export default CreateMovieService;
