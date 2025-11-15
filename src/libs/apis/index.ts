import type { TTokenCheckResponse } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function CheckToken(token: string): Promise<TTokenCheckResponse> {
  const parsedToken = JSON.parse(token);
  return await fetch(`${API_URL}/check-token`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${parsedToken}`,
    },
  }).then((response) => response.json());
}

export async function getInventory(
  token: string,
  page: number = 1,
  limit: number = 5,
) {
  const parsedToken = JSON.parse(token);
  const res = await fetch(`${API_URL}/inventory?page=${page}&limit=${limit}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data inventory");
  }

  return await res.json();
}

export async function getInventoryById(token: string, id: string) {
  const parsedToken = JSON.parse(token);
  const res = await fetch(`${API_URL}/inventory/${id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${parsedToken}`,
    },
  });

  return await res.json();
}

export async function createNewInventory(token: string, formData: FormData) {
  const parsedToken = JSON.parse(token)
  console.log(parsedToken)
  const res = await fetch(`${API_URL}/inventory`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
    body: formData,
  })
  return await res.json()
}

export async function updateInventory(token: string, id: string, formData: FormData) {
  const parsedToken = JSON.parse(token)
  const res = await fetch(`${API_URL}/inventory/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${parsedToken}`,
    },
    body: formData
  })

  return await res.json()
}

export async function deleteInventory(token: string, id: string) {
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
}

