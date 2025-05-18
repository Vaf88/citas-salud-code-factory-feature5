"use client";
import React, { useState } from "react";

const datosPQRS = [
  { id: 1, tipo: "Petición", estado: "Abierto", fecha: "2024-06-01" },
  { id: 2, tipo: "Queja", estado: "Abierto", fecha: "2024-06-02" },
  { id: 3, tipo: "Sugerencia", estado: "Abierto", fecha: "2024-06-03" },
];

const tipos = ["Petición", "Queja", "Reclamo", "Sugerencia"];

export default function PQRSPage() {
  const [pqrs, setPqrs] = useState(datosPQRS);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ tipo: tipos[0], fecha: "" });

  // Abrir formulario para nueva PQRS
  const handleAdd = () => {
    setForm({ tipo: tipos[0], fecha: new Date().toISOString().slice(0, 10) });
    setEditId(null);
    setShowForm(true);
  };

  // Abrir formulario para editar PQRS
  const handleEdit = (item: { id: number; tipo: string; estado: string; fecha: string }) => {
    setForm({ tipo: item.tipo, fecha: item.fecha });
    setEditId(item.id);
    setShowForm(true);
  };

  // Eliminar PQRS
  const handleDelete = (id: number) => {
    setPqrs((prev) => prev.filter((item) => item.id !== id));
  };

  // Guardar PQRS (nuevo o editado)
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editId) {
      setPqrs((prev) => prev.map((item) => item.id === editId ? { ...item, ...form, estado: "Abierto" } : item));
    } else {
      const newId = pqrs.length ? Math.max(...pqrs.map((i) => i.id)) + 1 : 1;
      setPqrs((prev) => [...prev, { id: newId, ...form, estado: "Abierto" }]);
    }
    setShowForm(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-center">Gestión de PQRS</h1>
      <div className="w-full max-w-2xl bg-white rounded shadow p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Tipo</th>
              <th className="p-2 text-left">Estado</th>
              <th className="p-2 text-left">Fecha</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pqrs.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0">
                <td className="p-2">{item.id}</td>
                <td className="p-2">{item.tipo}</td>
                <td className="p-2">{item.estado}</td>
                <td className="p-2">{item.fecha}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600">Editar</button>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleAdd} className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Radicar nueva PQRS</button>
      </div>
      {/* Modal/Formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form onSubmit={handleSave} className="bg-white rounded shadow-lg p-6 w-full max-w-sm flex flex-col gap-4 relative">
            <button type="button" onClick={() => setShowForm(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">✕</button>
            <h2 className="text-lg font-bold mb-2">{editId ? "Editar PQRS" : "Nueva PQRS"}</h2>
            <label className="flex flex-col gap-1">
              Tipo
              <select className="border rounded px-2 py-1" value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}>
                {tipos.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              Fecha
              <input type="date" className="border rounded px-2 py-1" value={form.fecha} onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))} required />
            </label>
            <div className="text-sm text-gray-500">Estado: <span className="font-semibold">Abierto</span></div>
            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition">Guardar</button>
          </form>
        </div>
      )}
    </div>
  );
} 