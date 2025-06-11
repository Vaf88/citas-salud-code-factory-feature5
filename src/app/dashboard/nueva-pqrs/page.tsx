'use client'

import { useState } from 'react'

export default function NuevaPQRSPage() {
  const [tipo, setTipo] = useState('')
  const [asunto, setAsunto] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [archivo, setArchivo] = useState<File | null>(null)

  const tipos = ['Petición', 'Queja', 'Reclamo', 'Sugerencia']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar la solicitud al backend
    console.log({ tipo, asunto, descripcion, archivo })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Radicar Nueva PQRS</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1 font-medium">Tipo de solicitud</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="">Seleccione...</option>
            {tipos.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Asunto</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Descripción detallada</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Adjuntar archivo</label>
          <input
            type="file"
            onChange={(e) => setArchivo(e.target.files?.[0] || null)}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Radicar solicitud
        </button>
      </form>
    </div>
  )
}
