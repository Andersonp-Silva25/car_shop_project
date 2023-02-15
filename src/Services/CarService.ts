import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import CreatingError from '../Utils/CreatingError';
import ERROR_MESSAGE from '../Utils/ErrorMessage';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async find() {
    const carODM = new CarODM();
    const findCars = await carODM.find();
    const listedCars = findCars.map((car) => this.createCarDomain(car));
    return listedCars;
  }

  public async findById(id: string) {
    const carODM = new CarODM();
    const findCar = await carODM.findById(id);
    if (!findCar) throw new CreatingError(ERROR_MESSAGE.CAR_NOT_FOUND);
    return this.createCarDomain(findCar);
  }

  public async update(id: string, car: ICar) {
    const carODM = new CarODM();
    const findAndUpdate = await carODM.update(id, car);
    if (!findAndUpdate) throw new CreatingError(ERROR_MESSAGE.CAR_NOT_FOUND);
    return this.createCarDomain(findAndUpdate);
  }

  public async delete(id: string) {
    const carODM = new CarODM();
    const findAndDelete = await carODM.delelte(id);
    if (!findAndDelete) throw new CreatingError(ERROR_MESSAGE.CAR_NOT_FOUND);
  }
}

export default CarService;