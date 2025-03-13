import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, productId, price, pdfUrl } = req.body;
  if (req.method === "POST") {
    try {
      await prisma.contractDigital.create({
        data: {
          product: { connect: { id: productId } },
          user: { connect: { id: userId } },
          price,
          pdfUrl: pdfUrl,
        },
      });
      res.status(200).send("created contract succesfully!");
    } catch (error) {
      res.status(500).json({ msg: "Contract Error!", error });
      console.log(error);
    }
  } else {
    res.status(400).send("method not allowed!");
  }
};

export default handler;
