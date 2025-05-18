"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    identificacion: "",
    email: "",
    telefono: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.apellido || !form.identificacion || !form.email || !form.telefono || !form.password || !form.confirm) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError("");
    alert("Registro exitoso (simulado)");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ede7fa]">
      <div className="flex flex-col items-center mb-8">
        <img src="/logo.png" alt="Logo" className="w-16 h-16 rounded-full bg-white object-contain mb-2" />
        <h1 className="text-3xl font-bold text-[#5b4bb7]">CitaSalud</h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 w-full max-w-md flex flex-col gap-6">
        <h2 className="text-xl font-semibold mb-2">Registrarse</h2>
        <p className="text-gray-500 text-sm mb-2">Regístrate y solicita tus citas en el portal</p>
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">{error}</div>}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Nombre *</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Apellido *</label>
          <input name="apellido" value={form.apellido} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Número de identificación *</label>
          <input name="identificacion" value={form.identificacion} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Correo electrónico *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Teléfono *</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Contraseña *</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Confirmar contraseña *</label>
          <input name="confirm" type="password" value={form.confirm} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <button type="submit" className="bg-[#b9a4f4] text-white px-6 py-2 rounded hover:bg-[#a18be6] transition">Registrarse</button>
        <div className="flex flex-col items-center gap-2 mt-2">
          <span className="text-sm text-gray-500">¿Ya tienes cuenta?</span>
          <button type="button" onClick={() => router.push("/login")} className="text-[#5b4bb7] hover:underline text-sm">Iniciar sesión</button>
        </div>
      </form>
    </div>
  );
} 