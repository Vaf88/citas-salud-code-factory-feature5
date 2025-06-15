'use client'

import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Gestor {
  id: number
  nombre: string
  correo: string
  rol: string
}

const ROLES = ['Agente', 'Supervisor', 'Administrador'] as const

export default function GestoresPage() {
  const router = useRouter()
  const [gestores, setGestores] = useState<Gestor[]>([])
  const [form, setForm] = useState({ nombre: '', correo: '', rol: '' })
  const [msg, setMsg] = useState<'exito' | 'error' | 'editado' | 'eliminado' | ''>('')
  const [editandoId, setEditandoId] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { nombre, correo, rol } = form

    if (!nombre.trim() || !correo.trim() || !rol) {
      setMsg('error')
      return
    }

    if (editandoId !== null) {
      setGestores(prev =>
        prev.map(g => g.id === editandoId ? { ...g, nombre, correo, rol } : g)
      )
      setMsg('editado')
    } else {
      const nuevo: Gestor = {
        id: Date.now(),
        nombre,
        correo,
        rol,
      }
      setGestores([nuevo, ...gestores])
      setMsg('exito')
    }

    setForm({ nombre: '', correo: '', rol: '' })
    setEditandoId(null)
  }

  const handleEditar = (g: Gestor) => {
    setForm({ nombre: g.nombre, correo: g.correo, rol: g.rol })
    setEditandoId(g.id)
    setMsg('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleEliminar = (id: number) => {
    setGestores(prev => prev.filter(g => g.id !== id))
    setMsg('eliminado')
  }

  return (
    <>
      <div className="bg-[#F9F6FF] min-h-screen flex justify-center items-center font-serif py-10">
        <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-4xl space-y-10">
          <h1 className="text-2xl font-bold text-center">
            {editandoId ? 'Editar gestor de PQRS' : 'Registrar nuevo gestor de PQRS'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Nombre completo</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Correo electrónico</label>
              <input
                name="correo"
                type="email"
                value={form.correo}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Rol</label>
              <select
                name="rol"
                value={form.rol}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              >
                <option value="">Seleccione…</option>
                {ROLES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button type="submit" className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition">
                {editandoId ? 'Guardar cambios' : 'Crear gestor'}
              </button>
            </div>

            {msg === 'exito' && <p className="text-green-600 text-center">¡Gestor creado con éxito!</p>}
            {msg === 'editado' && <p className="text-blue-600 text-center">Gestor editado correctamente.</p>}
            {msg === 'eliminado' && <p className="text-red-600 text-center">Gestor eliminado.</p>}
            {msg === 'error' && <p className="text-red-600 text-center">Faltó algún campo obligatorio.</p>}
          </form>

          <div className="flex justify-center">
            
            <button 
              onClick={() => router.push('/dashboard/gestores/lista')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Ver gestores creados
            </button>
          </div>


        </div>
      </div>
    </>
  )
}
