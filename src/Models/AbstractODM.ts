import {
  Schema,
  Model,
  models,
  model,
  isValidObjectId,
  UpdateQuery,
} from 'mongoose';
import CreatingError from '../Utils/CreatingError';
import ERROR_MESSAGE from '../Utils/ErrorMessage';

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
    if (!isValidObjectId(id)) throw new CreatingError(ERROR_MESSAGE.INVALID_MONGO_ID);
    return this.model.findById(id);
  }

  public async update(id: string, vehicle: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(id)) throw new CreatingError(ERROR_MESSAGE.INVALID_MONGO_ID);
    return this.model.findByIdAndUpdate(
      { _id: id },
      { ...vehicle } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async delelte(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new CreatingError(ERROR_MESSAGE.INVALID_MONGO_ID);
    return this.model.findByIdAndDelete(id);
  }
}

export default AbstractODM;