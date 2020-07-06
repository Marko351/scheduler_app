import { Router } from 'express';

import Controller from './controller';

const controller = new Controller();
const router = Router();

router.post('/login', controller.loginUser.bind(controller));

export default router;
