import { CreateGenreDTO } from "../../dtos/genres";
import { Genre } from "../../models";

export default interface IGenresRepository {
  findById(id: string): Promise<Genre>;
  create(data: CreateGenreDTO): Promise<Genre>;
  save(genre: Genre): Promise<Genre>;
}
