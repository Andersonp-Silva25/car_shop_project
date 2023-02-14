import IError from '../Interfaces/IError';

class CreatingError extends Error {
  public status: number;

  constructor(error: IError) {
    super(error.message);
    this.status = error.status;
  }
}

export default CreatingError;