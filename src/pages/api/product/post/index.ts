import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next"
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
 const {name, email} = req.body
    try {
        const data = await prisma.user.create({
            data: {
                name,
                email
            }
        })
        res.status(200).send(data)
       
    } catch (error) {
        res.status(500).json({msg: 'Internal server error!'})
    }

}
 
export default handler; 