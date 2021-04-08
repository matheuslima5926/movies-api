import { Router } from 'express';

import genresRoute from './genres.routes';
import moviesRoute from './movies.routes';
import peopleRoute from './people.routes';
import adminRoute from './admin.routes';
import usersRoute from './users.routes';
import sessionsRoute from './sessions.routes';
import votesRoute from './votes.routes';

const routes = Router();

routes.use('/genres', genresRoute);
routes.use('/movies', moviesRoute);
routes.use('/people', peopleRoute);
routes.use('/admin', adminRoute);
routes.use('/users', usersRoute);
routes.use('/sessions', sessionsRoute);
routes.use('/votes', peopleRoute);

export default routes;
