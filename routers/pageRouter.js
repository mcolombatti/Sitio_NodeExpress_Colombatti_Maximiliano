 import express from 'express';

import controller from '../controllers/controller.js';

const router = express.Router();

router.get('/', controller.view);
router.get('/contacto', controller.viewContact);
 
export default router
 