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

    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid or missing discussion ID" });
    }

    // Fetch discussion from Prisma
    const discussion = await prisma.discuss.findFirst({
      where: { id },
      include: {
        product: { select: { id: true, name: true, variants: true } },
        user: { select: { id: true, name: true, email: true } },
        admin: { select: { id: true, username: true } },
        messages: {
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

    // Transform messages: gabungkan user dan admin ke dalam sender
    const formattedDiscussion = {
      ...discussion,
      messages: discussion.messages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        createdAt: msg.createdAt,
        sender: msg.user ? "user" : "admin", // Jika user ada, pakai user.name, jika tidak pakai admin.username
      })),
    };

    return res.status(200).json(formattedDiscussion);
  } catch (error) {
    console.error("Error fetching discussion:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
