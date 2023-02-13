import express from 'express';
import carRoutes from './Routes/Car.routes';

const app = express();
app.use(express.json());

app.use(carRoutes);

export default app;
