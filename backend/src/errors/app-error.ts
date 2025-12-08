export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusConde: 500, isOperational = true) {
    super(message);
    this.statusCode = statusConde;
    this.isOperational = isOperational;

    //Captura corretamente o stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
