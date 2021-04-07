import { Router } from 'express';

import genresRoute from './genres.routes';

const routes = Router();

routes.use('/genres', genresRoute);

export default routes;
