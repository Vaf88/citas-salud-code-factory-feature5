'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function DetallePQRS() {
  const params = useParams()
  const id = params.id

  const [modoEdicion, setModoEdicion] = useState(false)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)

  const pqrs = {
    asunto: 'Problema con la cita',
    tipo: 'Queja',
    fecha: '2025-06-10',
    estado: 'En proceso',
    descripcion: 'Tuve un problema al intentar programar una cita el lunes.',
    archivo: '/archivo_ejemplo.pdf',
    historial: [
      { estado: 'Radicado', fecha: '2025-06-10' },
      { estado: 'En proceso', fecha: '2025-06-11' }
    ]
  }

  const handleEliminar = () => {
    setMostrarConfirmacion(true)
  }

  const confirmarEliminacion = () => {
    alert('PQRS eliminada')
    setMostrarConfirmacion(false)
  }

  return (
    <div className="bg-[#F9F6FF] p-10 rounded-2xl shadow-md font-serif">
      <h1 className="text-2xl font-bold mb-8">Detalle de la PQRS #{id}</h1>

      <div className="flex justify-between bg-[#F1EAFE] p-4 rounded-lg shadow-sm mb-6">
        <p><strong>Estado actual:</strong> {pqrs.estado}</p>
        <p><strong>Fecha de radicación:</strong> {pqrs.fecha}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Detalles de la solicitud</h2>
        <p><strong>Tipo:</strong> {modoEdicion ? <input className="ml-2 border p-1 rounded" defaultValue={pqrs.tipo} /> : pqrs.tipo}</p>
        <p><strong>Asunto:</strong> {modoEdicion ? <input className="ml-2 border p-1 w-full rounded" defaultValue={pqrs.asunto} /> : pqrs.asunto}</p>
        <p><strong>Descripción:</strong> {modoEdicion ? <textarea className="ml-2 border p-1 w-full rounded" defaultValue={pqrs.descripcion} /> : pqrs.descripcion}</p>
        {pqrs.archivo && (
          <p>
            <strong>Archivo adjunto:</strong>{' '}
            <a href={pqrs.archivo} download className="text-purple-600 underline ml-2">
              Descargar archivo
            </a>
          </p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Historial de la solicitud</h2>
        <ul className="list-disc list-inside">
          {pqrs.historial.map((h, idx) => (
            <li key={idx}><strong>{h.estado}</strong> - {h.fecha}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button onClick={() => setModoEdicion(!modoEdicion)} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
          {modoEdicion ? 'Guardar cambios' : 'Editar'}
        </button>
        <button onClick={handleEliminar} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
          Eliminar
        </button>
      </div>

      {mostrarConfirmacion && (
        <div className="mt-6 p-6 border rounded-lg bg-red-100 text-red-800 shadow-sm">
          <p className="text-lg font-semibold mb-2">¿Estás seguro que deseas eliminar la PQRS?</p>
          <p className="mb-4">¡No puedes revertir esta acción!</p>
          <div className="flex gap-4">
            <button onClick={confirmarEliminacion} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">Sí</button>
            <button onClick={() => setMostrarConfirmacion(false)} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition">No</button>
          </div>
        </div>
      )}
    </div>
  )
}
