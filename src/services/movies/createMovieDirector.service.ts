import { ApplicationError, errors } from "../../utils"
import {IPeopleRepository, IMoviesDirectorsRepository, IMoviesRepository} from '../../repositories/interfaces';
import {MovieDirector} from '../../models';
import { createMoviePersonValidation } from "../../validations/movies";
import { StatusCodes } from "http-status-codes";

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

    await createMoviePersonValidation({ movie_id, person_id })

    const existsMovie = await this.moviesRepository.findById(movie_id);

    if (!existsMovie) {
      throw new ApplicationError(errors.notFound("movie"), StatusCodes.BAD_REQUEST);
    }

    const existsPerson = await this.personsRepository.findById(person_id);

    if (!existsPerson) {
      throw new ApplicationError(errors.notFound("director"), StatusCodes.BAD_REQUEST);
    }

    const movieDirector = await this.moviesDirectorsRepository.create({
      movie_id, person_id,
    });

    return movieDirector;
  }
}

export default CreateMovieDirectorService;
