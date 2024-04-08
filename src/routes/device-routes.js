import { Router } from 'express';
import { listDevices, rainfallIntensityMeasurement } from '../controllers/device-controller.js';

const router = Router();

router.route('/list').get(listDevices);
router.route('/measurement').get(rainfallIntensityMeasurement);

export default router;