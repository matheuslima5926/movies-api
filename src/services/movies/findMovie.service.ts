import {Movie} from '../../models';
import {IMoviesRepository} from '../../repositories/interfaces';

interface IRequest {
    title?: string;
    director?: string;
    actor?: string;
    genre?: string;
}

class FindMovieService {
  constructor(
    private moviesRepository: IMoviesRepository,
  ) { }

  public async execute({
    title, director, actor, genre,
  }: IRequest): Promise<Movie[]> {
    const movies = await this.moviesRepository.find({
      title, director, actor, genre,
    });

    return movies;
  }
}

export default FindMovieService;
