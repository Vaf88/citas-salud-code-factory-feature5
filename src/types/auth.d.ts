// src/types/auth.d.ts

export interface LoginRequestDTO {
  correo: string
  clave: string
}

export interface LoginResponseDTO {
  id: number
  token: string
  mensaje: string
  role: string
}

export interface RegistroUsuarioDTO {
  correo: string
  clave: string
  idTipoUsuario: number
}
