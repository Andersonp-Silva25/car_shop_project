import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(cars: ICar) {
    super(cars);
    this.doorsQty = cars.doorsQty;
    this.seatsQty = cars.seatsQty;
  }

  public getDoorsQty() {
    return this.doorsQty;
  }

  public setDoorsQty(doorsQty: number) {
    this.doorsQty = doorsQty;
  }

  public getSeatsQty() {
    return this.seatsQty;
  }

  public setSeatsQty(seatsQty: number) {
    this.seatsQty = seatsQty;
  }
}

export default Car;