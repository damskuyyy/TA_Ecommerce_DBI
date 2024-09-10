import { NextApiRequest, NextApiResponse } from "next"
import { randomUUID } from "crypto";
import prisma from "@/utils/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {products, status, userId, xenditId, orderDate, Users} = req.body
  if (req.method === 'POST') {
    try {
      await prisma.orders.create({
        data: {
          products,
          status,  
          userId,
          xenditId,
          orderDate,
          Users
        }
      })
      res.status(200).send('created orders succesfully!')

    } catch (error) {
      res.status(500).json({ msg: 'Orders Error!', error })
      console.log(error)
    }
  } else {
    res.status(400).send('method not allowed!')
  }

}

export default handler; 