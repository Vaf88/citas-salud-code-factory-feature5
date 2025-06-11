'use client'

import { useState } from 'react'

interface Gestor {
  id: number
  nombre: string
  correo: string
  rol: string
}

const ROLES = ['Agente', 'Supervisor', 'Administrador'] as const

export default function GestoresPage() {
  const [gestores, setGestores] = useState<Gestor[]>([])
  const [form, setForm] = useState({ nombre: '', correo: '', rol: '' })
  const [msg, setMsg] = useState<'exito' | 'error' | 'editado' | 'eliminado' | ''>('')
  const [editandoId, setEditandoId] = useState<number | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      // Editar gestor existente
      setGestores((prev) =>
        prev.map((g) =>
          g.id === editandoId ? { ...g, nombre, correo, rol } : g
        )
      )
      setMsg('editado')
    } else {
      // Crear nuevo gestor
      const nuevo: Gestor = {
        id: Date.now(),
        nombre,
        correo,
        rol,
      }
      setGestores([nuevo, ...gestores])
      setMsg('exito')
    }

    // Reset formulario
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
    setGestores((prev) => prev.filter((g) => g.id !== id))
    setMsg('eliminado')
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        {editandoId ? 'Editar gestor de PQRS' : 'Registrar nuevo gestor de PQRS'}
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow max-w-xl"
      >
        <div>
          <label className="block mb-1 font-medium" htmlFor="nombre">
            Nombre completo
          </label>
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="correo">
            Correo electrónico
          </label>
          <input
            id="correo"
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="rol">
            Rol
          </label>
          <select
            id="rol"
            name="rol"
            value={form.rol}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Seleccione…</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {editandoId ? 'Guardar cambios' : 'Crear gestor'}
        </button>

        {/* Mensajes */}
        {msg === 'exito' && (
          <p className="text-green-600 mt-2">¡Gestor creado con éxito!</p>
        )}
        {msg === 'editado' && (
          <p className="text-blue-600 mt-2">Gestor editado correctamente.</p>
        )}
        {msg === 'eliminado' && (
          <p className="text-red-600 mt-2">Gestor eliminado.</p>
        )}
        {msg === 'error' && (
          <p className="text-red-600 mt-2">Faltó algún campo obligatorio.</p>
        )}
      </form>

      {/* Lista o mensaje vacío */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Gestores creados</h2>

        {gestores.length === 0 ? (
          <div className="bg-gray-100 p-6 rounded text-center">
            <p className="mb-4">No ningún gestor PQRS creado.</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Crear Gestor
            </button>
          </div>
        ) : (
          <table className="w-full bg-white border rounded shadow text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Nombre</th>
                <th className="p-2 text-left">Correo</th>
                <th className="p-2 text-left">Rol</th>
                <th className="p-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {gestores.map((g) => (
                <tr key={g.id} className="border-t">
                  <td className="p-2">{g.nombre}</td>
                  <td className="p-2">{g.correo}</td>
                  <td className="p-2">{g.rol}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEditar(g)}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(g.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}
