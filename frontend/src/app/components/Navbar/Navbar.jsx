import React, { useContext, Fragment } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';

import { store } from '../../context/UserContext';

const NavbarComponent = ({ history }) => {
	const userState = useContext(store);
	const { isAuthenticated } = userState.state;
	const { logoutUser } = userState;

	const onLogoutClick = () => {
		logoutUser();
		history.push('/login');
	};

	return (
		<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
			<Navbar.Brand>Scheduler App</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse>
				<Nav className='ml-auto'>
					{!isAuthenticated ? (
						<Fragment>
							<Nav.Item>
								<NavLink to='/register' className='nav-link'>
									Register
								</NavLink>
							</Nav.Item>
							<Nav.Item>
								<NavLink to='/login' className='nav-link'>
									Login
								</NavLink>
							</Nav.Item>{' '}
						</Fragment>
					) : (
						<Nav.Item>
							<Button
								variant='link'
								className='nav-link'
								onClick={onLogoutClick}
							>
								Logout
							</Button>
						</Nav.Item>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

NavbarComponent.propTypes = {};

export default withRouter(NavbarComponent);
