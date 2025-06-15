'use client'

import { useState } from 'react'

export default function NuevaPQRSPage() {
  const [tipo, setTipo] = useState('')
  const [asunto, setAsunto] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const tipos = ['Petición', 'Queja', 'Reclamo', 'Sugerencia']

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const archivoSeleccionado = formData.get("archivo")

    console.log({
      tipo,
      asunto,
      descripcion,
      archivo: archivoSeleccionado
    })
  }

  return (
    <div className="bg-[#F9F6FF] min-h-screen flex justify-center items-center font-serif">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-md w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold mb-2 text-center">Radicar Nueva PQRS</h1>

        <div>
          <label className="block mb-2 font-medium">Tipo de solicitud</label>
          <select
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
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
          <label className="block mb-2 font-medium">Asunto</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Descripción detallada</label>
          <textarea
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            rows={4}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Adjuntar archivo</label>
          <input
            type="file"
            className="w-full border px-4 py-2 rounded-lg"
            name="archivo"
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition">
            Radicar solicitud
          </button>
        </div>
      </form>
    </div>
  )
}
