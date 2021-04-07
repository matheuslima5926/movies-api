import { MovieActor } from "../../models";
import {
  IPeopleRepository,
  IMoviesActorsRepository,
  IMoviesRepository,
} from "../../repositories/interfaces";
import { ApplicationError } from "../../utils";

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
    const existsMovie = await this.moviesRepository.findById(movie_id);

    if (!existsMovie) {
      throw new ApplicationError("Movie not found!");
    }

    const existsPerson = await this.peopleRepository.findById(person_id);

    if (!existsPerson) {
      throw new ApplicationError("Actor not found!");
    }

    const movieActor = await this.moviesActorsRepository.create({
      movie_id,
      person_id,
    });

    return movieActor;
  }
}

export default CreateMovieActorService;
