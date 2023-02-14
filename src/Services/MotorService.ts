import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

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
}

export default Motorcycles;