import { SET_USER_DATA } from '../context/types';

export default (state, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				isAuthenticated: action.payload.isAuthenticated,
				user: action.payload.user,
			};
		default:
			return state;
	}
};
