import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
 const {code_product, name, price, image } = req.body
    try {
        const data = await prisma.product.create({
            data: {
                code_product,
                name,
                price,
                image
            }
        })
        
        res.status(200).send(data)
       
    } catch (error) {
        res.status(500).json({ msg: 'Data Product Error!', error })
        console.log(error)
    }

}
 
export default handler; 