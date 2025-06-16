export interface CrearPqrsDTO {
  idTipoPqrs: number
  idCliente: number
  asuntoPqrs: string
  descripcionPqrs: string
}

export interface ActualizarPqrsDTO {
  idTipoPqrs: number
  asuntoPqrs: string
  descripcionPqrs: string
}

export interface PqrsDTO {
  idPqrs: number
  idTipoPqrs: number
  idEmpleadoGestor?: number
  idCliente: number
  asuntoPqrs: string
  descripcionPqrs: string
  idEstadoPqrs: number
  fechaRadicacion: string
  fechaModificacion?: string
  fechaExpiracion?: string
}

export interface ResumenPqrsDTO {
  idPqrs: number
  tipoPqrs: string
  asuntoPqrs: string
  estadoPqrs: string
  fechaRadicacion: string
}

export interface DetallePqrsDTO {
  idPqrs: number
  tipoPqrs: string
  asuntoPqrs: string
  descripcionPqrs: string
  estadoPqrs: string
  fechaRadicacion: string
}

