import { StatusCodes } from "http-status-codes";
import { MovieActor } from "../../models";
import {
  IPeopleRepository,
  IMoviesActorsRepository,
  IMoviesRepository,
} from "../../repositories/interfaces";
import { ApplicationError, errors } from "../../utils";
import { createMoviePersonValidation } from "../../validations/movies";

interface IRequest {
  movie_id: string;
  person_id: string;
}

class CreateMovieActorService {
  constructor(
    private moviesActorsRepository: IMoviesActorsRepository,
    private moviesRepository: IMoviesRepository,
    private peopleRepository: IPeopleRepository
  ) {}

  public async execute({ movie_id, person_id }: IRequest): Promise<MovieActor> {

    await createMoviePersonValidation({ movie_id, person_id })

    const existsMovie = await this.moviesRepository.findById(movie_id);

    if (!existsMovie) {
      throw new ApplicationError(errors.notFound("movie"), StatusCodes.BAD_REQUEST);
    }

    const existsPerson = await this.peopleRepository.findById(person_id);

    if (!existsPerson) {
      throw new ApplicationError(errors.notFound("actor"), StatusCodes.BAD_REQUEST);
    }

    const movieActor = await this.moviesActorsRepository.create({
      movie_id,
      person_id,
    });

    return movieActor;
  }
}

export default CreateMovieActorService;
