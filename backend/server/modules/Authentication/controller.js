import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import errorResponse from '../../helpers/errorResponse';

class AuthenticationController {
	constructor() {}

	async loginUser(req, res, next) {
		try {
			const { User } = req.models;
			const { password, username } = req.body;

			const userResponse = await User.findOne({
				where: { username },
			});

			// Check if user exists
			if (!userResponse) {
				return errorResponse(res, 400, 'There is no user with that username');
			}

			// Compare password
			const isMatch = await bcrypt.compare(password, userResponse.password);
			if (!isMatch) {
				return errorResponse(res, 400, 'Invalid password');
			}

			//Send user data and jwt token
			const token = jwt.sign(
				{
					userId: userResponse.id,
					username: userResponse.username,
				},
				process.env.JWT_SECRET,
				{ expiresIn: '1 day' }
			);

			res.status(200).json({ token });
		} catch (err) {
			next(err);
		}
	}
}

export default AuthenticationController;
