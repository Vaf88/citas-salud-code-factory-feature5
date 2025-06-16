import instance from './axios'
import { EmpleadoDTO, GestorDTO } from '../types/gestor'

export const listarGestores = () =>
  instance.get<EmpleadoDTO[]>('/empleados/gestores')

export const crearGestor = (data: GestorDTO) =>
  instance.post<EmpleadoDTO>('/empleados/gestores', data)

export const actualizarGestor = (id: number, data: GestorDTO) =>
  instance.put<EmpleadoDTO>(`/empleados/gestores/${id}`, data)

export const eliminarGestor = (id: number) =>
  instance.delete(`/empleados/gestores/${id}`)
