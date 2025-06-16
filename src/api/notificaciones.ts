// api/notificaciones.ts

import instance from './axios'
import {
  NotificacionInstitucionalDTO,
  CrearNotificacionInstitucionalDTO,
  ActualizarNotificacionInstitucionalDTO
} from '../types/notificacion'

export const listarNotificaciones = () =>
  instance.get<NotificacionInstitucionalDTO[]>('/notificaciones')

export const obtenerNotificacionPorId = (id: number) =>
  instance.get<NotificacionInstitucionalDTO>(`/notificaciones/${id}`)

export const crearNotificacion = (data: CrearNotificacionInstitucionalDTO) =>
  instance.post<NotificacionInstitucionalDTO>('/notificaciones', data)

export const actualizarNotificacion = (id: number, data: ActualizarNotificacionInstitucionalDTO) =>
  instance.put<NotificacionInstitucionalDTO>(`/notificaciones/${id}`, data)

export const eliminarNotificacion = (id: number) =>
  instance.delete(`/notificaciones/${id}`)
