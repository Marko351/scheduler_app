import { TURN_OF_NOTIFICATION, TURN_ON_NOTIFICATION } from '../context/types';

export default (state, action) => {
	switch (action.type) {
		case TURN_ON_NOTIFICATION:
			return {
				...state,
				notificationType: action.payload.notificationType,
				message: action.payload.message,
			};
		case TURN_OF_NOTIFICATION:
			return {
				...state,
				notificationType: null,
				message: '',
			};
		default:
			return state;
	}
};
