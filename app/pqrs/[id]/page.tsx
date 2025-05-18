"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const pqrsDetalle = {
  id: 1,
  asunto: "Inconformidad proceso",
  tipo: "Petición",
  estado: "Pendiente",
  fecha: "2023-01-10",
  descripcion: "No estoy conforme con el proceso realizado en la última visita.",
  adjunto: "documento.pdf",
  historial: [
    { fecha: "2023-01-10", accion: "Radicada por el usuario" },
    { fecha: "2023-01-11", accion: "Asignada a gestor" },
  ],
};

const badgeColor = (estado: string) => {
  if (estado === "Pendiente") return "bg-yellow-200 text-yellow-800";
  if (estado === "En gestión") return "bg-blue-200 text-blue-800";
  if (estado === "Cerrada") return "bg-green-200 text-green-800";
  return "bg-gray-200 text-gray-800";
};

export default function PQRSDetallePage() {
  const [showDelete, setShowDelete] = useState(false);
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col bg-[#f3efff]">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-[#f3efff]">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full bg-white object-contain" />
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
          <div className="w-full max-w-2xl bg-[#f6f3fd] rounded-2xl p-6 shadow flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-xl font-semibold mb-1">{pqrsDetalle.asunto}</h2>
                <div className="flex gap-2 items-center text-sm">
                  <span className="font-medium">{pqrsDetalle.tipo}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor(pqrsDetalle.estado)}`}>{pqrsDetalle.estado}</span>
                  <span className="text-gray-500">{pqrsDetalle.fecha}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => router.push(`/pqrs/${pqrsDetalle.id}/editar`)} className="bg-[#b9a4f4] text-white px-4 py-2 rounded hover:bg-[#a18be6] transition">Editar</button>
                <button onClick={() => setShowDelete(true)} className="bg-red-200 text-red-700 px-4 py-2 rounded hover:bg-red-300 transition">Eliminar</button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-medium">Descripción</div>
              <div className="bg-white rounded p-3 text-gray-700 border">{pqrsDetalle.descripcion}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-medium">Adjunto</div>
              <a href="#" className="text-[#a18be6] hover:underline flex items-center gap-2">
                <span>📎</span>
                <span>{pqrsDetalle.adjunto}</span>
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-medium">Historial de la solicitud</div>
              <ul className="bg-white rounded p-3 border divide-y">
                {pqrsDetalle.historial.map((h, i) => (
                  <li key={i} className="py-1 flex justify-between text-sm">
                    <span>{h.accion}</span>
                    <span className="text-gray-500">{h.fecha}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Modal de eliminación */}
          {showDelete && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded shadow-lg p-6 w-full max-w-sm flex flex-col gap-4 relative">
                <button type="button" onClick={() => setShowDelete(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">✕</button>
                <h2 className="text-lg font-bold mb-2">¿Eliminar PQRS?</h2>
                <p>¿Estás seguro de eliminar la solicitud <span className="font-semibold">{pqrsDetalle.asunto}</span>?</p>
                <div className="flex gap-4 justify-end">
                  <button onClick={() => setShowDelete(false)} className="bg-gray-200 text-gray-800 rounded px-4 py-2 hover:bg-gray-300 transition">No</button>
                  <button onClick={() => { setShowDelete(false); router.push('/pqrs'); }} className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition">Sí, eliminar</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 