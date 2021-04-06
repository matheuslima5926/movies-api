import { CreateMovieDirectorDTO } from "../../dtos/movies";
import { MovieDirector } from "../../models";

export default interface IMoviesDirectorsRepository {
  create(data: CreateMovieDirectorDTO): Promise<MovieDirector>;
  save(movieDirector: MovieDirector): Promise<MovieDirector>;
}
