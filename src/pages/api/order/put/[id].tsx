import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/utils/prisma";
import { randomUUID } from "crypto";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const { orderId, products, status, userId, xenditId, orderDate, paymentProof, paymentMethods, cust } = req.body

  if (req.method === 'PUT') {
    try {
      await prisma.orders.update({
        where:
          { id: String(id) },
        data: {
          orderId,
          products,
          status,
          userId,
          xenditId,
          orderDate,
          paymentProof,
          paymentMethods,
          cust
        }
      })
      res.status(200).json({
        id: id,
        msg: ' Update Success'
      })

    } catch (error) {
      res.status(500).json({ msg: 'Data Order Error!', error })
      console.log(error)
    }
  } else {
    res.status(400).send('method not allowed!')
  }

}

export default handler;