import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const EventForm = ({
	updateEvent,
	createEvent,
	deleteEvent,
	eventDate,
	event,
	turnOnNotifiaction,
	closeModal,
}) => {
	const [eventData, setEventData] = useState({
		title: '',
		description: '',
		scheduled_at: null,
	});

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		if (event.id) {
			setEventData({
				...eventData,
				title: event.title,
				description: event.description,
			});
		}
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setEventData({ ...eventData, [name]: value });
	};

	const onCreateClick = () => {
		const data = {
			title: eventData.title,
			description: eventData.description,
			scheduled_at: eventDate,
		};
		createEvent(data, turnOnNotifiaction);
		closeModal();
	};

	const onUpdateClick = () => {
		const data = {
			title: eventData.title,
			description: eventData.description,
		};
		updateEvent(event.id, data, turnOnNotifiaction);
		closeModal();
	};
	const onDeleteClick = () => {
		deleteEvent(event.id, turnOnNotifiaction);
		closeModal();
	};

	return (
		<Fragment>
			<Row>
				<Col>
					<Form.Group>
						<Form.Label>Title</Form.Label>
						<Form.Control
							name='title'
							placeholder='title'
							value={eventData.title}
							onChange={onChange}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='description'
							name='description'
							value={eventData.description}
							onChange={onChange}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col>
					<hr />
				</Col>
			</Row>
			<Row>
				<Col>
					{!event.id ? (
						<Button
							variant='success'
							className='float-right'
							onClick={onCreateClick}
						>
							Create
						</Button>
					) : (
						<Fragment>
							<Button
								variant='danger'
								className='float-right'
								onClick={onDeleteClick}
							>
								Delete
							</Button>
							<Button
								variant='warning'
								className='float-right mr-2'
								onClick={onUpdateClick}
							>
								Update
							</Button>{' '}
						</Fragment>
					)}
				</Col>
			</Row>
		</Fragment>
	);
};

EventForm.propTypes = {
	closeModal: PropTypes.func.isRequired,
	updateEvent: PropTypes.func.isRequired,
	createEvent: PropTypes.func.isRequired,
	deleteEvent: PropTypes.func.isRequired,
	eventDate: PropTypes.object,
	event: PropTypes.object.isRequired,
	turnOnNotifiaction: PropTypes.func.isRequired,
};

export default EventForm;
