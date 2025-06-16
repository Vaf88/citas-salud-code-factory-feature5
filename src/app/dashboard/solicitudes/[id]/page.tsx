'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import {
  obtenerPorId,
  actualizarPqrs,
  eliminarPqrs
} from '../../../../api/pqrs'
import { DetallePqrsDTO } from '../../../../types/pqrs'

export default function DetallePQRS() {
  const params = useParams()
  const router = useRouter()

  // 👇 Asegura que el ID sea un número válido
  const id = useMemo(() => {
    const raw = (params as any)?.id
    const parsed = Number(raw)
    return isNaN(parsed) ? null : parsed
  }, [params])

  const [pqrs, setPqrs] = useState<DetallePqrsDTO | null>(null)
  const [loading, setLoading] = useState(true)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)

  const [formData, setFormData] = useState({
    idTipoPqrs: 0,
    asuntoPqrs: '',
    descripcionPqrs: ''
  })


  useEffect(() => {
    if (!id) return
    obtenerPorId(id)
      .then((res) => {
        setPqrs(res.data)

        // Mapea tipoPqrs textual a idTipoPqrs numérico
        const tipoMap = {
          Petición: 1,
          Queja: 2,
          Reclamo: 3,
          Sugerencia: 4
        }

        setFormData({
          idTipoPqrs: tipoMap[res.data.tipoPqrs] || 0,
          asuntoPqrs: res.data.asuntoPqrs,
          descripcionPqrs: res.data.descripcionPqrs
        })
      })
      .catch((err) => console.error('Error cargando detalle PQRS:', err))
      .finally(() => setLoading(false))
  }, [id])


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleGuardar = async () => {
    if (!pqrs) return
    try {
      console.log('Actualizando PQRS con ID:', pqrs.idPqrs)
      const res = await actualizarPqrs(pqrs.idPqrs, formData)
      setPqrs(res.data)
      alert('PQRS actualizada exitosamente.')
      setModoEdicion(false)
    } catch (err) {
      console.error('Error actualizando PQRS:', err)
      alert('No se pudo actualizar la PQRS.')
    }
  }

  const confirmarEliminacion = async () => {
    if (!pqrs || !pqrs.idPqrs) return
    try {
      await eliminarPqrs(pqrs.idPqrs)
      alert('PQRS eliminada exitosamente.')
      router.push('/dashboard/solicitudes')
    } catch (err) {
      console.error('Error eliminando PQRS:', err)
      alert('No se pudo eliminar la PQRS.')
    }
  }

  if (loading) return <p className="p-10">Cargando detalle de la PQRS...</p>
  if (!pqrs) return <p className="p-10">No se encontró la PQRS.</p>

  return (
    <div className="bg-[#F9F6FF] p-10 rounded-2xl shadow-md font-serif">
      <h1 className="text-2xl font-bold mb-8">Detalle de la PQRS #{pqrs.idPqrs}</h1>

      <div className="flex justify-between bg-[#F1EAFE] p-4 rounded-lg shadow-sm mb-6">
        <p><strong>Estado actual:</strong> {pqrs.estadoPqrs}</p>
        <p><strong>Fecha de radicación:</strong> {new Date(pqrs.fechaRadicacion).toLocaleDateString()}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Detalles de la solicitud</h2>
        <p>
          <strong>Tipo:</strong>{' '}
          {modoEdicion ? (
            <select
              name="idTipoPqrs"
              value={formData.idTipoPqrs}
              onChange={(e) => setFormData({ ...formData, idTipoPqrs: parseInt(e.target.value) })}
              className="ml-2 border p-1 rounded"
            >
              <option value={0}>Selecciona un tipo</option>
              <option value={1}>Petición</option>
              <option value={2}>Queja</option>
              <option value={3}>Reclamo</option>
              <option value={4}>Sugerencia</option>
            </select>

          ) : (
            pqrs.tipoPqrs
          )}
        </p>
        <p>
          <strong>Asunto:</strong>{' '}
          {modoEdicion ? (
            <input
              name="asuntoPqrs"
              value={formData.asuntoPqrs}
              onChange={handleInputChange}
              className="ml-2 border p-1 w-full rounded"
            />
          ) : (
            pqrs.asuntoPqrs
          )}
        </p>
        <p>
          <strong>Descripción:</strong>{' '}
          {modoEdicion ? (
            <textarea
              name="descripcionPqrs"
              value={formData.descripcionPqrs}
              onChange={handleInputChange}
              className="ml-2 border p-1 w-full rounded"
            />
          ) : (
            pqrs.descripcionPqrs
          )}
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {modoEdicion ? (
          <button
            onClick={handleGuardar}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Guardar cambios
          </button>
        ) : (
          <button
            onClick={() => setModoEdicion(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Editar
          </button>
        )}
        <button
          onClick={() => setMostrarConfirmacion(true)}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Eliminar
        </button>
      </div>

      {mostrarConfirmacion && (
        <div className="mt-6 p-6 border rounded-lg bg-red-100 text-red-800 shadow-sm">
          <p className="text-lg font-semibold mb-2">¿Estás seguro que deseas eliminar la PQRS?</p>
          <p className="mb-4">¡No puedes revertir esta acción!</p>
          <div className="flex gap-4">
            <button
              onClick={confirmarEliminacion}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Sí
            </button>
            <button
              onClick={() => setMostrarConfirmacion(false)}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
