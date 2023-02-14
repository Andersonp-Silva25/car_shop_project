import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import carRoutes from './Routes/Car.routes';
import motorRoutes from './Routes/Motorcycle.routes';

const app = express();
app.use(express.json());

app.use(carRoutes);
app.use(motorRoutes);

app.use(ErrorHandler.handle);

export default app;
