'use client'

import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Notificacion {
  id: number
  titulo: string
  mensaje: string
  fecha: string
  estado: 'Activa' | 'Inactiva'
}

export default function ListaNotificacionesPage() {
  const router = useRouter()

  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    {
      id: 1,
      titulo: 'Mantenimiento programado',
      mensaje: 'El portal web estará en mantenimiento el día 8 de Octubre de 2:00AM a 5:00AM.',
      fecha: '14/03/2021',
      estado: 'Inactiva'
    },
    {
      id: 2,
      titulo: 'Nuevas funcionalidades',
      mensaje: 'Se han hecho mejorar para acceder al sistema.',
      fecha: '17/05/2021',
      estado: 'Activa'
    },
    {
      id: 3,
      titulo: 'Cambio de horario',
      mensaje: 'La sede sur amplia su horario de 7:00AM a 7:00PM.',
      fecha: '07/06/2021',
      estado: 'Activa'
    },
    {
      id: 4,
      titulo: 'Cierre temporal',
      mensaje: 'La sede norte estará cerrada el día 11 de Octubre por actividad privada.',
      fecha: '07/10/2025',
      estado: 'Inactiva'
    }
  ])

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [notificacionSeleccionada, setNotificacionSeleccionada] = useState<Notificacion | null>(null)

  const [form, setForm] = useState({ titulo: '', mensaje: '', estado: 'Activa' })

  const handleEditar = (n: Notificacion) => {
    setNotificacionSeleccionada(n)
    setForm({
      titulo: n.titulo,
      mensaje: n.mensaje,
      estado: n.estado
    })
    setShowEditModal(true)
  }

  const handleGuardarEdicion = () => {
    if (!notificacionSeleccionada) return

    setNotificaciones(prev =>
      prev.map(n =>
        n.id === notificacionSeleccionada.id
          ? { ...n, titulo: form.titulo, mensaje: form.mensaje, estado: form.estado as Notificacion['estado'] }
          : n
      )
    )
    setShowEditModal(false)
  }

  const handleConfirmarEliminar = (n: Notificacion) => {
    setNotificacionSeleccionada(n)
    setShowDeleteModal(true)
  }

  const handleEliminar = () => {
    if (notificacionSeleccionada) {
      setNotificaciones(prev => prev.filter(n => n.id !== notificacionSeleccionada.id))
      setShowDeleteModal(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-[#F9F6FF] min-h-screen flex flex-col items-center justify-center py-10 font-serif">
      <h1 className="text-3xl font-bold mb-10">Notificaciones institucionales</h1>

      <div className="bg-[#F5F1FF] p-10 rounded-3xl shadow-md w-full max-w-4xl space-y-6">
        {notificaciones.map((n) => (
          <div key={n.id} className="flex justify-between items-center border-b pb-4">
            <div>
              <div className="flex items-center gap-6">
                <h2 className="font-semibold text-lg">{n.titulo}</h2>
                <span className="text-sm text-gray-500">{n.fecha}</span>
              </div>
              <p className="mt-2 text-gray-700">{n.mensaje}</p>
              <div className="mt-3">
                <span className={`px-4 py-1 rounded-full text-white text-sm ${n.estado === 'Activa' ? 'bg-green-400' : 'bg-red-500'}`}>
                  {n.estado}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => handleEditar(n)} className="text-purple-600 hover:text-purple-800">
                <Pencil size={22} />
              </button>
              <button onClick={() => handleConfirmarEliminar(n)} className="text-red-500 hover:text-red-700">
                <Trash2 size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <button
          onClick={() => router.push('/dashboard/notificaciones')}
          className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition"
        >
          Nueva notificación
        </button>
      </div>

      {/* Modal Eliminar */}
      {showDeleteModal && notificacionSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-[#F5F1FF] p-10 rounded-3xl shadow-lg w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">
              ¿Está seguro que deseas eliminar la Notificación <br />"{notificacionSeleccionada.titulo}"?
            </h2>
            <p className="text-gray-500 mb-6">No puedes revertir esto!</p>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleEliminar}
                className="bg-purple-400 text-white px-6 py-2 rounded hover:bg-purple-500"
              >
                Sí
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-[#F5F1FF] p-10 rounded-3xl shadow-lg w-[90%] max-w-lg">
            <h2 className="text-xl font-semibold mb-6 text-center">Editar Notificación</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Título</label>
                <input
                  name="titulo"
                  value={form.titulo}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
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
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Estado</label>
                <select
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="Activa">Activa</option>
                  <option value="Inactiva">Inactiva</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center gap-6 mt-8">
              <button
                onClick={handleGuardarEdicion}
                className="bg-purple-400 text-white px-6 py-2 rounded hover:bg-purple-500"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


