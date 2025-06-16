// types/notificacion.ts

export interface NotificacionInstitucionalDTO {
  idNotificacionInstitucional: number
  idEmpleadoAdmin: number
  tituloNotificacion: string
  contenidoNotificacion: string
  fechaPublicacion: string // ISO string
  fechaExpiracion: string  // ISO string
  idTipoPublico: number
}

export interface CrearNotificacionInstitucionalDTO {
  idEmpleadoAdmin: number
  tituloNotificacion: string
  contenidoNotificacion: string
  fechaExpiracion: string
  idTipoPublico: number
}

export interface ActualizarNotificacionInstitucionalDTO {
  tituloNotificacion: string
  contenidoNotificacion: string
  fechaExpiracion: string
  idTipoPublico: number
}
