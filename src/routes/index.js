import { Router } from 'express';
import peopleController from '../controller/peopleController';

const router = Router();

router.get('/people', peopleController.people);

export default router;
