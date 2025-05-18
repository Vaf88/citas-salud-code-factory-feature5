"use client";
import React, { useMemo } from "react";

const casos = [
  { id: 1, tipo: "Petición", estado: "Abierto", fecha: "2024-06-01" },
  { id: 2, tipo: "Queja", estado: "En Proceso", fecha: "2024-06-02" },
  { id: 3, tipo: "Sugerencia", estado: "Cerrado", fecha: "2024-06-03" },
  { id: 4, tipo: "Reclamo", estado: "Cerrado", fecha: "2024-06-04" },
  { id: 5, tipo: "Petición", estado: "En Proceso", fecha: "2024-06-05" },
];

export default function DashboardPage() {
  // Métricas calculadas
  const resumen = useMemo(() => {
    const total = casos.length;
    const abiertos = casos.filter(c => c.estado === "Abierto").length;
    const enProceso = casos.filter(c => c.estado === "En Proceso").length;
    const cerrados = casos.filter(c => c.estado === "Cerrado").length;
    // Simulación de tiempo promedio
    const tiempoPromedio = "2 días";
    return { total, abiertos, enProceso, cerrados, tiempoPromedio };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-center">Dashboard de Atención al Usuario</h1>
      <div className="w-full max-w-3xl flex flex-col gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-blue-100 rounded p-4 text-center">
            <div className="text-2xl font-bold">{resumen.total}</div>
            <div className="text-xs text-gray-600">Total casos</div>
          </div>
          <div className="bg-yellow-100 rounded p-4 text-center">
            <div className="text-2xl font-bold">{resumen.abiertos}</div>
            <div className="text-xs text-gray-600">Abiertos</div>
          </div>
          <div className="bg-orange-100 rounded p-4 text-center">
            <div className="text-2xl font-bold">{resumen.enProceso}</div>
            <div className="text-xs text-gray-600">En proceso</div>
          </div>
          <div className="bg-green-100 rounded p-4 text-center">
            <div className="text-2xl font-bold">{resumen.cerrados}</div>
            <div className="text-xs text-gray-600">Cerrados</div>
          </div>
        </div>
        <div className="bg-white rounded shadow p-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Últimos casos radicados</h2>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Tipo</th>
                <th className="p-2 text-left">Estado</th>
                <th className="p-2 text-left">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {casos.map((c) => (
                <tr key={c.id} className="border-b last:border-b-0">
                  <td className="p-2">{c.id}</td>
                  <td className="p-2">{c.tipo}</td>
                  <td className="p-2">{c.estado}</td>
                  <td className="p-2">{c.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-sm text-gray-700">
            <span className="font-semibold">Tiempo promedio de respuesta:</span> {resumen.tiempoPromedio}
          </div>
        </div>
      </div>
    </div>
  );
} 