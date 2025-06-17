export interface GestorDTO {
  nombre: string
  apellido: string
  correo: string
  idCargo: number
}

export interface EmpleadoDTO {
  id: number
  nombre: string
  apellido: string
  correo: string
  idCargo: number
  idUsuario: number
}

export interface Gestor {
  id: number
  nombre: string
  apellido: string
  correo: string
  idCargo: number
}

export interface CrearGestorDTO {
  nombre: string
  apellido: string
  correo: string
  idCargo: number
}
