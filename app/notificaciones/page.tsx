"use client";

import React, { useState } from "react";

const notificacionesEjemplo = [
  { id: 1, mensaje: "Mantenimiento programado el 10/06/2024", fecha: "2024-06-05" },
  { id: 2, mensaje: "Nueva política de privacidad disponible", fecha: "2024-06-03" },
];

export default function NotificacionesPage() {
  const [notificaciones, setNotificaciones] = useState(notificacionesEjemplo);
  const [mensaje, setMensaje] = useState("");

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-center">Notificaciones Institucionales</h1>
      <div className="w-full max-w-xl bg-white rounded shadow p-4 flex flex-col gap-4">
        <form className="flex flex-col gap-2 sm:flex-row" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            className="flex-1 border rounded px-2 py-1"
            placeholder="Escribe una nueva notificación..."
            value={mensaje}
            onChange={e => setMensaje(e.target.value)}
          />
          <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition" type="submit">
            Publicar
          </button>
        </form>
        <ul className="divide-y">
          {notificaciones.map((n) => (
            <li key={n.id} className="py-2 flex flex-col sm:flex-row sm:justify-between">
              <span>{n.mensaje}</span>
              <span className="text-xs text-gray-500">{n.fecha}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 