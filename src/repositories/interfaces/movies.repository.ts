import { CreateMovieDTO, SearchMoviesDTO } from "../../dtos/movies";
import { Movie } from "../../models";

export default interface IMoviesRepository {
  find(data: SearchMoviesDTO): Promise<Movie[] | undefined>;
  findById(id: string): Promise<Movie | undefined>;
  create(data: CreateMovieDTO): Promise<Movie>;
  save(movie: Movie): Promise<Movie>;
}
