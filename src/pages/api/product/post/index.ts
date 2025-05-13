<<<<<<< HEAD
import { NextApiRequest, NextApiResponse } from "next";
=======
import { NextApiRequest, NextApiResponse } from "next"
>>>>>>> 8b30526 (push order & checkout TA)
import { randomUUID } from "crypto";
import prisma from "@/utils/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
<<<<<<< HEAD
  const {
    code_product,
    name,
    price,
    desc,
    image,
    category,
    variants,
    details,
    spec,
    information,
    sold,
    rate,
    stock,
    minOrder,
  } = req.body;
  if (req.method === "POST") {
    try {
      await prisma.product.create({
        data: {
          code_product: code_product
            ? code_product
            : randomUUID({ disableEntropyCache: true })
                .toUpperCase()
                .slice(-12),
=======
  const { code_product, name, price, image, category, variants, details, spec, information, sold, rate, stock, minOrder, desc } = req.body
  if (req.method === 'POST') {
    try {
      await prisma.product.create({
        data: {
          code_product: code_product ? code_product : randomUUID({ disableEntropyCache: true }).toUpperCase().slice(-12),
>>>>>>> 8b30526 (push order & checkout TA)
          name,
          price,
          desc,
          image,
          category,
          variants,
          details,
          spec,
          information,
          sold,
          rate,
          stock,
<<<<<<< HEAD
          minOrder,
        },
      });
      res.status(200).send("data created succesfully!");
    } catch (error) {
      res.status(500).json({ msg: "Data Product Error!", error });
      console.log(error);
    }
  } else {
    res.status(400).send("method not allowed!");
  }
};

export default handler;
=======
          minOrder
        }
      })
      res.status(200).send('data created succesfully!')

    } catch (error) {
      res.status(500).json({ msg: 'Data Product Error!', error })
      console.log(error)
    }
  } else {
    res.status(400).send('method not allowed!')
  }

}

export default handler; 
>>>>>>> 8b30526 (push order & checkout TA)
