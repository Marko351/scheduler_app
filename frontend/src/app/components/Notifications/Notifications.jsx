import React, { useContext, useEffect } from 'react';
import { Row, Col, Toast } from 'react-bootstrap';

import { store } from '../../context/NotificationContext';

const Notifications = () => {
	const notificationState = useContext(store);
	const { notificationType, message } = notificationState.state;
	const { turnOfNotification } = notificationState;

	useEffect(() => {
		if (notificationType) {
			setTimeout(() => {
				turnOfNotification();
			}, 6000);
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
					} notifications`}
					onClose={onClose}
				>
					<Toast.Header className=''>
						{notificationType === 1 && <h5 className='mr-auto mb-0'>Error</h5>}
						{notificationType === 2 && (
							<h5 className='mr-auto mb-0'>Success</h5>
						)}
					</Toast.Header>
					<Toast.Body className='text-white'>{message}</Toast.Body>
				</Toast>
			</Col>
		</Row>
	);
};

export default Notifications;
