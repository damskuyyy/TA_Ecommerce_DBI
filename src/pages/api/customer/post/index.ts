import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next"
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, no, orders } = req.body
  try {
    const data = await prisma.customer.create({
      data: {
        name,
        email,
        no,
        orders
      }
    })
    res.status(200).send(data)

  } catch (error) {
    res.status(500).json({ msg: 'Data User Error!' })
  }

}

export default handler; 