import { Genre } from "../../models";
import { IGenresRepository } from "../../repositories/interfaces";

interface IRequest {
  title: string;
}

class CreateGenreService {
  constructor(private genresRepository: IGenresRepository) {}

  public async execute({ title }: IRequest): Promise<Genre> {
    const Genre = await this.genresRepository.create({
      title,
    });

    return Genre;
  }
}

export default CreateGenreService;
