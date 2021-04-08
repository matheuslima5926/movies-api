import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { CreateVoteService } from '../../services/votes';
import { VotesRepository } from '../../repositories/implementations';
import { StatusCodes } from 'http-status-codes';
import { buildResponse } from '../../helpers';

export default class CreateVoteController {
  public async create(request: Request, response: Response): Promise<Object | void> {

    try {
      const votesRepository = new VotesRepository();
      const {
        movie_id, grade,
      } = request.body;

      const { id } = request.user;

      const createVoteService = new CreateVoteService(
        votesRepository,
      );
      const vote = await createVoteService.execute({
        movie_id, grade, user_id: id,
      });
      return buildResponse(response, { body: classToClass(vote), statusCode: StatusCodes.CREATED });
    } catch (error) {
      return buildResponse(response, error);
    }

  }
}
