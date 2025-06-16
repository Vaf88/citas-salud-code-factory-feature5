import instance from './axios'
import { CrearPqrsDTO, ActualizarPqrsDTO, PqrsDTO, DetallePqrsDTO, ResumenPqrsDTO } from '../types/pqrs'

export const obtenerPorId = (idPqrs: number) =>
  instance.get<DetallePqrsDTO>(`/pqrs/${idPqrs}`)

export const obtenerPqrsCliente = (idCliente: number) =>
  instance.get<ResumenPqrsDTO[]>(`/pqrs/cliente/${idCliente}`)

export const crearPqrs = (data: CrearPqrsDTO) =>
  instance.post<PqrsDTO>('/pqrs', data)

export const actualizarPqrs = (id: number, data: ActualizarPqrsDTO) =>
  instance.put<DetallePqrsDTO>(`/pqrs/${id}`, data)

export const eliminarPqrs = (id: number) =>
  instance.delete(`/pqrs/${id}`)

export const obtenerTodasPqrs = () =>
  instance.get<PqrsDTO[]>('/pqrs')

export const asignarGestorPqrs = (idPqrs: number, idGestor: number) =>
  instance.put<PqrsDTO>(`/pqrs/${idPqrs}/gestor/${idGestor}`)
