import { getRepository, Repository } from "typeorm";

import { CreateVoteDTO, FindByUserAndMovieVoteDTO } from "../../dtos/votes";
import { Vote } from "../../models";
import { IVotesRepository } from "../interfaces";

class VotesRepository implements IVotesRepository {
  private ormRepository: Repository<Vote>;

  constructor() {
    this.ormRepository = getRepository(Vote);
  }

  public async create({
    movie_id,
    grade,
    user_id,
  }: CreateVoteDTO): Promise<Vote> {
    const vote = this.ormRepository.create({
      movie_id,
      grade,
      user_id,
    });
    await this.ormRepository.save(vote);
    return vote;
  }

  public async save(Vote: Vote): Promise<Vote> {
    return this.ormRepository.save(Vote);
  }

  public async findByUserAndMovie({
    user_id,
    movie_id,
  }: FindByUserAndMovieVoteDTO): Promise<Vote | undefined> {
    const vote = await this.ormRepository.findOne({
      where: {
        user_id,
        movie_id,
      },
    });
    return vote;
  }
}

export default VotesRepository;
