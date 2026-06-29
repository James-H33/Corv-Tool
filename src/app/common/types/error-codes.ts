export const ErrorCodes = {
  INVALID_USERNAME_OR_PASSWORD: '001',
  USER_NOT_FOUND: '002',
  DATABASE_CONNECTION_ERROR: '003',
  CAR_NOT_FOUND: '004',
  GEMINI_API_ERROR_SERVICE_UNAVAILABLE: '005',
  UNKNOWN_ERROR: '999',
};

export const ErrorCodesReason = {
  '001': 'Invalid username or password',
  '002': 'User not found',
  '003': 'Database connection error',
  '004': 'Car not found',
  '005': 'Gemini API service unavailable',
  '999': 'Unknown error',
};
