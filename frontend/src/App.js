import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import { UserProvider } from './app/context/UserContext';
import { NotificationProvider } from './app/context/NotificationContext';
import IsAuthenticated from './app/components/IsAuthenticated/IsAuthenticated.jsx';
import Navbar from './app/components/Navbar/Navbar';
import Login from './app/components/Login/Login';
import Register from './app/components/Register/Register';
import Notifications from './app/components/Notifications/Notifications';

axios.defaults.baseURL = 'http://localhost:5555/api/v1';

function App() {
	return (
		<BrowserRouter>
			<NotificationProvider>
				<UserProvider>
					<IsAuthenticated />
					<Navbar />
					<Notifications />
					<Switch>
						<Route path='/login' component={Login} />
						<Route path='/register' component={Register} />
					</Switch>
				</UserProvider>
			</NotificationProvider>
		</BrowserRouter>
	);
}

export default App;
