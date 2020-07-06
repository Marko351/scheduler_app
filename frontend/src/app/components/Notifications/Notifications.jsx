import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Toast } from 'react-bootstrap';

import { store } from '../../context/NotificationContext';

const Notifications = () => {
	const notificationState = useContext(store);
	const { notificationType, message } = notificationState.state;
	const { turnOfNotification, turnOnNotifiaction } = notificationState;

	// INTERCEPT ERRORS
	axios.interceptors.response.use(
		(response) => {
			return response;
		},
		(err) => {
			if (err.response.status === 400 || err.response.status === 401) {
				turnOnNotifiaction({
					notificationType: 1,
					message: err.response.data.message,
				});
			} else {
				turnOnNotifiaction({
					notificationType: 1,
					message: 'Server Error! Something went wrong',
				});
			}
			return new Promise((resolve, reject) => {
				console.log(err);
			});
		}
	);

	useEffect(() => {
		if (notificationType) {
			setTimeout(() => {
				turnOfNotification();
			}, 4000);
		}
	}, [notificationType]);

	const onClose = () => {
		turnOfNotification();
	};

	return (
		<Row>
			<Col>
				<Toast
					show={!!notificationType}
					className={`${notificationType === 1 && `bg-danger`} ${
						notificationType === 2 && `bg-success`
					} ${notificationType === 3 && `bg-warning`} notifications`}
					onClose={onClose}
					style={{ zIndex: 10000 }}
					animation={false}
				>
					<Toast.Header className=''>
						{notificationType === 1 && <h5 className='mr-auto mb-0'>Error</h5>}
						{notificationType === 2 && (
							<h5 className='mr-auto mb-0'>Success</h5>
						)}
						{notificationType === 3 && (
							<h5 className='mr-auto mb-0'>Warning</h5>
						)}
					</Toast.Header>
					<Toast.Body className='text-white'>{message}</Toast.Body>
				</Toast>
			</Col>
		</Row>
	);
};

export default Notifications;
