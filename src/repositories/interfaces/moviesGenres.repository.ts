import { CreateMovieGenreDTO } from "../../dtos/movies";
import { MovieGenre } from "../../models";

export default interface IMoviesGenresRepository {
  create(data: CreateMovieGenreDTO): Promise<MovieGenre>;
  save(movieGenre: MovieGenre): Promise<MovieGenre>;
}
