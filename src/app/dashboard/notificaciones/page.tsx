'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import { crearNotificacion } from '../../../api/notificaciones'
import { CrearNotificacionInstitucionalDTO } from '../../../types/notificaciones'

export default function NotificacionesPage() {
  const router = useRouter()
  const { id } = useAuth()

  const [form, setForm] = useState({
    tituloNotificacion: '',
    contenidoNotificacion: '',
    fechaExpiracion: '',
    idTipoPublico: ''
  })
  const [msg, setMsg] = useState<'exito' | 'error' | ''>('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    const { tituloNotificacion, contenidoNotificacion, fechaExpiracion, idTipoPublico } = form
    if (!tituloNotificacion || !contenidoNotificacion || !fechaExpiracion || !idTipoPublico) {
      setMsg('error')
      return
    }

    const dto: CrearNotificacionInstitucionalDTO = {
      idEmpleadoAdmin: id,
      tituloNotificacion,
      contenidoNotificacion,
      fechaExpiracion: new Date(fechaExpiracion).toISOString(),
      idTipoPublico: Number(idTipoPublico)
    }

    try {
      await crearNotificacion(dto)
      setMsg('exito')
      setForm({
        tituloNotificacion: '',
        contenidoNotificacion: '',
        fechaExpiracion: '',
        idTipoPublico: ''
      })
    } catch (err) {
      console.error('Error creando notificación:', err)
      setMsg('error')
    }
  }

  return (
    <div className="bg-[#F9F6FF] min-h-screen flex justify-center items-center font-serif py-10">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-4xl space-y-10">
        <h1 className="text-2xl font-bold text-center">
          Radicar nueva notificación institucional
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Título</label>
            <input
              name="tituloNotificacion"
              value={form.tituloNotificacion}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Contenido</label>
            <textarea
              name="contenidoNotificacion"
              value={form.contenidoNotificacion}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Fecha de expiración</label>
            <input
              type="datetime-local"
              name="fechaExpiracion"
              value={form.fechaExpiracion}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Público objetivo</label>
            <select
              name="idTipoPublico"
              value={form.idTipoPublico}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              required
            >
              <option value="">Seleccione…</option>
              <option value="1">Clientes</option>
              <option value="2">Empleados</option>
              <option value="3">Todos</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition">
              Crear notificación
            </button>
          </div>

          {msg === 'exito' && <p className="text-green-600 text-center">¡Notificación creada con éxito!</p>}
          {msg === 'error' && <p className="text-red-600 text-center">Faltó algún campo obligatorio o hubo un error.</p>}
        </form>
        <div className="flex justify-center">
        <Link href="/dashboard/notificaciones/lista">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition">
            Ver notificaciones creadas
          </button>
        </Link>
      </div>
      </div>
    </div>
  )
}
