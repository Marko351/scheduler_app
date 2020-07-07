import jwt from 'jsonwebtoken';
import errorResponse from '../helpers/errorResponse';

export default (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || 'thisWillChange'
		);
		// Set user data to be visible trough the app
		req.userData = decoded;
		next();
	} catch (error) {
		errorResponse(res, 401, 'You are not authorized. Please log in');
	}
};
