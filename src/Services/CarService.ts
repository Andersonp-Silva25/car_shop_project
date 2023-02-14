import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import CreatingError from '../Utils/CreatingError';

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
    if (!findCar) throw new CreatingError({ status: 404, message: 'Car not found' });
    return this.createCarDomain(findCar);
  }
}

export default CarService;