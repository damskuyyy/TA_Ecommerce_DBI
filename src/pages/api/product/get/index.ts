import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next"
const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const data = await prisma.product.findMany()
        res.status(200).json(data)
       
    } catch (error) {
        res.status(500).json({msg: 'Data Product Error!'})
    }

}
 
export default handler; 