import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { store } from '../../context/UserContext';
import setAuthToken from '../../utils/setAuthToken';

const IsAuthenticated = (props) => {
	const userState = useContext(store);
	const { setCurrentUser, logoutUser } = userState.userActions;

	useEffect(() => {
		let decoded = null;
		if (localStorage.scheduler_token) {
			//set headers
			setAuthToken(localStorage.scheduler_token);
			// get user info end exp
			decoded = jwt_decode(localStorage.scheduler_token);
			// Set user and isAuthenticated
			setCurrentUser(decoded);
			//Check for expired token
			const currentTime = Date.now() / 1000;
			if (decoded.exp < currentTime) {
				// logout User
				logoutUser();
			}
		}
	}, []);

	if (userState.state.isAuthenticated) {
		return <Redirect to='/scheduler' />;
	} else {
		return <Redirect to='/login' />;
	}
};

export default IsAuthenticated;
