import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import carRoutes from './Routes/Car.routes';

const app = express();
app.use(express.json());

app.use(carRoutes);

app.use(ErrorHandler.handle);

export default app;
