import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import {CreateVoteService} from '../../services/votes';
import {VotesRepository} from '../../repositories/implementations';

export default class CreateVoteController {
  public async create(request: Request, response: Response): Promise<Response> {
    const votesRepository = new VotesRepository();
    const {
      movie_id, grade,
    } = request.body;

    const { id } = request.user;

    const createVoteService = new CreateVoteService(
      votesRepository,
    );
    const Vote = await createVoteService.execute({
      movie_id, grade, user_id: id,
    });
    return response.json(classToClass(Vote));
  }
}
