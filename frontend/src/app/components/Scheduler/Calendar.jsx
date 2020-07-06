import React, { useContext, useEffect, useState, Fragment } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Modal } from 'react-bootstrap';

import { store as notificationStore } from '../../context/NotificationContext';
import { store as eventStore } from '../../context/EventContext';
import EventForm from './EventForm';

const localizer = momentLocalizer(moment);

const CalendarComponent = (props) => {
	// NOTIFICATION STORE
	const notificationState = useContext(notificationStore);
	const { turnOnNotifiaction } = notificationState;
	// EVENTS STORE
	const eventState = useContext(eventStore);
	const { getAllEvents, updateEvent, createEvent, deleteEvent } = eventState;
	const { events } = eventState.state;
	// COMPONENT STATE
	const [dateClicked, setDateClicked] = useState({});
	const [event, setEvent] = useState({});
	const [modalData, setModalData] = useState({
		isModalOpen: false,
		modalName: '',
	});

	useEffect(() => {
		getAllEvents();
	}, []);

	const eventPropGetterConfig = () => {
		return { style: { backgroundColor: '#ceac02', color: 'white' } };
	};

	const onSelectSlot = (e) => {
		if (e.action === 'click') {
			// PREVENT EVENT DUPLICATION PER DAY
			const isFound = events.find(
				(event) =>
					new Date(event.scheduled_at).getTime() === new Date(e.start).getTime()
			);
			if (isFound) {
				turnOnNotifiaction({
					notificationType: 3,
					message: 'Cannot create more than one event per day',
				});
			} else {
				// OPEN EVENT FORM
				setDateClicked(e.start);
				setModalData({
					...modalData,
					isModalOpen: true,
					modalName: 'Create Event',
				});
			}
		}
	};

	const onSelectEvent = (e) => {
		setEvent(e);
		setModalData({ ...modalData, isModalOpen: true, modalName: 'Edit Event' });
	};

	const closeModal = () => {
		setEvent({});
		setModalData({ ...modalData, isModalOpen: false, modalName: '' });
	};

	return (
		<Fragment>
			<Modal
				show={modalData.isModalOpen}
				onHide={closeModal}
				size='md'
				animation={false}
			>
				<Modal.Header closeButton>
					<Modal.Title id='example-modal-sizes-title-lg'>
						{modalData.modalName}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EventForm
						closeModal={closeModal}
						turnOnNotifiaction={turnOnNotifiaction}
						updateEvent={updateEvent}
						createEvent={createEvent}
						deleteEvent={deleteEvent}
						eventDate={dateClicked}
						event={event}
					/>
				</Modal.Body>
			</Modal>
			<Calendar
				selectable
				localizer={localizer}
				events={events}
				defaultDate={new Date()}
				views={{ month: true }}
				defaultView='month'
				startAccessor='scheduled_at'
				endAccessor='scheduled_at'
				onSelectEvent={onSelectEvent}
				eventPropGetter={eventPropGetterConfig}
				style={{ height: '90%' }}
				onSelectSlot={onSelectSlot}
			/>
		</Fragment>
	);
};

export default CalendarComponent;
