'use client'

import { useRouter } from 'next/navigation'

const mockPQRS = [
  { id: 1, asunto: 'Problema con la cita', tipo: 'Queja', fecha: '2025-06-10', estado: 'En proceso' },
  { id: 2, asunto: 'Consulta sobre horario', tipo: 'Petición', fecha: '2025-06-08', estado: 'Resuelto' },
]

export default function SolicitudesPage() {
  const router = useRouter()

  return (
    <div className="bg-[#F9F6FF] p-10 rounded-2xl shadow-md font-serif">
      <h1 className="text-2xl font-bold mb-8">Mis solicitudes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-sm text-sm">
          <thead className="bg-[#F1EAFE]">
            <tr>
              <th className="py-3 px-4 text-left">Asunto</th>
              <th className="py-3 px-4 text-left">Tipo</th>
              <th className="py-3 px-4 text-left">Fecha</th>
              <th className="py-3 px-4 text-left">Estado</th>
              <th className="py-3 px-4 text-left">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {mockPQRS.map((pqrs) => (
              <tr key={pqrs.id} className="border-b hover:bg-[#faf5ff] transition">
                <td className="py-3 px-4">{pqrs.asunto}</td>
                <td className="py-3 px-4">{pqrs.tipo}</td>
                <td className="py-3 px-4">{pqrs.fecha}</td>
                <td className="py-3 px-4">{pqrs.estado}</td>
                <td className="py-3 px-4">
                  <button
                    className="text-purple-600 hover:underline"
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
    </div>
  )
}
