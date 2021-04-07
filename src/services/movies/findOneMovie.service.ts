import {Movie} from '../../models';
import {IMoviesRepository} from '../../repositories/interfaces';

class FindOneMovieService {
  constructor(
    private moviesRepository: IMoviesRepository,
  ) { }

  public async execute(id: string): Promise<Movie> {
    return this.moviesRepository.findById(id);
  }
}

export default FindOneMovieService;
