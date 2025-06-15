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

const gestoresIniciales: Gestor[] = [
  { id: 1, nombre: 'Ana Restrepo', correo: 'AnaP@udea.co', rol: 'Agente' },
  { id: 2, nombre: 'Carlos Torres', correo: 'CarlosT@udea.co', rol: 'Supervisor' },
  { id: 3, nombre: 'Pedro Ortiz', correo: 'PedroO@udea.edu.co', rol: 'Administrador' },
]

export default function ListaGestoresPage() {
  const router = useRouter()
  const [gestores, setGestores] = useState<Gestor[]>(gestoresIniciales)
  const [gestorAEliminar, setGestorAEliminar] = useState<Gestor | null>(null)
  const [gestorAEditar, setGestorAEditar] = useState<Gestor | null>(null)
  const [formEdit, setFormEdit] = useState({ nombre: '', correo: '', rol: '' })

  const handleEliminarConfirmado = () => {
    if (gestorAEliminar) {
      setGestores(prev => prev.filter(g => g.id !== gestorAEliminar.id))
      setGestorAEliminar(null)
    }
  }

  const handleEditar = (gestor: Gestor) => {
    setGestorAEditar(gestor)
    setFormEdit({ nombre: gestor.nombre, correo: gestor.correo, rol: gestor.rol })
  }

  const handleGuardarEdicion = () => {
    setGestores(prev =>
      prev.map(g =>
        g.id === gestorAEditar?.id
          ? { ...g, ...formEdit }
          : g
      )
    )
    setGestorAEditar(null)
  }

  return (
    <div className="min-h-screen bg-[#F9F6FF] flex justify-center items-center font-serif py-10">
      <div className="w-full max-w-4xl bg-white p-10 rounded-lg shadow space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestores registrados</h1>
        </div>

        <div className="bg-[#F4F0FF] rounded-2xl p-6 shadow">
          <table className="w-full text-center">
            <thead>
              <tr className="border-b">
                <th className="py-2">Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {gestores.map(gestor => (
                <tr key={gestor.id} className="border-b">
                  <td className="py-4">{gestor.nombre}</td>
                  <td>{gestor.correo}</td>
                  <td>{gestor.rol}</td>
                  <td className="py-4">
                    <div className="flex justify-center items-center space-x-3">
                      <button onClick={() => handleEditar(gestor)}>
                        <Pencil className="text-purple-500 w-5 h-5" />
                      </button>
                      <button onClick={() => setGestorAEliminar(gestor)}>
                        <Trash2 className="text-red-500 w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botón de nuevo gestor*/}
        <div className="flex justify-center">
          <button 
            onClick={() => router.push('/dashboard/gestores')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            Nuevo gestor
          </button>
        </div>

        {/* Popup de confirmación eliminar */}
        {gestorAEliminar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#F4F0FF] p-10 rounded-xl text-center space-y-4">
              <p className="text-lg font-semibold">
                ¿Está seguro que deseas eliminar al Gestor {gestorAEliminar.nombre}?
              </p>
              <p className="text-gray-500">No puedes revertir esto</p>
              <div className="flex justify-center space-x-6">
                <button
                  onClick={handleEliminarConfirmado}
                  className="bg-purple-500 text-white px-6 py-2 rounded"
                >
                  Sí
                </button>
                <button
                  onClick={() => setGestorAEliminar(null)}
                  className="bg-red-400 text-white px-6 py-2 rounded"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Popup de edición */}
        {gestorAEditar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#F4F0FF] p-10 rounded-xl space-y-6">
              <h2 className="text-xl font-bold text-center">Editar Gestor</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={formEdit.nombre}
                  onChange={e => setFormEdit({ ...formEdit, nombre: e.target.value })}
                  className="w-full border px-4 py-2 rounded"
                  placeholder="Nombre"
                />
                <input
                  type="email"
                  value={formEdit.correo}
                  onChange={e => setFormEdit({ ...formEdit, correo: e.target.value })}
                  className="w-full border px-4 py-2 rounded"
                  placeholder="Correo"
                />
                <input
                  type="text"
                  value={formEdit.rol}
                  onChange={e => setFormEdit({ ...formEdit, rol: e.target.value })}
                  className="w-full border px-4 py-2 rounded"
                  placeholder="Rol"
                />
              </div>
              <div className="flex justify-center space-x-6">
                <button
                  onClick={handleGuardarEdicion}
                  className="bg-purple-500 text-white px-6 py-2 rounded"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setGestorAEditar(null)}
                  className="bg-red-400 text-white px-6 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
