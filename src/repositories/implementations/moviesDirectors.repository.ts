import { getRepository, Repository } from "typeorm";

import { CreateMovieDirectorDTO } from "../../dtos/movies";
import { MovieDirector } from "../../models";
import { IMoviesDirectorsRepository } from "../interfaces";

class MoviesDirectorsRepository implements IMoviesDirectorsRepository {
  private ormRepository: Repository<MovieDirector>;

  constructor() {
    this.ormRepository = getRepository(MovieDirector);
  }

  public async findById(id: string): Promise<MovieDirector | undefined> {
    const movie = this.ormRepository.findOne(id);
    return movie;
  }

  public async create({
    person_id,
    movie_id,
  }: CreateMovieDirectorDTO): Promise<MovieDirector> {
    const movie = this.ormRepository.create({
      person_id,
      movie_id,
    });
    await this.ormRepository.save(movie);
    return movie;
  }

  public async save(movieDirector: MovieDirector): Promise<MovieDirector> {
    return this.ormRepository.save(movieDirector);
  }
}

export default MoviesDirectorsRepository;
