"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ede7fa]">
      <div className="flex flex-col items-center mb-8">
        <img src="/logo.png" alt="Logo" className="w-16 h-16 rounded-full bg-white object-contain mb-2" />
        <h1 className="text-3xl font-bold text-[#5b4bb7]">CitaSalud</h1>
      </div>
      <div className="flex flex-col gap-6 w-full max-w-xs">
        <button onClick={() => router.push("/login")}
          className="bg-[#b9a4f4] text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-[#a18be6] transition">
          Iniciar sesión
        </button>
        <button onClick={() => router.push("/register")}
          className="bg-white border border-[#b9a4f4] text-[#5b4bb7] px-6 py-3 rounded-xl text-lg font-semibold hover:bg-[#ede7fa] transition">
          Registrarse
        </button>
      </div>
    </div>
  );
}
