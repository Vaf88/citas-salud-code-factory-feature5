"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

const tipos = ["Petición", "Queja", "Reclamo", "Sugerencia"];

export default function NuevaPQRSPage() {
  const [form, setForm] = useState({
    tipo: "",
    asunto: "",
    descripcion: "",
    adjunto: null as File | null,
  });
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((f) => ({ ...f, adjunto: file }));
    setFileName(file ? file.name : "");
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    setForm((f) => ({ ...f, adjunto: file }));
    setFileName(file ? file.name : "");
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.tipo || !form.asunto || !form.descripcion) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    alert("PQRS radicada correctamente (simulado)");
    setForm({ tipo: "", asunto: "", descripcion: "", adjunto: null });
    setFileName("");
  };
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
        <main className="flex-1 flex justify-center items-start py-12 px-2 sm:px-8 bg-white rounded-tl-3xl rounded-bl-3xl min-h-[80vh]">
          <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-6">
            <h1 className="text-2xl font-semibold mb-2">Radicar nueva PQRS</h1>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Tipo de solicitud *</label>
              <select name="tipo" value={form.tipo} onChange={handleChange} className="border rounded px-3 py-2" required>
                <option value="">Seleccione un tipo de solicitud</option>
                {tipos.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Asunto *</label>
              <input name="asunto" value={form.asunto} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Describa brevemente el detalle de su solicitud" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Descripción detallada *</label>
              <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="border rounded px-3 py-2 min-h-[100px]" placeholder="Proporcione los detalles de su solicitud" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Adjunto</label>
              <div
                className="border rounded px-3 py-6 text-center text-gray-500 cursor-pointer bg-gray-50 hover:bg-gray-100"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('fileInput')?.click()}
              >
                {fileName ? (
                  <span className="text-gray-700">{fileName}</span>
                ) : (
                  <span>Haga click o arrastre para cargar un archivo PDF, JPEG, PNG o Doc (Max. 10MB)</span>
                )}
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpeg,.jpg,.png,.doc,.docx"
                  onChange={handleFile}
                />
              </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex justify-end">
              <button type="submit" className="bg-[#b9a4f4] text-white px-6 py-2 rounded hover:bg-[#a18be6] transition">Radicar solicitud</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
} 