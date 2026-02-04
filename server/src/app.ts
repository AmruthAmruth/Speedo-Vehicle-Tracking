import express from 'express';
import cors from 'cors';
import router from './routes/auth.routes';
import tripRouter from './routes/trip.routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.middleware';

const app = express();


app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use('/trip', tripRouter);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// 404 Handler - Must be after all routes
app.use(notFoundHandler);

// Global Error Handler - Must be last
app.use(errorHandler);

export default app;
