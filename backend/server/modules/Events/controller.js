import errorResponse from '../../helpers/errorResponse';

class EventsController {
	constructor() {}

	async getAllEvents(req, res, next) {
		try {
			const { Event } = req.models;
			const { userId } = req.userData;

			const eventResponse = await Event.findAll({
				where: { created_by: userId },
			});

			res.status(200).json(eventResponse);
		} catch (err) {
			next(err);
		}
	}

	async getEvent(req, res, next) {
		try {
			const { Event } = req.models;
			const { eventId } = req.params;
			const eventResponse = await Event.findOne({
				where: { id: eventId },
			});

			res.status(200).json(eventResponse);
		} catch (err) {
			next(err);
		}
	}

	async createEvent(req, res, next) {
		try {
			// Validate data user entered
			const isValidationError = this.validateEvent(res, { ...req.body });
			if (isValidationError) {
				return errorResponse(
					res,
					400,
					'Validation error! All fields have to be filled'
				);
			}

			const { Event } = req.models;
			const data = {
				...req.body,
				created_by: req.userData.userId,
			};
			const createdEvent = await Event.create(data);
			res.status(200).json(createdEvent);
		} catch (err) {
			next(err);
		}
	}

	async updateEvent(req, res, next) {
		try {
			// Validate data user entered
			const isValidationError = this.validateEvent(res, { ...req.body });
			if (isValidationError) {
				return errorResponse(
					res,
					400,
					'Validation error! All fields have to be filled'
				);
			}

			const { Event } = req.models;
			const { eventId } = req.params;
			const data = {
				...req.body,
			};
			const [rowsUpdated, [updatedEvent]] = await Event.update(
				{ ...data },
				{ returning: true, where: { id: eventId } }
			);
			res.status(200).json(updatedEvent);
		} catch (err) {
			next(err);
		}
	}

	async deleteEvent(req, res, next) {
		try {
			const { Event } = req.models;
			const { eventId } = req.params;
			await Event.destroy({
				where: { id: eventId },
			});
			res.status(200).json({ msg: 'success' });
		} catch (err) {
			next(err);
		}
	}

	validateEvent(res, data) {
		let isEmpty = false;
		Object.keys(data).forEach((key) => {
			if (!data[key]) {
				isEmpty = true;
			}
		});
		return isEmpty;
	}
}

export default EventsController;
