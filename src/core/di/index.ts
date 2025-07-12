
import { GetUserUseCase } from '@/core/application/use-cases/get-user.use-case';
import { UpdateUserUseCase } from '@/core/application/use-cases/update-user.use-case';
import { UploadFileUseCase } from '@/core/application/use-cases/upload-file.use-case';
import { AxiosHttpClient } from '@/core/infrastructure/api/axios';
import { AuthGateway } from '@/core/infrastructure/gateways/auth-gateway';
import { UploadGateway } from '@/core/infrastructure/gateways/upload-gateway';
import { UserGateway } from '@/core/infrastructure/gateways/user-gateway';
import { StorageService } from '@/core/infrastructure/services/storage';

// --- Instantiation of Services ---
const storageService = new StorageService();
const httpClient = new AxiosHttpClient();
// ----------------------------------

// --- Instantiation of Repositories ---
const authRepository = new AuthGateway(storageService, httpClient);
const userRepository = new UserGateway(storageService, httpClient);
const uploadRepository = new UploadGateway(httpClient);
// ------------------------------------

// --- Instantiation of Use Cases ---
export const getUserUseCase = new GetUserUseCase(userRepository);
export const updateUserUseCase = new UpdateUserUseCase(userRepository);
export const uploadFileUseCase = new UploadFileUseCase(uploadRepository);
// ---------------------------------

// --- Instantiation of Services that can be used directly ---
export const authService = authRepository;
// ---------------------------------------------------------
