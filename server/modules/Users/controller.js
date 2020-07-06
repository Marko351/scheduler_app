import bcrypt from 'bcryptjs';

import errorResponse from '../../helpers/errorResponse';

class UsersController {
	constructor() {}

	async registerUser(req, res, next) {
		try {
			const { User } = req.models;
			const { username, password } = req.body;

			const isUserExists = await User.findOne({
				where: { username },
			});

			if (isUserExists) {
				return errorResponse(
					res,
					400,
					'User with that username already created'
				);
			}

			// Check out password validity
			const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
			const isPasswordValid = password.match(regex);
			if (!isPasswordValid) {
				return errorResponse(
					res,
					400,
					'Password must be at least 8 characters long, must have at least one alphabet letter, one special character and at least one number'
				);
			}

			// Encrypt password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			await User.create({ username, password: hashedPassword });
			res.status(200).json({ msg: 'success' });
		} catch (err) {
			next(err);
		}
	}
}

export default UsersController;
