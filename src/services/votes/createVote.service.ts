import { ApplicationError } from '../../utils';
import {Vote} from '../../models';
import {IVotesRepository} from '../../repositories/interfaces';
import { createVoteValidation } from '../../validations/votes';

interface IRequest {
    movie_id: string;
    user_id: string;
    grade: number;
}

class CreateVoteService {
  constructor(
        private VotesRepository: IVotesRepository,
  ) { }

  public async execute({
    movie_id, user_id, grade,
  }: IRequest): Promise<Vote> {

    await createVoteValidation({ movie_id, grade, user_id });

    const existsVoteinMovieByUser = await this.VotesRepository.findByUserAndMovie(
      { movie_id, user_id },
    );

    if (existsVoteinMovieByUser) {
      throw new ApplicationError('User has already voted in this movie');
    }

    const vote = await this.VotesRepository.create({
      movie_id, user_id, grade,
    });

    return vote;
  }
}

export default CreateVoteService;
