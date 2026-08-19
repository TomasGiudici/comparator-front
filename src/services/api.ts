const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  if (!API_BASE_URL) throw new Error('Falta configurar VITE_API_BASE_URL')

  const response = await fetch(`${API_BASE_URL}/comparator${path}`, { signal })
  if (!response.ok) throw new Error(`La solicitud falló con estado ${response.status}`)

  return response.json() as Promise<T>
}
