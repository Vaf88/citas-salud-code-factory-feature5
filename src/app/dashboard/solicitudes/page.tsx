'use client'

import { useRouter } from 'next/navigation'

const mockPQRS = [
  { id: 1, asunto: 'Problema con la cita', tipo: 'Queja', fecha: '2025-06-10', estado: 'En proceso' },
  { id: 2, asunto: 'Consulta sobre horario', tipo: 'Petición', fecha: '2025-06-08', estado: 'Resuelto' },
]

export default function SolicitudesPage() {
  const router = useRouter()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mis solicitudes</h1>
      <table className="w-full bg-white border rounded shadow text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Asunto</th>
            <th className="p-2 text-left">Tipo</th>
            <th className="p-2 text-left">Fecha</th>
            <th className="p-2 text-left">Estado</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mockPQRS.map((pqrs) => (
            <tr key={pqrs.id} className="border-t">
              <td className="p-2">{pqrs.asunto}</td>
              <td className="p-2">{pqrs.tipo}</td>
              <td className="p-2">{pqrs.fecha}</td>
              <td className="p-2">{pqrs.estado}</td>
              <td className="p-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => router.push(`/dashboard/solicitudes/${pqrs.id}`)}
                >
                  Ver detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
