import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      productId,
      userId,
      fullName,
      address,
      startDate,
      endDate,
      descriptionContract,
      features,
      scopeOfWork,
    } = req.body;

    // Validasi semua field penting harus ada
    if (
      !productId ||
      !userId ||
      !fullName ||
      !address ||
      !startDate ||
      !endDate ||
      !descriptionContract ||
      !features ||
      !scopeOfWork
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const contract = await prisma.contractDigital.create({
      data: {
        userId,
        productId,
        fullName,
        address,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        descriptionContract,
        features,
        scopeOfWork,
        isFinalized: false,
        status: "PENDING_APPROVAL", // default status
      },
    });

    return res
      .status(201)
      .json({ message: "Draft contract created", contract });
  } catch (error) {
    console.error("Error handling contract:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
