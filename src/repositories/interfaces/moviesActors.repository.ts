import { CreateMovieActorDTO } from "../../dtos/movies";
import { MovieActor } from "../../models";

export default interface IMoviesActorsRepository {
  create(data: CreateMovieActorDTO): Promise<MovieActor>;
  save(movieActor: MovieActor): Promise<MovieActor>;
}
