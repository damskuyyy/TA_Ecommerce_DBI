import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/utils/prisma";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {id} = req.query
    const {code_product, name, price, image} = req.body
    try {
        await prisma.product.update({where:
        {id: String(id)},
        data: {
            code_product,
            name,
            price,
            image
         }})
        res.status(200).json({
            id: id,
            msg: ' Update Success'})
            
    } catch (error) {
        res.status(500).json({msg: 'Data Product Error!'})
    }

}
 
export default handler;