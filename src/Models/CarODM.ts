import { Schema } from 'mongoose';
import AbstractODM from './AbstractODM';
import ICar from '../Interfaces/ICar';

class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      buyValue: { type: Number, required: true },
      status: { type: Boolean, required: false },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super(schema, 'Car');
  }
}

export default CarODM;