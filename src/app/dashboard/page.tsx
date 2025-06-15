'use client'

import { useRouter } from 'next/navigation'
import { FileText, FolderOpen } from 'lucide-react'

export default function AccionesRapidas() {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center h-full bg-white">
      <div className="bg-[#F8F4FF] p-10 rounded-2xl shadow-md">
        <h1 className="text-2xl font-serif font-bold mb-8 text-center">Acciones rápidas</h1>
        <div className="flex space-x-10">
          <div
            onClick={() => router.push('/dashboard/nueva-pqrs')}
            className="flex flex-col items-center justify-center w-32 h-32 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <FileText className="w-10 h-10 text-purple-500 mb-2" />
            <span className="text-purple-600 font-serif text-sm">Nueva PQRS</span>
          </div>

          <div
            onClick={() => router.push('/dashboard/solicitudes')}
            className="flex flex-col items-center justify-center w-32 h-32 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <FolderOpen className="w-10 h-10 text-purple-500 mb-2" />
            <span className="text-purple-600 font-serif text-sm">Mis solicitudes</span>
          </div>
        </div>
      </div>
    </div>
  )
}
