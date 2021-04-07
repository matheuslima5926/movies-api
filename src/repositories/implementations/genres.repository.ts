import { getRepository, Repository } from "typeorm";

import { CreateGenreDTO } from "../../dtos/genres";
import { Genre } from "../../models";
import { IGenresRepository } from "../interfaces";

class GenresRepository implements IGenresRepository {
  private ormRepository: Repository<Genre>;

  constructor() {
    this.ormRepository = getRepository(Genre);
  }

  public async create({ title }: CreateGenreDTO): Promise<Genre> {
    const movie = this.ormRepository.create({
      title,
    });
    await this.ormRepository.save(movie);
    return movie;
  }

  public async save(genre: Genre): Promise<Genre> {
    return this.ormRepository.save(genre);
  }

  public async findById(id: string): Promise<Genre> {
    return this.ormRepository.findOne(id);
  }
}

export default GenresRepository;
