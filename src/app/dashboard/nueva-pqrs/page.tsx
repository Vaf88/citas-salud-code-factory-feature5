'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { crearPqrs } from '../../../api/pqrs'
import { useAuth } from '../../context/AuthContext'

export default function NuevaPQRSPage() {
  const { id: idCliente } = useAuth()
  const [tipo, setTipo] = useState('')
  const [asunto, setAsunto] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [archivo, setArchivo] = useState<File | null>(null)
  const router = useRouter()

  const tiposMap: Record<string, number> = {
    'Petición': 1,
    'Queja': 2,
    'Reclamo': 3,
    'Sugerencia': 4
  }

  const tipos = Object.keys(tiposMap)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMensaje('')
    setError('')

    const idTipo = tiposMap[tipo]
    if (!idTipo) {
      setError('Tipo de PQRS no válido')
      return
    }

    if (!idCliente) {
      setError('No se pudo obtener el cliente. Inicie sesión nuevamente.')
      return
    }

    try {
      // Aquí llamas la función que hace la petición
      await crearPqrs({
        idCliente,
        idTipoPqrs: idTipo,
        asuntoPqrs: asunto,
        descripcionPqrs: descripcion
        // Nota: si luego necesitas enviar archivo, puedes hacerlo con FormData
      })

      console.log('Archivo adjunto:', archivo)

      setMensaje('PQRS radicada exitosamente')
      setTipo('')
      setAsunto('')
      setDescripcion('')
      setArchivo(null)
    } catch (err) {
      setError('Ocurrió un error al radicar la PQRS')
    }
  }

  const handleArchivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setArchivo(file)
  }

  return (
    <div className="bg-[#F9F6FF] min-h-screen flex justify-center items-center font-serif">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-md w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold mb-2 text-center">Radicar Nueva PQRS</h1>

        {mensaje && <p className="text-green-600 text-center">{mensaje}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

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
            onChange={handleArchivoChange}
          />
          {archivo && <p className="mt-2 text-sm text-gray-600">Archivo seleccionado: {archivo.name}</p>}
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

