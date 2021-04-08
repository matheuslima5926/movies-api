import { Router } from 'express';

import { adminAuthenticatedMiddleware } from '../middlewares';
import { CreatePersonController } from '../controllers/people';

const peopleRouter = Router();
const createPersonController = new CreatePersonController();

peopleRouter.post('/', adminAuthenticatedMiddleware, createPersonController.create);

export default peopleRouter;
