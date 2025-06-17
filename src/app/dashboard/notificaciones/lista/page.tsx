'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import dayjs from 'dayjs'

import {
  listarNotificaciones,
  eliminarNotificacion,
  actualizarNotificacion
} from '../../../../api/notificaciones'
import { NotificacionInstitucionalDTO } from '../../../../types/notificacion'

export default function ListaNotificacionesPage() {
  const [notificaciones, setNotificaciones] = useState<NotificacionInstitucionalDTO[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [notificacionSeleccionada, setNotificacionSeleccionada] = useState<NotificacionInstitucionalDTO | null>(null)

  const [form, setForm] = useState({
    titulo: '',
    mensaje: '',
    fechaExpiracion: '',
    idTipoPublico: ''
  })

  const tiposPublico = [
    { id: 1, nombre: 'Clientes' },
    { id: 2, nombre: 'Empleados' },
    { id: 3, nombre: 'Todos' }
  ]

  useEffect(() => {
    cargarNotificaciones()
  }, [])

  const cargarNotificaciones = () => {
    listarNotificaciones()
      .then(res => setNotificaciones(res.data))
      .catch(() => console.error('Error cargando notificaciones'))
  }

  const calcularEstado = (fechaExpiracion: string): 'Activa' | 'Inactiva' => {
    return dayjs(fechaExpiracion).isAfter(dayjs()) ? 'Activa' : 'Inactiva'
  }

  const handleEditar = (n: NotificacionInstitucionalDTO) => {
    setNotificacionSeleccionada(n)

    const tipoSeleccionado = tiposPublico.find(t => t.id === n.idTipoPublico)

    setForm({
      titulo: n.tituloNotificacion,
      mensaje: n.contenidoNotificacion,
      fechaExpiracion: n.fechaExpiracion,
      idTipoPublico: tipoSeleccionado?.nombre ?? ''
    })

    setShowEditModal(true)
  }

  const handleGuardarEdicion = async () => {
    if (!notificacionSeleccionada) return

    const tipoSeleccionado = tiposPublico.find(tp => tp.nombre === form.idTipoPublico)

    if (!tipoSeleccionado) {
      console.error('Tipo de público no válido')
      return
    }

    try {
      await actualizarNotificacion(notificacionSeleccionada.idNotificacionInstitucional, {
        tituloNotificacion: form.titulo,
        contenidoNotificacion: form.mensaje,
        fechaExpiracion: form.fechaExpiracion,
        idTipoPublico: tipoSeleccionado.id
      })

      setShowEditModal(false)
      cargarNotificaciones()
    } catch {
      console.error('Error actualizando notificación')
    }
  }

  const handleEliminar = async () => {
    if (!notificacionSeleccionada) return

    try {
      await eliminarNotificacion(notificacionSeleccionada.idNotificacionInstitucional)
      setShowDeleteModal(false)
      cargarNotificaciones()
    } catch {
      console.error('Error eliminando notificación')
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
          <div key={n.idNotificacionInstitucional} className="flex justify-between items-center border-b pb-4">
            <div>
              <div className="flex items-center gap-6">
                <h2 className="font-semibold text-lg">{n.tituloNotificacion}</h2>
                <span className="text-sm text-gray-500">
                  Publicado: {dayjs(n.fechaPublicacion).format('DD/MM/YYYY')}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{n.contenidoNotificacion}</p>
              <div className="mt-3">
                <span className={`px-4 py-1 rounded-full text-white text-sm ${calcularEstado(n.fechaExpiracion) === 'Activa' ? 'bg-green-400' : 'bg-red-500'}`}>
                  {calcularEstado(n.fechaExpiracion)}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => handleEditar(n)} className="text-purple-600 hover:text-purple-800">
                <Pencil size={22} />
              </button>
              <button onClick={() => {
                setNotificacionSeleccionada(n)
                setShowDeleteModal(true)
              }} className="text-red-500 hover:text-red-700">
                <Trash2 size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <a
          href="/dashboard/notificaciones"
          className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition"
        >
          Nueva notificación
        </a>
      </div>

      {/* Modal Eliminar */}
      {showDeleteModal && notificacionSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-[#F5F1FF] p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">
              ¿Eliminar notificación &quot;{notificacionSeleccionada.tituloNotificacion}&quot;?
            </h2>
            <p className="text-gray-500 mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-6">
              <button onClick={handleEliminar} className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600">
                Sí
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
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
                <label className="block mb-2 font-medium">Fecha de Expiración</label>
                <input
                  type="datetime-local"
                  name="fechaExpiracion"
                  value={form.fechaExpiracion}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg"
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
                  {tiposPublico.map((tipo) => (
                    <option key={tipo.id} value={tipo.nombre}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center gap-6 mt-8">
              <button
                onClick={handleGuardarEdicion}
                className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
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
