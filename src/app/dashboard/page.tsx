'use client'

import { useRouter } from 'next/navigation'
import { FileText, FolderOpen } from 'lucide-react'

export default function PrincipalUsuario() {
  const router = useRouter()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Acciones rápidas</h1>
      <div className="flex space-x-6">
        <button
          onClick={() => router.push('/dashboard/nueva-pqrs')}
          className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          <FileText className="mr-2" /> Nueva PQRS
        </button>
        <button
          onClick={() => router.push('/dashboard/solicitudes')}
          className="flex items-center bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
        >
          <FolderOpen className="mr-2" /> Mis solicitudes
        </button>
      </div>
    </div>
  )
}
