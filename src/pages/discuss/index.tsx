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
    const { id } = req.query;

    if (id) {
      // Jika ada `id`, ambil 1 diskusi berdasarkan ID
      if (typeof id !== "string") {
        return res.status(400).json({ error: "Invalid discussion ID" });
      }

      const discussion = await prisma.discuss.findFirst({
        where: { id },
        include: {
          product: { select: { id: true, name: true, variants: true } },
          user: { select: { id: true, name: true, email: true } },
          admin: { select: { id: true, username: true } },
          messages: {
            orderBy: { createdAt: "desc" }, // Urutkan pesan dari terbaru ke terlama
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

      if (!discussion) {
        return res.status(404).json({ error: "Discussion not found" });
      }

      // Format pesan agar sender menjadi satu field
      const formattedDiscussion = {
        ...discussion,
        messages: discussion.messages.map((msg) => ({
          id: msg.id,
          content: msg.content,
          createdAt: msg.createdAt,
          sender: msg.user ? msg.user.name : msg.admin?.username || "Unknown",
        })),
      };

      return res.status(200).json(formattedDiscussion);
    } else {
      // Jika tidak ada `id`, ambil semua diskusi
      const discussions = await prisma.discuss.findMany({
        include: {
          product: { select: { id: true, name: true, variants: true } },
          user: { select: { id: true, name: true, email: true } },
          admin: { select: { id: true, username: true } },
          messages: {
            orderBy: { createdAt: "desc" }, // Urutkan pesan dari terbaru ke terlama
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

      // Format semua diskusi agar sender menjadi satu field
      const formattedDiscussions = discussions.map((discussion) => ({
        ...discussion,
        messages: discussion.messages.map((msg) => ({
          id: msg.id,
          content: msg.content,
          createdAt: msg.createdAt,
          sender: msg.user ? msg.user.name : msg.admin?.username || "Unknown",
        })),
      }));

      return res.status(200).json(formattedDiscussions);
    }
  } catch (error) {
    console.error("Error fetching discussions:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
