/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/utils.ts
import { AxiosError } from 'axios';

import { ApiError } from './types';

/**
 * Normaliza e extrai informações de um erro Axios.
 * @param error O erro Axios a ser processado.
 * @returns Um objeto ApiError com uma mensagem padronizada.
 */
export const handleAxiosError = (error: AxiosError): ApiError => {
  let message = 'Ocorreu um erro inesperado.';
  let statusCode = 500;

  if (error.response) {
    // O servidor respondeu com um status de erro (2xx não)
    const { data, status } = error.response;
    statusCode = status;

    if (typeof data === 'object' && data !== null && 'message' in data) {
      message = (data as any).message;
    } else if (typeof data === 'string') {
      message = data;
    } else {
      message = `Erro do servidor: ${status}`;
    }
  } else if (error.request) {
    // A requisição foi feita, mas nenhuma resposta foi recebida
    message = 'Nenhuma resposta recebida do servidor. Verifique sua conexão de rede.';
    statusCode = 0; // Ou outro código para indicar ausência de resposta
  } else {
    // Algo mais aconteceu ao configurar a requisição
    message = error.message;
  }

  return { message, statusCode };
};
