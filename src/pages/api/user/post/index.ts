import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next"
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, emailVerified, password, items } = req.body
  try {
    const data = await prisma.user.create({
      data: {
        name,
        email,
        emailVerified,
        password,
        items
      }
    })
    res.status(200).send(data)

  } catch (error) {
    res.status(500).json({ msg: 'Data User Error!' })
  }

}

export default handler; 