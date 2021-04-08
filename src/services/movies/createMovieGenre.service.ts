import { ApplicationError, errors } from '../../utils';
import {IGenresRepository, IMoviesGenresRepository, IMoviesRepository} from '../../repositories/interfaces';
import {MovieGenre} from '../../models';
import { createMovieGenreValidation } from '../../validations/movies';
import { StatusCodes } from 'http-status-codes';

interface IRequest {
    movie_id: string;
    genre_id: string;
}

class CreateMovieGenreService {
  constructor(
        private moviesGenresRepository: IMoviesGenresRepository,
        private moviesRepository: IMoviesRepository,
        private genresRepository: IGenresRepository,

  ) { }

  public async execute({
    movie_id, genre_id,
  }: IRequest): Promise<MovieGenre> {

    await createMovieGenreValidation({movie_id, genre_id,})
    const existsMovie = await this.moviesRepository.findById(movie_id);

    if (!existsMovie) {
      throw new ApplicationError(errors.notFound("movie"), StatusCodes.BAD_REQUEST);
    }

    const existsGenre = await this.genresRepository.findById(genre_id);

    if (!existsGenre) {
      throw new ApplicationError(errors.notFound("genre"), StatusCodes.BAD_REQUEST);
    }

    const movieGenre = await this.moviesGenresRepository.create({
      movie_id, genre_id,
    });

    return movieGenre;
  }
}

export default CreateMovieGenreService;
