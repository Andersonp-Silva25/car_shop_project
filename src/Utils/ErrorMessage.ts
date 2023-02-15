const message = {
  INVALID_MONGO_ID: { status: 422, message: 'Invalid mongo id' },
  CAR_NOT_FOUND: { status: 404, message: 'Car not found' },
  MOTOR_NOT_FOUND: { status: 404, message: 'Motorcycle not found' },
};

export default message;