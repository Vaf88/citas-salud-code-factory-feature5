"use client";

import React, { useState } from "react";

const gestoresEjemplo = [
  { id: 1, nombre: "Ana Torres", correo: "ana@ips.com", rol: "Coordinadora" },
  { id: 2, nombre: "Luis Pérez", correo: "luis@ips.com", rol: "Gestor" },
];

const pqrsEjemplo = [
  { id: 1, tipo: "Petición", estado: "Abierto", fecha: "2024-06-01" },
  { id: 2, tipo: "Queja", estado: "En Proceso", fecha: "2024-06-02" },
  { id: 3, tipo: "Sugerencia", estado: "Cerrado", fecha: "2024-06-03" },
];

const estados = ["Abierto", "En Proceso", "Cerrado"];

export default function GestoresPage() {
  const [gestores, setGestores] = useState(gestoresEjemplo);
  const [pqrs, setPqrs] = useState(pqrsEjemplo);

  // Cambiar estado de una PQRS
  const handleEstado = (id: number, nuevoEstado: string) => {
    setPqrs((prev) => prev.map((item) => item.id === id ? { ...item, estado: nuevoEstado } : item));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 gap-8">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-center">Gestores de PQRS</h1>
      {/* Tabla de gestores */}
      <div className="w-full max-w-2xl bg-white rounded shadow p-4 overflow-x-auto mb-8">
        <h2 className="text-lg font-semibold mb-2">Lista de Gestores</h2>
        <table className="min-w-full text-sm mb-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Correo</th>
              <th className="p-2 text-left">Rol</th>
            </tr>
          </thead>
          <tbody>
            {gestores.map((g) => (
              <tr key={g.id} className="border-b last:border-b-0">
                <td className="p-2">{g.id}</td>
                <td className="p-2">{g.nombre}</td>
                <td className="p-2">{g.correo}</td>
                <td className="p-2">{g.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Registrar nuevo gestor</button>
      </div>
      {/* Gestión de PQRS */}
      <div className="w-full max-w-3xl bg-white rounded shadow p-4 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-2">Gestión de PQRS</h2>
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
                <td className="p-2">
                  <select
                    className="border rounded px-2 py-1"
                    value={item.estado}
                    onChange={e => handleEstado(item.id, e.target.value)}
                  >
                    {estados.map((e) => <option key={e}>{e}</option>)}
                  </select>
                </td>
                <td className="p-2">{item.fecha}</td>
                <td className="p-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600">Ver Detalle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 