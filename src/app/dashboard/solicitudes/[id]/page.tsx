'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function DetallePQRS() {
  const params = useParams()
  const id = params.id

  const [modoEdicion, setModoEdicion] = useState(false)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)

  // Simulación de la PQRS (esto sería un fetch real en producción)
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
    // Lógica para eliminar la PQRS
    alert('PQRS eliminada')
    setMostrarConfirmacion(false)
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Detalle de la PQRS #{id}</h1>

      <div className="flex justify-between bg-gray-100 p-4 rounded">
        <p><strong>Estado actual:</strong> {pqrs.estado}</p>
        <p><strong>Fecha de radicación:</strong> {pqrs.fecha}</p>
      </div>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Detalles de la solicitud</h2>
        <p><strong>Tipo:</strong> {modoEdicion ? <input className="ml-2 border p-1" defaultValue={pqrs.tipo} /> : pqrs.tipo}</p>
        <p><strong>Asunto:</strong> {modoEdicion ? <input className="ml-2 border p-1 w-full" defaultValue={pqrs.asunto} /> : pqrs.asunto}</p>
        <p><strong>Descripción:</strong> {modoEdicion ? <textarea className="ml-2 border p-1 w-full" defaultValue={pqrs.descripcion} /> : pqrs.descripcion}</p>
        {pqrs.archivo && (
          <p>
            <strong>Archivo adjunto:</strong> <a href={pqrs.archivo} download className="text-blue-600 underline ml-2">Descargar archivo</a>
          </p>
        )}
      </div>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Historial de la solicitud</h2>
        <ul className="list-disc list-inside">
          {pqrs.historial.map((h, idx) => (
            <li key={idx}><strong>{h.estado}</strong> - {h.fecha}</li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4">
        <button onClick={() => setModoEdicion(!modoEdicion)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {modoEdicion ? 'Guardar cambios' : 'Editar'}
        </button>
        <button onClick={handleEliminar} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Eliminar
        </button>
      </div>

      {mostrarConfirmacion && (
        <div className="mt-6 p-4 border rounded bg-red-50 text-red-800">
          <p className="text-lg font-semibold">¿Estas seguro que deseas eliminar la PQRS?</p>
          <p className="mb-4">¡No puedes revertir esto!</p>
          <div className="flex gap-4">
            <button onClick={confirmarEliminacion} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Sí</button>
            <button onClick={() => setMostrarConfirmacion(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">No</button>
          </div>
        </div>
      )}
    </div>
  )
}
