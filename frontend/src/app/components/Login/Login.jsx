import React, { useState, useContext, useEffect } from 'react';
import {
	FormGroup,
	InputGroup,
	FormControl,
	Container,
	Row,
	Col,
	Card,
	Button,
} from 'react-bootstrap';

import { store } from '../../context/UserContext';

const Login = ({ history }) => {
	const userState = useContext(store);
	const { loginUser, setCurrentUser } = userState.userActions;
	const { isAuthenticated } = userState.state;
	const [userData, setUserData] = useState({
		username: '',
		password: '',
	});

	useEffect(() => {
		if (isAuthenticated) history.push('/scheduler');
	}, []);

	const onChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const onSubmit = () => {
		loginUser(setCurrentUser, userData, history);
	};
	return (
		<Container className='centered'>
			<Row>
				<Col md={3}></Col>
				<Col md={6}>
					<Card>
						<Card.Body>
							<h3>Login</h3>
							<FormGroup>
								<label>Username</label>
								<InputGroup size='sm' className='mb-3'>
									<FormControl
										placeholder='username'
										value={userData.username}
										name='username'
										type='text'
										onChange={onChange}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup>
								<label>Password</label>
								<InputGroup size='sm' className='mb-3'>
									<FormControl
										placeholder='password'
										value={userData.password}
										name='password'
										type='password'
										onChange={onChange}
									/>
								</InputGroup>
							</FormGroup>
							<Button variant='primary' onClick={onSubmit}>
								Submit
							</Button>
						</Card.Body>
					</Card>
				</Col>
				<Col md={3}></Col>
			</Row>
		</Container>
	);
};

export default Login;
