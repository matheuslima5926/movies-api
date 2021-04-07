import { ApplicationError } from '../../utils';
import {IGenresRepository, IMoviesGenresRepository, IMoviesRepository} from '../../repositories/interfaces';
import {MovieGenre} from '../../models';

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
    const existsMovie = await this.moviesRepository.findById(movie_id);

    if (!existsMovie) {
      throw new ApplicationError('Movie not found!');
    }

    const existsGenre = await this.genresRepository.findById(genre_id);

    if (!existsGenre) {
      throw new ApplicationError('Genre not found!');
    }

    const movieGenre = await this.moviesGenresRepository.create({
      movie_id, genre_id,
    });

    return movieGenre;
  }
}

export default CreateMovieGenreService;
