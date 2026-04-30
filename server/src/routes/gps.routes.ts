import { Router } from 'express';
import { GPSController } from '../controllers/gps.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { container } from 'tsyringe';

const gpsRouter = Router();
const gpsController = container.resolve(GPSController);

// POST /api/gps/:tripId/ingest
gpsRouter.post(
  '/:tripId/ingest',
  authMiddleware,
  gpsController.ingestPoint
);

export default gpsRouter;
