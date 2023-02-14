import { NextFunction, Request, Response } from 'express';
import CreatingError from '../Utils/CreatingError';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (error instanceof CreatingError) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
    next();
  }
}

export default ErrorHandler;