import { Router } from 'express';

import { upload } from '../middleware/upload.middleware';
import { uploadTrip } from '../controllers/trip.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const tripRouter = Router();

tripRouter.post(
  '/upload',
  authMiddleware,
  upload.single('file'),
  uploadTrip
);

export default tripRouter;
