import { Router } from 'express';

import { CreateSessionController } from '../controllers/users';

const sessionsRouter = Router();
const createSessionController = new CreateSessionController();

sessionsRouter.post('/', createSessionController.create);

export default sessionsRouter;
