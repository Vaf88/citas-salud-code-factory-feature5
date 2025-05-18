"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de error
    if (form.email !== "demo@demo.com" || form.password !== "1234") {
      setError("El correo o la contraseña no son válidos para acceder al portal");
      return;
    }
    setError("");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ede7fa]">
      <div className="flex flex-col items-center mb-8">
        <img src="/logo.png" alt="Logo" className="w-16 h-16 rounded-full bg-white object-contain mb-2" />
        <h1 className="text-3xl font-bold text-[#5b4bb7]">CitaSalud</h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 w-full max-w-md flex flex-col gap-6">
        <h2 className="text-xl font-semibold mb-2">Iniciar Sesión</h2>
        <p className="text-gray-500 text-sm mb-2">Ingresa tus credenciales para acceder al portal</p>
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">{error}</div>}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Correo electrónico</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Contraseña</label>
          <div className="relative">
            <input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} className="border rounded px-3 py-2 w-full pr-10" required />
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{showPassword ? "Ocultar" : "Mostrar"}</button>
          </div>
        </div>
        <button type="submit" className="bg-[#b9a4f4] text-white px-6 py-2 rounded hover:bg-[#a18be6] transition">Iniciar sesión</button>
        <div className="flex flex-col items-center gap-2 mt-2">
          <span className="text-sm text-gray-500">¿No tienes cuenta?</span>
          <button type="button" onClick={() => router.push("/register")} className="text-[#5b4bb7] hover:underline text-sm">Registrarse</button>
        </div>
      </form>
    </div>
  );
} 