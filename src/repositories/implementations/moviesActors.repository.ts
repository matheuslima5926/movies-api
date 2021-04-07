import { getRepository, Repository } from "typeorm";

import { CreateMovieActorDTO } from "../../dtos/movies";
import { MovieActor } from "../../models";
import { IMoviesActorsRepository } from "../interfaces";

class MoviesActorsRepository implements IMoviesActorsRepository {
  private ormRepository: Repository<MovieActor>;

  constructor() {
    this.ormRepository = getRepository(MovieActor);
  }

  public async findById(id: string): Promise<MovieActor | undefined> {
    const movie = this.ormRepository.findOne(id);
    return movie;
  }

  public async create({
    person_id,
    movie_id,
  }: CreateMovieActorDTO): Promise<MovieActor> {
    const movie = this.ormRepository.create({
      person_id,
      movie_id,
    });
    await this.ormRepository.save(movie);
    return movie;
  }

  public async save(movieActor: MovieActor): Promise<MovieActor> {
    return this.ormRepository.save(movieActor);
  }
}

export default MoviesActorsRepository;
