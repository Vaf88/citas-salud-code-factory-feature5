// utils/auth.ts
export function obtenerPayloadToken(): { id: number; role: string } | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.id,
      role: payload.role
    };
  } catch (err) {
    console.error('Error decodificando token:', err);
    return null;
  }
}
