import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorService from '../Services/MotorService';

class MotorController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorService();
  }

  public async create() {
    const motor: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,      
    };

    try {
      const newMotor = await this.service.create(motor);
      return this.res.status(201).json(newMotor);
    } catch (error) {
      this.next(error);
    }
  }

  public async find() {
    try {
      const findAllMotors = await this.service.find();
      return this.res.status(200).json(findAllMotors);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    const { id } = this.req.params;
    try {
      const findMotor = await this.service.findById(id);
      return this.res.status(200).json(findMotor);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;
    const motor: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const updateMotor = await this.service.update(id, motor);
      return this.res.status(200).json(updateMotor);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorController;