import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import CreatingError from '../Utils/CreatingError';

class Motorcycles {
  private createMotorDomain(motor: IMotorcycle | null): Motorcycle | null {
    if (motor) {
      return new Motorcycle(motor);
    }
    return null;
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
    if (!findMotor) throw new CreatingError({ status: 404, message: 'Motorcycle not found' });
    return this.createMotorDomain(findMotor);
  }

  public async update(id: string, motor: IMotorcycle) {
    const motorODM = new MotorcycleODM();
    const findAndUpdate = await motorODM.update(id, motor);
    if (!findAndUpdate) throw new CreatingError({ status: 404, message: 'Motorcycle not found' });
    return this.createMotorDomain(findAndUpdate);
  }
}

export default Motorcycles;