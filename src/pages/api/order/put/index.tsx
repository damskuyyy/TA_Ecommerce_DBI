// pages/api/order/put/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
    body,
  } = req;

  if (method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const order = await prisma.orders.update({
      where: { id: id as string },
      data: { status: body.status },
    });

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update order', error });
  }
}
