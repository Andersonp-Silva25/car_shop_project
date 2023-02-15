import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import CreatingError from '../Utils/CreatingError';
import ERROR_MESSAGE from '../Utils/ErrorMessage';

class Motorcycles {
  private createMotorDomain(motor: IMotorcycle): Motorcycle {
    return new Motorcycle(motor);
  }

  public async create(motor: IMotorcycle) {
    const motorODM = new MotorcycleODM();
    const newMotor = await motorODM.create(motor);
    return this.createMotorDomain(newMotor);
  }

  public async find() {
    const motorODM = new MotorcycleODM();
    const findMotor = await motorODM.find();
    const listedMotor = findMotor.map((motor) => this.createMotorDomain(motor));
    return listedMotor;
  }

  public async findById(id: string) {
    const motorODM = new MotorcycleODM();
    const findMotor = await motorODM.findById(id);
    if (!findMotor) throw new CreatingError(ERROR_MESSAGE.MOTOR_NOT_FOUND);
    return this.createMotorDomain(findMotor);
  }

  public async update(id: string, motor: IMotorcycle) {
    const motorODM = new MotorcycleODM();
    const findAndUpdate = await motorODM.update(id, motor);
    if (!findAndUpdate) throw new CreatingError(ERROR_MESSAGE.MOTOR_NOT_FOUND);
    return this.createMotorDomain(findAndUpdate);
  }

  public async delete(id: string) {
    const motorODM = new MotorcycleODM();
    const findAndDelete = await motorODM.delelte(id);
    if (!findAndDelete) throw new CreatingError(ERROR_MESSAGE.MOTOR_NOT_FOUND);
  }
}

export default Motorcycles;