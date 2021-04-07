import { Router } from 'express';

// import { adminAuthenticatedMiddleware } from '../middlewares';
import { CreateGenreController } from '../controllers/genres';

const genresRouter = Router();
const createGenreController = new CreateGenreController();

genresRouter.post('/', createGenreController.create);

export default genresRouter;
