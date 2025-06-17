'use client'

import { useEffect, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { listarGestores, eliminarGestor, actualizarGestor } from '../../../../api/gestores'
import { GestorDTO } from '../../../../types/gestor'

const ROLES = {
  1: 'Administrador',
  2: 'Gestor',
} as const

type RolNombre = keyof typeof ROLES
type RolTexto = (typeof ROLES)[RolNombre]

export default function ListaGestoresPage() {
  const router = useRouter()
  const [gestores, setGestores] = useState<GestorDTO[]>([])
  const [gestorSeleccionado, setGestorSeleccionado] = useState<GestorDTO | null>(null)
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false)
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false)

  const [form, setForm] = useState<{
    nombre: string
    apellido: string
    correo: string
    rol: RolTexto | ''
  }>({
    nombre: '',
    apellido: '',
    correo: '',
    rol: ''
  })

  useEffect(() => {
    const cargarGestores = async () => {
      try {
        const res = await listarGestores()
        setGestores(res.data ?? res)
      } catch (error) {
        console.error('Error al cargar gestores:', error)
      }
    }

    cargarGestores()
  }, [])

  const handleEditar = (gestor: GestorDTO) => {
    setGestorSeleccionado(gestor)
    setForm({
      nombre: gestor.nombre,
      apellido: gestor.apellido,
      correo: gestor.correo,
      rol: ROLES[gestor.idCargo as keyof typeof ROLES] ?? ''
    })
    setMostrarModalEditar(true)
  }

  const handleGuardarEdicion = async () => {
    if (!gestorSeleccionado) return

    const idCargoEntry = Object.entries(ROLES).find(([_, nombre]) => nombre === form.rol)
    if (!idCargoEntry) {
      console.error('Rol no válido')
      return
    }

    const idCargo = Number(idCargoEntry[0])

    const dto: GestorDTO = {
      nombre: form.nombre,
      apellido: form.apellido,
      correo: form.correo,
      idCargo
    }

    try {
      await actualizarGestor(gestorSeleccionado.id, dto)
      setMostrarModalEditar(false)
      const res = await listarGestores()
      setGestores(res.data ?? res)
    } catch (error) {
      console.error('Error actualizando gestor:', error)
    }
  }

  const handleEliminar = async () => {
    if (!gestorSeleccionado) return

    try {
      await eliminarGestor(gestorSeleccionado.id)
      setMostrarModalEliminar(false)
      const res = await listarGestores()
      setGestores(res.data ?? res)
    } catch (error) {
      console.error('Error eliminando gestor:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-[#F9F6FF] min-h-screen flex flex-col items-center justify-center py-10 font-serif">
      <h1 className="text-3xl font-bold mb-10">Gestores registrados</h1>

      <div className="bg-white p-10 rounded-3xl shadow-md w-full max-w-4xl space-y-6">
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
            {gestores.map((gestor) => (
              <tr key={gestor.id} className="border-b">
                <td className="py-4">{gestor.nombre}</td>
                <td>{gestor.correo}</td>
                <td>{ROLES[gestor.idCargo as keyof typeof ROLES]}</td>
                <td>
                  <div className="flex justify-center gap-4">
                    <button onClick={() => handleEditar(gestor)} className="text-purple-600 hover:text-purple-800">
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setGestorSeleccionado(gestor)
                        setMostrarModalEliminar(true)
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10">
        <button
          onClick={() => router.push('/dashboard/gestores')}
          className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition"
        >
          Nuevo gestor
        </button>
      </div>

      {/* Modal eliminar */}
      {mostrarModalEliminar && gestorSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">
              ¿Eliminar al gestor &quot;{gestorSeleccionado.nombre}&quot;?
            </h2>
            <p className="text-gray-500 mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-6">
              <button onClick={handleEliminar} className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600">
                Sí
              </button>
              <button onClick={() => setMostrarModalEliminar(false)} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal editar */}
      {mostrarModalEditar && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-3xl shadow-lg w-[90%] max-w-lg">
            <h2 className="text-xl font-semibold mb-6 text-center">Editar Gestor</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Nombre</label>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Apellido</label>
                <input
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Rol</label>
                <select
                  name="rol"
                  value={form.rol}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg"
                >
                  <option value="">Seleccione…</option>
                  {Object.entries(ROLES).map(([id, nombre]) => (
                    <option key={id} value={nombre}>
                      {nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center gap-6 mt-8">
              <button
                onClick={handleGuardarEdicion}
                className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
              >
                Guardar
              </button>
              <button
                onClick={() => setMostrarModalEditar(false)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
