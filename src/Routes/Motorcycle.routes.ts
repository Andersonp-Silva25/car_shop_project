import { Router } from 'express'; 
import MotorController from '../Controllers/MotorController';

const routes = Router();

routes.post(
  '/motorcycles',
  (req, res, next) => new MotorController(req, res, next).create(),
);

export default routes;