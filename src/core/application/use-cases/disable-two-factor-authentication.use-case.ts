import { IAuthRepository } from '@/core/application/repositories/auth.repository';

export class DisableTwoFactorAuthenticationUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.disableTwoFactorAuthentication();
  }
}
