import { Router } from 'express'; 
import MotorController from '../Controllers/MotorController';

const routes = Router();

routes.post(
  '/motorcycles',
  (req, res, next) => new MotorController(req, res, next).create(),
);

routes.get(
  '/motorcycles',
  (req, res, next) => new MotorController(req, res, next).find(),
);

routes.get(
  '/motorcycles/:id',
  (req, res, next) => new MotorController(req, res, next).findById(),
);

routes.put(
  '/motorcycles/:id',
  (req, res, next) => new MotorController(req, res, next).update(),
);

export default routes;