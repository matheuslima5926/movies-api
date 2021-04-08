import { Router } from 'express';

import { adminAuthenticatedMiddleware } from '../middlewares';
import {
  CreateMovieActorController, 
  CreateMovieDirectorController, 
  CreateMovieGenreController, 
  CreateMovieController,
  FindMovieController,
  ListMoviesController
} from '../controllers/movies';

const moviesRouter = Router();
const createMovieController = new CreateMovieController();
const createMovieGenreController = new CreateMovieGenreController();
const createMovieActorController = new CreateMovieActorController();
const createMovieDirectorController = new CreateMovieDirectorController();
const findMovieController = new FindMovieController();
const listMoviesController = new ListMoviesController();

moviesRouter.post('/', adminAuthenticatedMiddleware, createMovieController.create);
moviesRouter.get('/:id', findMovieController.show);
moviesRouter.get('/', listMoviesController.index);

moviesRouter.post('/movieGenre', adminAuthenticatedMiddleware, createMovieGenreController.create);
moviesRouter.post('/movieActor', adminAuthenticatedMiddleware, createMovieActorController.create);
moviesRouter.post('/movieDirector', adminAuthenticatedMiddleware, createMovieDirectorController.create);

export default moviesRouter;
