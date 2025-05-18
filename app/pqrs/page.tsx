"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const pqrsInicial = [
  { id: 1, asunto: "Inconformidad proceso", tipo: "Petición", fecha: "2023-01-10", estado: "Pendiente" },
  { id: 2, asunto: "Cambio Sistema", tipo: "Queja", fecha: "2022-10-11", estado: "En gestión" },
  { id: 3, asunto: "Solicitud información", tipo: "Reclamo", fecha: "2020-03-05", estado: "Cerrada" },
];

const badgeColor = (estado: string) => {
  if (estado === "Pendiente") return "bg-yellow-200 text-yellow-800";
  if (estado === "En gestión") return "bg-blue-200 text-blue-800";
  if (estado === "Cerrada") return "bg-green-200 text-green-800";
  return "bg-gray-200 text-gray-800";
};

export default function HistorialPQRSPage() {
  const [pqrs, setPqrs] = useState(pqrsInicial);
  const [showDelete, setShowDelete] = useState(false);
  const [toDelete, setToDelete] = useState<number | null>(null);
  const router = useRouter();

  const handleDelete = (id: number) => {
    setToDelete(id);
    setShowDelete(true);
  };
  const confirmDelete = () => {
    setPqrs((prev) => prev.filter((item) => item.id !== toDelete));
    setShowDelete(false);
    setToDelete(null);
  };
  const cancelDelete = () => {
    setShowDelete(false);
    setToDelete(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3efff]">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-[#f3efff]">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo"  className="w-20 h-20 rounded-full bg-white object-contain" />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl">🔔</span>
          <span className="font-medium">Usuario Nombre</span>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col gap-8 w-64 bg-[#ede7fa] items-center pt-16 text-lg font-medium">
          <div className="flex flex-col gap-6">
            <a href="/" className="hover:underline">Principal</a>
            <a href="/pqrs" className="hover:underline">Mis solicitudes</a>
            <a href="/notificaciones" className="hover:underline">Notificaciones</a>
          </div>
        </aside>
        {/* Main content */}
        <main className="flex-1 flex flex-col items-center py-12 px-2 sm:px-8 bg-white rounded-tl-3xl rounded-bl-3xl min-h-[80vh]">
          <div className="w-full max-w-3xl bg-[#f6f3fd] rounded-2xl p-6 shadow flex flex-col gap-6">
            <h2 className="text-xl font-semibold mb-2">Historial PQRS</h2>
            {pqrs.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-12">
                <span className="text-gray-500 text-lg">No has radicado ninguna PQRS aún.</span>
                <a href="/pqrs/nueva" className="bg-[#b9a4f4] text-white px-6 py-2 rounded hover:bg-[#a18be6] transition">Radicar nueva PQRS</a>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">Asunto</th>
                      <th className="p-2 text-left">Tipo</th>
                      <th className="p-2 text-left">Fecha</th>
                      <th className="p-2 text-left">Estado</th>
                      <th className="p-2 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pqrs.map((item) => (
                      <tr key={item.id} className="border-b last:border-b-0">
                        <td className="p-2 whitespace-nowrap">{item.asunto}</td>
                        <td className="p-2 whitespace-nowrap">{item.tipo}</td>
                        <td className="p-2 whitespace-nowrap">{item.fecha}</td>
                        <td className="p-2 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor(item.estado)}`}>{item.estado}</span>
                        </td>
                        <td className="p-2 whitespace-nowrap flex gap-2">
                          <a href={`/pqrs/${item.id}`} className="text-[#a18be6] hover:underline">Ver detalles</a>
                          <button onClick={() => router.push(`/pqrs/${item.id}/editar`)} className="text-blue-500 hover:underline">Editar</button>
                          <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {/* Modal de eliminación */}
          {showDelete && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded shadow-lg p-6 w-full max-w-sm flex flex-col gap-4 relative">
                <button type="button" onClick={cancelDelete} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">✕</button>
                <h2 className="text-lg font-bold mb-2">¿Eliminar PQRS?</h2>
                <p>¿Estás seguro de eliminar la solicitud <span className="font-semibold">{pqrs.find(p => p.id === toDelete)?.asunto}</span>?</p>
                <div className="flex gap-4 justify-end">
                  <button onClick={cancelDelete} className="bg-gray-200 text-gray-800 rounded px-4 py-2 hover:bg-gray-300 transition">No</button>
                  <button onClick={confirmDelete} className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition">Sí, eliminar</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 