import type { TEventSchema } from "../schema";
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

export async function countTable(token: string) {
  const parsedToken = JSON.parse(token);
  const res = await fetch(`${API_URL}/dashboard`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
  });
  console.log(res);
  if (!res.ok) {
    throw new Error("Gagal mengambil data count table");
  }

  return await res.json();
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
  const parsedToken = JSON.parse(token);
  console.log(parsedToken);
  const res = await fetch(`${API_URL}/inventory`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
    body: formData,
  });
  return await res.json();
}

export async function updateInventory(
  token: string,
  id: string,
  formData: FormData,
) {
  const parsedToken = JSON.parse(token);
  const res = await fetch(`${API_URL}/inventory/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
    body: formData,
  });

  return await res.json();
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

export async function getAllAttendance(
  token: string,
  page = 1,
  limit = 5,
  date?: string,
  name?: string,
  status?: string,
) {
  const parsedToken = JSON.parse(token);
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (date) params.append("date", date);
  if (name) params.append("name", name);
  if (status) params.append("status", status);

  console.log(params.toString());
  try {
    const res = await fetch(
      `${API_URL}/attendance/personel?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken}`, // Token
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Gagal mengambil data attendance");
    }

    const result = await res.json();
    return result; // {success, pagination, data}
  } catch (error) {
    console.error("Error getAllAttendance:", error);
    throw error;
  }
}

export async function getTodayAttendance(token: string) {
  const parsedToken = JSON.parse(token);

  const res = await fetch(`${API_URL}/attendance/today`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${parsedToken}`,
    },
    cache: "no-store",
  });

  const responseData = await res.json();

  if (!res.ok) {
    // If no attendance found (404), return null instead of throwing
    if (res.status === 404) {
      return null;
    }
    throw new Error(responseData.message || "Gagal mengambil data absensi");
  }

  return responseData.data || null;
}

export async function createAttendance(
  token: string,
  data: {
    userId?: string;
    status?: "Hadir" | "Izin" | "Sakit" | "Alfa";
    note?: string;
  },
) {
  const parsedToken = JSON.parse(token);

  const res = await fetch(`${API_URL}/attendance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${parsedToken}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Gagal melakukan absensi");
  }

  return responseData;
}

export async function getAllPersonel(
  token: string,
  page: number = 1,
  userPerPage: number = 10,
) {
  const parsedToken = JSON.parse(token);

  const res = await fetch(
    `${API_URL}/users/personel?page=${page}&limit=${userPerPage}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    },
  );

  if (!res.ok) throw new Error("Gagal Mengambil Data User");

  return await res.json();
}

export async function getPersonelById(token: string, id: string) {
  const parsedToken = JSON.parse(token);

  const res = await fetch(`${API_URL}/user/personel/${id}`, {
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
  });

  if (!res.ok) throw new Error("Gagal Mengambil Data User");

  return await res.json();
}

export async function createPersonel(token: string, formData: FormData) {
  const parsedToken = JSON.parse(token);

  const res = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
    body: formData,
  });

  const responseData = await res.json();

  if (!res.ok) throw new Error("Gagal Membuat Data User");

  return responseData;
}

export async function deletePersonel(token: string, id: string) {
  const parsedToken = JSON.parse(token);

  const res = await fetch(`${API_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${parsedToken}`,
    },
  });

  if (!res.ok) throw new Error("Gagal Menghapus Data User");

  return res;
}

export async function getAllEvents(
  token: string,
  page: number = 1,
  limit: number = 10,
  search?: string,
) {
  const parsedToken = JSON.parse(token);
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (search) params.append("search", search);

  try {
    const res = await fetch(`${API_URL}/events?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Gagal mengambil data events");
    }

    const result = await res.json();
    return result; // {success, pagination, data}
  } catch (error) {
    console.error("Error getAllEvents:", error);
    throw error;
  }
}

export async function createEvent(token: string, data: TEventSchema) {
  const parsedToken = JSON.parse(token);

  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${parsedToken}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) throw new Error("Gagal Membuat Data Event");

  return responseData;
}

export async function deleteEvent(token: string, id: string) {
  const parsedToken = JSON.parse(token);

  const res = await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${parsedToken}`,
    },
  });

  if (!res.ok) throw new Error("Gagal Menghapus Data Event");

  return res;
}
