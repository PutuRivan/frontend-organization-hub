"use server"

import { revalidatePath } from "next/cache"
import { deleteInventory, deletePersonel } from "../apis"

export async function deleteInventoryAction(
  originalPath: string,
  token: string,
  id: string
) {
  try {
    const res = await deleteInventory(token, id)

    if (!res || !res.ok) {
      console.error("Gagal menghapus item:", res?.statusText || "Unknown error")
      return { success: false, message: "Gagal menghapus item" }
    }

    // Revalidate path setelah berhasil menghapus
    revalidatePath(originalPath)

    return { success: true, message: "Item berhasil dihapus" }
  } catch (error) {
    console.error("Error saat menghapus item:", error)
    return { success: false, message: "Terjadi kesalahan server" }
  }
}

export async function deletePersonnelAction(
  originalPath: string,
  token: string,
  id: string
) {
  try {
    const res = await deletePersonel(token, id)

    if (!res || !res.ok) {
      console.error("Gagal menghapus item:", res?.statusText || "Unknown error")
      return { success: false, message: "Gagal menghapus item" }
    }
    // Revalidate path setelah berhasil menghapus
    revalidatePath(originalPath)

    return { success: true, message: "Item berhasil dihapus" }
  } catch (error) {
    console.error("Error saat menghapus item:", error)
    return { success: false, message: "Terjadi kesalahan server" }
  }
}
