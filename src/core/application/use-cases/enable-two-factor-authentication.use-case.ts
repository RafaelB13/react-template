import { IAuthRepository } from '@/core/application/repositories/auth.repository';

export class EnableTwoFactorAuthenticationUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(token: string): Promise<void> {
    await this.authRepository.enableTwoFactorAuthentication(token);
  }
}
