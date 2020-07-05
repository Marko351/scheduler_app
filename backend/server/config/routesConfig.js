import { UserRoutes } from '../modules/Users';
import { AuthenticationRoutes } from '../modules/Authentication';
import { EventRoutes } from '../modules/Events';

import isAuthenticated from './isAuthenticated';

export default (app) => {
	app.use('/api/v1/users', UserRoutes);
	app.use('/api/v1/authentication', AuthenticationRoutes);
	app.use('/api/v1/events', isAuthenticated, EventRoutes);
};
