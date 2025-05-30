import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, GridFSBucket, Db} from "mongodb";
import multer from "multer";
import { Readable } from "stream";
import prisma from "@/utils/prisma";

// Helper function to connect to MongoDB
async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  const uri = process.env.MONGODB_URI as string;
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  const client = new MongoClient(uri);
  await client.connect();
  const dbName = process.env.MONGODB_DB as string;
  const db = client.db(dbName);
  return { client, db };
}

export const config = {
  api: { bodyParser: false },
};

interface NextApiRequestWithFile extends NextApiRequest {
  file?: Express.Multer.File;
}

// Setup multer untuk menangani upload file
const upload = multer({ storage: multer.memoryStorage() });

// Helper to run multer as a promise-based middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await runMiddleware(req, res, upload.single("pdfFile"));
  } catch (err) {
    return res.status(500).json({ error: "File upload error" });
  }

  const { contractId, userId } = req.body;
  const pdfBuffer = (req as any).file?.buffer;
  if (!pdfBuffer || !userId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `contract_${contractId}_${userId}_${timestamp}.pdf`;

  let client: MongoClient | null = null;

  try {
    const dbConnection = await connectToDatabase();
    client = dbConnection.client;
    const db = dbConnection.db;

    const bucket = new GridFSBucket(db, { bucketName: "pdfs" });
    const uploadStream = bucket.openUploadStream(filename);
    Readable.from(pdfBuffer).pipe(uploadStream);

    await new Promise((resolve, reject) => {
      uploadStream.on("finish", resolve);
      uploadStream.on("error", reject);
    });

    const savedPdf = await prisma.contractDigital.update({
      where: { id: contractId },
      data: {
        filename: filename,
      },
    });

    return res.status(201).json({ message: "PDF saved", pdf: savedPdf });
  } catch (error) {
    console.error("❌ Upload Error:", error);
    return res.status(500).json({ error: "Error saving PDF", details: error });
  } finally {
    if (client) await client.close();
  }
}
