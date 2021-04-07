import { getRepository, Repository } from "typeorm";

import { CreateMovieGenreDTO } from "../../dtos/movies";
import { MovieGenre } from "../../models";
import { IMoviesGenresRepository } from "../interfaces";

class MoviesGenresRepository implements IMoviesGenresRepository {
  private ormRepository: Repository<MovieGenre>;

  constructor() {
    this.ormRepository = getRepository(MovieGenre);
  }

  public async findById(id: string): Promise<MovieGenre | undefined> {
    const movie = this.ormRepository.findOne(id);
    return movie;
  }

  public async create({
    genre_id,
    movie_id,
  }: CreateMovieGenreDTO): Promise<MovieGenre> {
    const movie = this.ormRepository.create({
      genre_id,
      movie_id,
    });
    await this.ormRepository.save(movie);
    return movie;
  }

  public async save(movieGenre: MovieGenre): Promise<MovieGenre> {
    return this.ormRepository.save(movieGenre);
  }
}

export default MoviesGenresRepository;
