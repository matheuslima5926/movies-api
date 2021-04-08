import { ApplicationError, errors } from '../../utils';
import {Vote} from '../../models';
import {IVotesRepository} from '../../repositories/interfaces';
import { createVoteValidation } from '../../validations/votes';
import { StatusCodes } from 'http-status-codes';

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
      throw new ApplicationError(errors.alreadyExists("movie_vote_user"), StatusCodes.BAD_REQUEST);
    }

    const vote = await this.VotesRepository.create({
      movie_id, user_id, grade,
    });

    return vote;
  }
}

export default CreateVoteService;
