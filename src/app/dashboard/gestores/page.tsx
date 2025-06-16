'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { crearGestor } from '../../../api/gestores'
import { CrearGestorDTO } from '../../../types/gestor'

export default function GestoresPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    idCargo: ''
  })
  const [msg, setMsg] = useState<'exito' | 'error' | ''>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { nombre, apellido, correo, idCargo } = form
    if (!nombre || !apellido || !correo || !idCargo) {
      setMsg('error')
      return
    }

    const dto: CrearGestorDTO = {
      nombre,
      apellido,
      correo,
      idCargo: Number(idCargo)
    }

    try {
      await crearGestor(dto)
      setMsg('exito')
      setForm({ nombre: '', apellido: '', correo: '', idCargo: '' })
    } catch (err) {
      console.error('Error al crear gestor:', err)
      setMsg('error')
    }
  }

  return (
    <div className="bg-[#F9F6FF] min-h-screen flex justify-center items-center font-serif py-10">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-4xl space-y-10">
        <h1 className="text-2xl font-bold text-center">Registrar nuevo gestor de PQRS</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Apellido</label>
            <input
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Correo electrónico</label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Cargo</label>
            <select
              name="idCargo"
              value={form.idCargo}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              required
            >
              <option value="">Seleccione…</option>
              <option value="1">Administrador</option>
              <option value="2">Gestor</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Crear gestor
            </button>
          </div>

          {msg === 'exito' && <p className="text-green-600 text-center">¡Gestor creado con éxito!</p>}
          {msg === 'error' && (
            <p className="text-red-600 text-center">Faltó algún campo obligatorio o hubo un error.</p>
          )}
        </form>

        <div className="flex justify-center">
          <button
            onClick={() => router.push('/dashboard/gestores/lista')}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Ver gestores creados
          </button>
        </div>
      </div>
    </div>
  )
}
