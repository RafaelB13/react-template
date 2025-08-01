import { IUserRepository } from '@/core/application/repositories/user.repository';
import { IUserResponse } from '@/core/domain/user.types';

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<IUserResponse> {
    return this.userRepository.getMe();
  }
}
