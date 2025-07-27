export const Token = {
  // Services
  HttpClient: Symbol.for('HttpClient'),
  StorageService: Symbol.for('StorageService'),

  // Gateways
  AuthGateway: Symbol.for('AuthGateway'),
  UserGateway: Symbol.for('UserGateway'),
  UploadGateway: Symbol.for('UploadGateway'),

  // Repositories
  AuthRepository: Symbol.for('AuthRepository'),
  UserRepository: Symbol.for('UserRepository'),
  UploadRepository: Symbol.for('UploadRepository'),
  S3Repository: Symbol.for('S3Repository'),

  // Use Cases
  GetUserUseCase: Symbol.for('GetUserUseCase'),
  UpdateUserUseCase: Symbol.for('UpdateUserUseCase'),
  UploadFileUseCase: Symbol.for('UploadFileUseCase'),
  UploadS3FileUseCase: Symbol.for('UploadS3FileUseCase'),
  ListS3ImagesUseCase: Symbol.for('ListS3ImagesUseCase'),
  EnableTwoFactorAuthenticationUseCase: Symbol.for('EnableTwoFactorAuthenticationUseCase'),
  RequestTwoFactorAuthenticationUseCase: Symbol.for('RequestTwoFactorAuthenticationUseCase'),
  DisableTwoFactorAuthenticationUseCase: Symbol.for('DisableTwoFactorAuthenticationUseCase'),
};
