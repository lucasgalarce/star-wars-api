import { Router } from 'express';
import peopleController from '../controller/peopleController';
import planetController from '../controller/planetController';

const router = Router();

router.get('/people', peopleController.people);
router.get('/planets', planetController.planet);

export default router;
