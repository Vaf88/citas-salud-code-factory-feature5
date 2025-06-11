'use client'

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
  const [editandoId, setEditandoId] = useState<number | null>(null)

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

    if (editandoId !== null) {
      // Editar
      setNotificaciones((prev) =>
        prev.map((n) =>
          n.id === editandoId ? { ...n, titulo, mensaje, estado: estado as Notificacion['estado'] } : n
        )
      )
      setMsg('editado')
    } else {
      // Crear
      const nueva: Notificacion = {
        id: Date.now(),
        titulo,
        mensaje,
        estado: estado as Notificacion['estado'],
      }
      setNotificaciones([nueva, ...notificaciones])
      setMsg('exito')
    }

    setForm({ titulo: '', mensaje: '', estado: '' })
    setEditandoId(null)
  }

  const handleEditar = (n: Notificacion) => {
    setForm({ titulo: n.titulo, mensaje: n.mensaje, estado: n.estado })
    setEditandoId(n.id)
    setMsg('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleEliminar = (id: number) => {
    setNotificaciones((prev) => prev.filter((n) => n.id !== id))
    setMsg('eliminado')
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        {editandoId ? 'Editar notificación' : 'Radicar nueva notificación institucional'}
      </h1>

      {/* ---------- Formulario ---------- */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow max-w-xl">
        <div>
          <label className="block mb-1 font-medium" htmlFor="titulo">Título</label>
          <input
            id="titulo"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Seleccione…</option>
            {ESTADOS.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {editandoId ? 'Guardar cambios' : 'Crear notificación'}
        </button>

        {/* Mensajes de validación */}
        {msg === 'exito' && <p className="text-green-600 mt-2">¡Notificación creada con éxito!</p>}
        {msg === 'editado' && <p className="text-blue-600 mt-2">Notificación editada correctamente.</p>}
        {msg === 'eliminado' && <p className="text-red-600 mt-2">Notificación eliminada.</p>}
        {msg === 'error' && <p className="text-red-600 mt-2">Faltó algún campo obligatorio.</p>}
      </form>

      {/* ---------- Lista / mensaje vacío ---------- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Notificaciones creadas</h2>

        {notificaciones.length === 0 ? (
          <div className="bg-gray-100 p-6 rounded text-center">
            <p className="mb-4">No tienes ninguna notificación institucional creada.</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Crear notificación
            </button>
          </div>
        ) : (
          <table className="w-full bg-white border rounded shadow text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Título</th>
                <th className="p-2 text-left">Mensaje</th>
                <th className="p-2 text-left">Estado</th>
                <th className="p-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {notificaciones.map((n) => (
                <tr key={n.id} className="border-t">
                  <td className="p-2">{n.titulo}</td>
                  <td className="p-2">{n.mensaje}</td>
                  <td className="p-2">{n.estado}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEditar(n)}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(n.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}
