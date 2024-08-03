import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/utils/prisma";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {id} = req.query
    const {name, email} = req.body
    try {
        await prisma.user.update ({where:
        {id: String(id)},
        data: {
            name,
            email
         }})
        res.status(200).json({
            id: id,
            msg: ' Update Success'})
            
    } catch (error) {
        res.status(500).json({msg: 'Internal server error!'})
    }

}
 
export default handler;