import React, { createContext, useReducer } from 'react';

import { TURN_ON_NOTIFICATION, TURN_OF_NOTIFICATION } from './types';
import notificationReducer from '../reducers/notificationReducer';

const initialState = {
	notificationType: null,
	message: '',
};
const store = createContext(initialState);
const { Provider } = store;

const NotificationProvider = ({ children }) => {
	const [state, dispatch] = useReducer(notificationReducer, initialState);

	// NOTIFICATION ACTIONS
	const turnOnNotifiaction = (notification) => {
		dispatch({
			type: TURN_ON_NOTIFICATION,
			payload: notification,
		});
	};
	const turnOfNotification = () => {
		dispatch({
			type: TURN_OF_NOTIFICATION,
		});
	};

	return (
		<Provider value={{ state, turnOnNotifiaction, turnOfNotification }}>
			{children}
		</Provider>
	);
};

export { store, NotificationProvider };
