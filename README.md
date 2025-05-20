# CITASalud - Plataforma Integral de Agendamiento Médico Web

> ✨ Proyecto Web de Auto Agendamiento Médico para EPS e IPS en Colombia

---

## 🩺 Descripción del Proyecto

**CITASalud** es una solución web de auto agendamiento médico, desarrollada con el propósito de brindar a los usuarios afiliados a EPS una plataforma autónoma, eficiente y segura para gestionar sus citas médicas. A su vez, permite a las IPS optimizar procesos administrativos y cumplir con la normativa del sistema de salud colombiano.

---

## 🎯 Objetivo General

Desarrollar una solución web de auto agendamiento médico que permita a los usuarios de EPS gestionar sus citas de forma **autónoma**, **eficiente** y **segura**, mejorando los procesos administrativos de la IPS y cumpliendo con la normativa del sistema de salud colombiano.

---

## ✨ Características (Feature 5 - Comunicación y Soporte)

El módulo de comunicación y soporte incluye funcionalidades claves para mejorar la experiencia del usuario:

- ✅ **Verificación de sesión activa:** Confirma que el usuario esté autenticado antes de acceder al módulo de soporte o radicar solicitudes.
- 📝 **CRUD de PQRS:** Permite radicar, editar y hacer seguimiento en línea a peticiones, quejas o sugerencias.
- 📢 **Gestión de Notificaciones Institucionales:** Administra mensajes masivos visibles desde el portal del usuario.
- 👥 **CRUD de Gestores de PQRS:** Permite registrar, actualizar y eliminar usuarios responsables de la gestión de PQRS dentro de la IPS.
- 📊 **Dashboard de Atención al Usuario:** Muestra un resumen visual del tiempo de respuesta y estado de los casos radicados.

---

## 🧪 Tecnologías Utilizadas

| Tecnología     | Descripción                                      |
|----------------|--------------------------------------------------|
| **Next.js**    | Framework de React para aplicaciones web rápidas |
| **TailwindCSS**| Framework de estilos CSS utilitario              |
| **TypeScript** | Superset de JavaScript con tipado estático       |
| **Heroicons**  | Biblioteca de íconos optimizados para Tailwind   |

---

## 🗂️ Estructura del Proyecto

```
App/
├── component/
│   └── app.tsx  # Componente inicial de prueba
├── public/             # Recursos estáticos
├── styles/             # Archivos de estilos
├── tsconfig.json       # Configuración de TypeScript
└── tailwind.config.js  # Configuración de TailwindCSS
```

---

## 🚀 Ejecución del Proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Vaf88/citas-salud-code-factory-feature5
cd citas-salud-code-factory-feature5
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Levantar el entorno de desarrollo

```bash
npm run dev
```

Abre tu navegador en [http://localhost:3000](http://localhost:3000) para ver la aplicación en ejecución.

---

## 📌 Notas Adicionales

- Asegúrate de tener **Node.js** y **npm** instalados en tu entorno.
- Este proyecto puede integrarse con APIs de EPS/IPS o sistemas de autenticación según requerimientos adicionales.

---

## 📄 Licencia

Este proyecto está bajo una licencia de uso educativo. Puedes reutilizarlo o adaptarlo según tus necesidades, citando adecuadamente al equipo desarrollador.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
