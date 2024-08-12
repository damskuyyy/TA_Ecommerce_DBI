import prisma from "@/utils/prisma"
import { NextApiRequest, NextApiResponse } from "next"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  try {
    const data = await prisma.user.findFirst({ where: { id: String(id) }, select: { email: true, emailVerified: true, image: true, items: true, phone: true, name: true, type: true } })
    res.status(200).send(data)
  } catch (error) {
    res.status(500).json({
      msg: 'Internal server error!',
      error
    })
  }
}

export default handler