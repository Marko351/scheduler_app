import { UserRoutes } from '../modules/Users';
import { AuthenticationRoutes } from '../modules/Authentication';
import { EventRoutes } from '../modules/Events';

import isAuthenticated from './isAuthenticated';
import { models } from './databaseConfig';

export default (app) => {
	app.use('/api/v1/users', models, UserRoutes);
	app.use('/api/v1/authentication', models, AuthenticationRoutes);
	app.use('/api/v1/events', models, isAuthenticated, EventRoutes);
};
