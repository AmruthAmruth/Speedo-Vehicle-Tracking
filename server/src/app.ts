import express from 'express';
import cors from 'cors';
import router from './routes/auth.routes';
import tripRouter from './routes/trip.routes';

const app = express();


app.use(cors());
app.use(express.json());
app.use('/api',router)
app.use('/trip',tripRouter)

app.get('/', (req, res) => {
  res.send('API is running...');
});
 
export default app;
 