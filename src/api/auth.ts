// src/api/auth.ts

import axios from './axios'
import {
  LoginRequestDTO,
  LoginResponseDTO,
  RegistroUsuarioDTO,
} from '../types/auth'
import { AxiosResponse } from 'axios'

export const loginRequest = (
  data: LoginRequestDTO
): Promise<AxiosResponse<LoginResponseDTO>> => {
  return axios.post('/usuarios/login', data)
}

export const registerRequest = (
  data: RegistroUsuarioDTO
): Promise<AxiosResponse<any>> => {
  return axios.post('/usuarios/registro', data)
}
