import { CreateVoteDTO, FindByUserAndMovieVoteDTO } from "../../dtos/votes";
import { Vote } from "../../models";

export default interface IVotesRepository {
  create(data: CreateVoteDTO): Promise<Vote>;
  save(vote: Vote): Promise<Vote>;
  findByUserAndMovie(
    data: FindByUserAndMovieVoteDTO
  ): Promise<Vote | undefined>;
}
