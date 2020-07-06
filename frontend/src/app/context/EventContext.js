import React, { createContext, useReducer } from 'react';
import axios from 'axios';

import {
	GET_ALL_EVENTS,
	GET_EVENT,
	ADD_EVENT,
	UPDATE_EVENT,
	DELETE_EVENT,
} from './types';
import eventReducer from '../reducers/eventReducer';

const initialState = {
	events: [],
	event: {},
};
const eventStore = createContext(initialState);
const { Provider } = eventStore;

const EventProvider = ({ children }) => {
	const [state, dispatch] = useReducer(eventReducer, initialState);

	// EVENT ACTIONS
	const getAllEvents = async () => {
		const response = await axios.get('/events/all');
		dispatch({
			type: GET_ALL_EVENTS,
			payload: response.data,
		});
	};

	const getEvent = async (eventId) => {
		const response = await axios.get(`/events/${eventId}`);
		dispatch({
			type: GET_EVENT,
			payload: response.data,
		});
	};

	const updateEvent = async (eventId, data, notification) => {
		const response = await axios.patch(`/events/${eventId}`, data);
		dispatch({
			type: UPDATE_EVENT,
			payload: response.data,
		});
		notification({
			notificationType: 2,
			message: 'Event updated successfuly',
		});
	};

	const createEvent = async (data, notification) => {
		const response = await axios.post('/events/create', data);
		dispatch({
			type: ADD_EVENT,
			payload: response.data,
		});
		notification({
			notificationType: 2,
			message: 'Event created successfuly',
		});
	};

	const deleteEvent = async (eventId, notification) => {
		await axios.delete(`/events/${eventId}`);
		dispatch({
			type: DELETE_EVENT,
			payload: eventId,
		});
		notification({
			notificationType: 2,
			message: 'Event deleted successfuly',
		});
	};

	return (
		<Provider
			value={{
				state,
				getAllEvents,
				getEvent,
				updateEvent,
				createEvent,
				deleteEvent,
			}}
		>
			{children}
		</Provider>
	);
};

export { eventStore as store, EventProvider };
