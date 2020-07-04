import { Router } from 'express';

import Controller from './controller';

const router = Router();
const controller = new Controller();

router.post('/register', controller.registerUser.bind(controller));

export default router;
