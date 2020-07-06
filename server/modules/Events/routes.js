import { Router } from 'express';

import Controller from './controller';

const router = Router();
const controller = new Controller();

router.get('/all', controller.getAllEvents.bind(controller));
router.get('/:eventId', controller.getEvent.bind(controller));
router.post('/create', controller.createEvent.bind(controller));
router.patch('/:eventId', controller.updateEvent.bind(controller));
router.delete('/:eventId', controller.deleteEvent.bind(controller));

export default router;
