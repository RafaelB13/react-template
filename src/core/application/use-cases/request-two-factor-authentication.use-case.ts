import { IAuthRepository } from '@/core/application/repositories/auth.repository';

export class RequestTwoFactorAuthenticationUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.requestTwoFactorAuthentication();
  }
}
