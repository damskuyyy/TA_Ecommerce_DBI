import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ContractStatus } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id, contractName, cost, signature, status } = req.body;
    console.log("STATUS: ", status);
    // Validasi request body
    if (!id || !contractName || !cost || !signature || !status) {
      return res
        .status(400)
        .json({ error: "contractId and status are required" });
    }

    // Validasi status agar sesuai dengan enum ContractStatus
    if (!Object.values(ContractStatus).includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Periksa apakah kontrak ada
    const existingContract = await prisma.contractDigital.findUnique({
      where: { id: id },
    });

    if (!existingContract) {
      return res.status(404).json({ error: "Contract not found" });
    }

    // Update status kontrak di database
    const updatedContract = await prisma.contractDigital.update({
      where: { id: id },
      data: {
        status,
        ...(contractName && { contractName }),
        ...(cost && { cost: parseFloat(cost) }),
        ...(signature && { signature }),
      },
    });

    return res.status(200).json({ success: true, contract: updatedContract });
  } catch (error) {
    console.error("Error updating contract status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default handler;
