import { ApplicationError } from "../../utils"
import {IPeopleRepository, IMoviesDirectorsRepository, IMoviesRepository} from '../../repositories/interfaces';
import {MovieDirector} from '../../models';

interface IRequest {
    movie_id: string;
    person_id: string;
}

class CreateMovieDirectorService {
  constructor(
        private moviesDirectorsRepository: IMoviesDirectorsRepository,
        private moviesRepository: IMoviesRepository,
        private personsRepository: IPeopleRepository,

  ) { }

  public async execute({
    movie_id, person_id,
  }: IRequest): Promise<MovieDirector> {
    const existsMovie = await this.moviesRepository.findById(movie_id);

    if (!existsMovie) {
      throw new ApplicationError('Movie not found!');
    }

    const existsPerson = await this.personsRepository.findById(person_id);

    if (!existsPerson) {
      throw new ApplicationError('Director not found!');
    }

    const movieDirector = await this.moviesDirectorsRepository.create({
      movie_id, person_id,
    });

    return movieDirector;
  }
}

export default CreateMovieDirectorService;
