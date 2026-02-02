import { Router } from 'express';

import { upload } from '../middleware/upload.middleware';
import { uploadTrip, getUserTrips, getTripById, getTripGPSPoints } from '../controllers/trip.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const tripRouter = Router();

tripRouter.post(
  '/upload',
  authMiddleware,
  upload.single('file'),
  uploadTrip
);

tripRouter.get(
  '/user',
  authMiddleware,
  getUserTrips
);

tripRouter.get(
  '/:id',
  authMiddleware,
  getTripById
);

tripRouter.get(
  '/:id/gpspoints',
  authMiddleware,
  getTripGPSPoints
);

export default tripRouter;
