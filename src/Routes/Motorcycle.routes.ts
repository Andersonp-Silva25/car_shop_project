import { Router } from 'express'; 
import MotorController from '../Controllers/MotorController';

const routes = Router();

const MOTOCYCLE_ID = '/motorcycles/:id';

routes.post(
  '/motorcycles',
  (req, res, next) => new MotorController(req, res, next).create(),
);

routes.get(
  '/motorcycles',
  (req, res, next) => new MotorController(req, res, next).find(),
);

routes.get(
  MOTOCYCLE_ID,
  (req, res, next) => new MotorController(req, res, next).findById(),
);

routes.put(
  MOTOCYCLE_ID,
  (req, res, next) => new MotorController(req, res, next).update(),
);

routes.delete(
  MOTOCYCLE_ID,
  (req, res, next) => new MotorController(req, res, next).delete(),
);

export default routes;