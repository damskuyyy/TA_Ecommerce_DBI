import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Hapus semua dokumen dalam koleksi 'discussions'
    await prisma.message.deleteMany({});

    return res.status(200).json({ message: "Semua diskusi berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus diskusi:", error);
    return res.status(500).json({ message: "Gagal menghapus diskusi" });
  }
}
