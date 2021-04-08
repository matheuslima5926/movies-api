import { Router } from 'express';

import { ensureAuthenticatedMiddleware } from '../middlewares';
import { CreateVoteController } from '../controllers/votes';

const votesRouter = Router();
const createVoteController = new CreateVoteController();

votesRouter.post('/', ensureAuthenticatedMiddleware, createVoteController.create);

export default votesRouter;
