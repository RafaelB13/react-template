import { IUserResponse } from '@/core/domain/user.types';
import { IUserRepository } from '../repositories/user.repository';

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<IUserResponse> {
    return this.userRepository.getMe();
  }
}
