import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const discussions = await prisma.discuss.findMany({
      include: {
        product: { select: { id: true, name: true, variants: true } },
        user: { select: { id: true, name: true, email: true } },
        admin: { select: { id: true, username: true } },
        messages: {
          orderBy: { createdAt: "desc" }, // Urutkan pesan dari terbaru ke terlama
          take: 1,
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: { select: { name: true } },
            admin: { select: { username: true } },
          },
        },
      },
    });

    if (!discussions || discussions.length === 0) {
      return res.status(404).json({ error: "No discussions found" });
    }

    return res.status(200).json(discussions);
  } catch (error) {
    console.error("Error fetching discussions:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
