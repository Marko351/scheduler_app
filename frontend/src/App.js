import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import { UserProvider, store } from './app/context/UserContext';
import IsAuthenticated from './app/components/IsAuthenticated/IsAuthenticated.jsx';
import Navbar from './app/components/Navbar/Navbar';
import Login from './app/components/Login/Login';
import Register from './app/components/Register/Register';

axios.defaults.baseURL = 'http://localhost:5555/api/v1';

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<IsAuthenticated />
				<Navbar />
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
				</Switch>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
