const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getInventory(token: string, page: number = 1, limit: number = 5) {
  const parsedToken = JSON.parse(token)
  const res = await fetch(`${API_URL}/inventory?page=${page}&limit=${limit}`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${parsedToken}`
    }
  })

  if (!res.ok) {
    throw new Error("Gagal mengambil data inventory");
  }

  return await res.json();

}