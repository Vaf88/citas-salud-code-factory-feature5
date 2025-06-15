'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Notificacion {
  id: number
  titulo: string
  mensaje: string
  estado: 'Activo' | 'Inactivo'
}

const ESTADOS = ['Activo', 'Inactivo'] as const

export default function NotificacionesPage() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([])
  const [form, setForm] = useState({ titulo: '', mensaje: '', estado: '' })
  const [msg, setMsg] = useState<'exito' | 'error' | 'editado' | 'eliminado' | ''>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { titulo, mensaje, estado } = form

    if (!titulo.trim() || !mensaje.trim() || !estado) {
      setMsg('error')
      return
    }

    const nueva: Notificacion = {
      id: Date.now(),
      titulo,
      mensaje,
      estado: estado as Notificacion['estado'],
    }
    setNotificaciones([nueva, ...notificaciones])
    setMsg('exito')
    setForm({ titulo: '', mensaje: '', estado: '' })
  }

  return (
    <>
      <div className="bg-[#F9F6FF] min-h-screen flex justify-center items-center font-serif py-10">
        <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-4xl space-y-10">
          <h1 className="text-2xl font-bold text-center">
            Radicar nueva notificación institucional
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Título</label>
              <input
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Mensaje</label>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Estado</label>
              <select
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              >
                <option value="">Seleccione…</option>
                {ESTADOS.map(e => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button type="submit" className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition">
                Crear notificación
              </button>
            </div>

            {msg === 'exito' && <p className="text-green-600 text-center">¡Notificación creada con éxito!</p>}
            {msg === 'error' && <p className="text-red-600 text-center">Faltó algún campo obligatorio.</p>}
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
    </>
  )
}
