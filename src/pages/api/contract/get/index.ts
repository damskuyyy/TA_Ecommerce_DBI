import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ msg: "Method Not Allowed" });
  }

  try {
    /* -------------------------------------------------------- */
    /* 1.  Ambil query‑string                                   */
    /* -------------------------------------------------------- */
    const { userId, status } = req.query;

    // Bangun objek filter Prisma secara dinamis
    const where: any = {};
    if (userId && typeof userId === "string") where.userId = userId;
    if (status && typeof status === "string") where.status = status;

    /* -------------------------------------------------------- */
    /* 2.  Query database                                       */
    /* -------------------------------------------------------- */
    const contracts = await prisma.contractDigital.findMany({
      where,
      include: {
        product: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(contracts);
  } catch (error) {
    console.error("❌ Get Contract Error:", error);
    return res.status(500).json({ msg: "Data Contract Error!" });
  }
};

export default handler;
