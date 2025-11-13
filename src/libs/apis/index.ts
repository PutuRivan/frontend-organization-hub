const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getInventory(token: string, page: number = 1, limit: number = 5) {
  try {
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
  } catch (error) {
    console.error(error)
  }
}

export async function deleteInventory(token: string, id: string) {
  try {
    const parsedToken = JSON.parse(token);

    const res = await fetch(`${API_URL}/inventory/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedToken}`,
      },
    });

    if (!res.ok) {
      console.error(`Gagal menghapus item (${res.status}):`, await res.text());
    }

    return res;
  } catch (error) {
    console.error("Error saat menghapus inventory:", error);
    throw error;
  }
}
