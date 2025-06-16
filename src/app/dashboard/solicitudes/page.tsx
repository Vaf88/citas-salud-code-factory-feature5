'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { obtenerPqrsCliente } from '../../../api/pqrs'
import { PqrsDTO } from '../../../types/pqrs'
import { useAuth } from '../../context/AuthContext'

export default function SolicitudesPage() {
  const router = useRouter()
  const { id } = useAuth()
  const [pqrsList, setPqrsList] = useState<ResumenPqrsDTO[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    obtenerPqrsCliente(id)
      .then((res) => setPqrsList(res.data))
      .catch((err) => console.error('Error cargando PQRS:', err))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="bg-[#F9F6FF] p-10 rounded-2xl shadow-md font-serif">
      <h1 className="text-2xl font-bold mb-8">Mis solicitudes</h1>

      {loading ? (
        <p>Cargando solicitudes...</p>
      ) : pqrsList.length === 0 ? (
        <p>No tienes solicitudes registradas.</p>
      ) : (
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
              {pqrsList.map((pqrs) => (
                <tr key={pqrs.idPqrs} className="border-b hover:bg-[#faf5ff] transition">
                  <td className="py-3 px-4">{pqrs.asuntoPqrs}</td>
                  <td className="py-3 px-4">{pqrs.tipoPqrs}</td>
                  <td className="py-3 px-4">{new Date(pqrs.fechaRadicacion).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{pqrs.estadoPqrs}</td>
                  <td className="py-3 px-4">
                    <button
                      className="text-purple-600 hover:underline"
                      onClick={() => router.push(`/dashboard/solicitudes/${pqrs.idPqrs}`)}
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

