import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, GridFSBucket } from "mongodb";
import multer from "multer";
import { Readable } from "stream";
import prisma from "@/utils/prisma";

export const config = {
  api: { bodyParser: false },
};

// Setup multer untuk menangani upload file
const upload = multer({ storage: multer.memoryStorage() });

// Fungsi koneksi ke MongoDB
async function connectToDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables.");
  }

  const client = new MongoClient(process.env.DATABASE_URL);
  await client.connect();
  return { client, db: client.db() };
}

// Handler API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  upload.single("pdfFile")(req as any, res as any, async (err) => {
    if (err) {
      return res.status(500).json({ error: "File upload error" });
    }

    const { userId, productId } = req.body;
    const pdfBuffer = req.file?.buffer;
    if (!pdfBuffer) {
      return res.status(400).json({ error: "No PDF file provided" });
    }

    let client: MongoClient;
    try {
      // Koneksi ke MongoDB
      const dbConnection = await connectToDatabase();
      client = dbConnection.client;
      const db = dbConnection.db;

      // Buat bucket GridFS untuk penyimpanan PDF
      const bucket = new GridFSBucket(db, { bucketName: "pdfs" });

      // Buat upload stream ke GridFS
      const uploadStream = bucket.openUploadStream(req.file.originalname);
      Readable.from(pdfBuffer).pipe(uploadStream);

      // Tunggu upload selesai
      await new Promise((resolve, reject) => {
        uploadStream.on("finish", resolve);
        uploadStream.on("error", reject);
      });

      // Simpan metadata ke database Prisma
      const savedPdf = await prisma.pdfDocument.create({
        data: {
          userId,
          productId,
          filename: req.file.originalname,
        },
      });

      return res.status(201).json({ message: "PDF saved", pdf: savedPdf });
    } catch (error) {
      console.error("Upload Error:", error);
      return res
        .status(500)
        .json({ error: "Error saving PDF", details: error });
    } finally {
      // Tutup koneksi MongoDB
      if (client) await client.close();
    }
  });
}
