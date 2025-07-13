import { IUserRepository } from '@/core/application/repositories/user.repository';
import { IUpdateUserDTO, IUserResponse } from '@/core/domain/user.types';

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: IUpdateUserDTO): Promise<IUserResponse> {
    return this.userRepository.updateUser(id, data);
  }
}
