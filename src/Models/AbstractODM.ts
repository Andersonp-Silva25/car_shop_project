import {
  Schema,
  Model,
  models,
  model,
  isValidObjectId,
} from 'mongoose';
import CreatingError from '../Utils/CreatingError';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new CreatingError({ status: 422, message: 'Invalid mongo id' });
    return this.model.findById(id);
  }
}

export default AbstractODM;