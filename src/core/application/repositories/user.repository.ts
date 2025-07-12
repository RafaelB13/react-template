import { IUpdateUserDTO, IUserResponse } from '@/core/domain/user.types';

export interface IUserRepository {
  getMe(): Promise<IUserResponse>;
  
  updateUser(id: string, data: IUpdateUserDTO): Promise<IUserResponse>;
}
