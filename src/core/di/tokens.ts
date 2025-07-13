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

  // Use Cases
  GetUserUseCase: Symbol.for('GetUserUseCase'),
  UpdateUserUseCase: Symbol.for('UpdateUserUseCase'),
  UploadFileUseCase: Symbol.for('UploadFileUseCase'),
};
