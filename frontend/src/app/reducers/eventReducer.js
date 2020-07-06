import {
	GET_ALL_EVENTS,
	GET_EVENT,
	UPDATE_EVENT,
	DELETE_EVENT,
	ADD_EVENT,
} from '../context/types';

export default (state, action) => {
	switch (action.type) {
		case GET_ALL_EVENTS:
			return {
				...state,
				events: action.payload,
			};
		case GET_EVENT:
			return {
				...state,
				event: action.payload,
			};
		case UPDATE_EVENT:
			const newEvents = state.events.map((event) => {
				if (event.id === action.payload.id) event = action.payload;
				return event;
			});
			return {
				...state,
				events: newEvents,
			};
		case ADD_EVENT:
			return {
				...state,
				events: [...state.events, action.payload],
			};
		case DELETE_EVENT:
			return {
				...state,
				events: state.events.filter((event) => event.id !== action.payload),
			};
		default:
			return state;
	}
};
