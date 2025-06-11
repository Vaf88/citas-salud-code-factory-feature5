'use client'

import { ReactNode, Suspense } from 'react'
import Sidebar from '../dashboard/sideBar'          // ①  Nuevo componente client
                                          //    (lo creamos abajo)
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* ②  Sidebar (client) envuelto en Suspense  */}
      <Suspense fallback={<div className="w-64" />}>
        <Sidebar />
      </Suspense>

      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  )
}
