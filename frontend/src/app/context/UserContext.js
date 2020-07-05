import React, { createContext, useReducer } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';
import { SET_USER_DATA } from './types';
import userReducer from '../reducers/userReducer';

const initialState = {
	isAuthenticated: false,
	user: {},
};
const store = createContext(initialState);
const { Provider } = store;

const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialState);

	const userActions = {
		setCurrentUser: (decoded) => {
			dispatch({
				type: SET_USER_DATA,
				payload: { user: decoded, isAuthenticated: true },
			});
		},
		logoutUser: () => {
			localStorage.removeItem('scheduler_token');
			setAuthToken(false);
			dispatch({
				type: SET_USER_DATA,
				payload: { user: {}, isAuthenticated: false },
			});
		},
		loginUser: async (setCurrentUser, data, history) => {
			try {
				const response = await axios.post('/authentication/login', data);
				const { token } = response.data;
				localStorage.setItem('scheduler_token', token);
				setAuthToken(token);
				const decoded = jwt_decode(token);
				setCurrentUser(decoded);
				history.push('/scheduler');
				// dispatch(clearErrors());
			} catch (err) {
				console.log(err);
			}
		},
		registerUser: async (data, history) => {
			try {
				await axios.post('/users/register', data);
				history.push('/login');
			} catch (err) {
				console.log(err);
			}
		},
	};

	return <Provider value={{ state, userActions }}>{children}</Provider>;
};

export { store, UserProvider };
