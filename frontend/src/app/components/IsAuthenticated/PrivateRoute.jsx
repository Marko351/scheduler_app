import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { store as userStore } from '../../context/UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const userState = useContext(userStore);
	const { isAuthenticated } = userState.state;
	return (
		<Route
			{...rest}
			render={(props) => {
				return isAuthenticated === true ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				);
			}}
		/>
	);
};

export default PrivateRoute;
