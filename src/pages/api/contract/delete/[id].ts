import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    await prisma.contractDigital.delete({
      where: { id: String(id) },
    });
  } catch (error) {
    res.status(500).json({ msg: "Delete Data Contract Error!" });
  }
};

export default handler;
