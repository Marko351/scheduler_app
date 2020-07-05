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
const userStore = createContext(initialState);
const { Provider } = userStore;

const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialState);

	// Users actions
	const setCurrentUser = (decoded) => {
		dispatch({
			type: SET_USER_DATA,
			payload: { user: decoded, isAuthenticated: true },
		});
	};
	const logoutUser = () => {
		localStorage.removeItem('scheduler_token');
		setAuthToken(false);
		dispatch({
			type: SET_USER_DATA,
			payload: { user: {}, isAuthenticated: false },
		});
	};
	const loginUser = async (setCurrentUser, data, history, notification) => {
		try {
			const response = await axios.post('/authentication/login', data);
			const { token } = response.data;
			localStorage.setItem('scheduler_token', token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			setCurrentUser(decoded);
			history.push('/scheduler');
		} catch (err) {
			console.log(this);
			if (err.response.status === 400) {
				notification({
					notificationType: 1,
					message: err.response.data.message,
				});
			} else {
				notification({
					notificationType: 1,
					message: 'Server Error! Something went wrong',
				});
			}
		}
	};
	const registerUser = async (data, history, notification) => {
		try {
			await axios.post('/users/register', data);
			history.push('/login');
			notification({
				notificationType: 2,
				message: 'User created successfuly, please login',
			});
		} catch (err) {
			if (err.response.status === 400) {
				notification({
					notificationType: 1,
					message: err.response.data.message,
				});
			} else {
				notification({
					notificationType: 1,
					message: 'Server Error! Something went wrong',
				});
			}
		}
	};

	return (
		<Provider
			value={{ state, setCurrentUser, registerUser, logoutUser, loginUser }}
		>
			{children}
		</Provider>
	);
};

export { userStore as store, UserProvider };
