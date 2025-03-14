import { PDFDocument, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Ambil data dari request
    const { userId, productId, signature } = req.body; // Tambahkan signature
    if (!userId || !productId || !signature) {
      return res
        .status(400)
        .json({ error: "userId, productId, and signature are required" });
    }

    console.log("🔹 Received Data:", { userId, productId });

    // Path ke template PDF
    const pdfPath = path.join(process.cwd(), "public", "contract-template.pdf");
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: "Template PDF not found" });
    }

    // Load PDF template ke pdf-lib
    const templateBuffer = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(templateBuffer);
    const form = pdfDoc.getForm();

    // Isi field teks dalam PDF
    form.getTextField("userIdField").setText(userId);
    form.getTextField("productIdField").setText(productId);

    // Konversi tanda tangan dari base64 ke Uint8Array
    const signatureData = signature.replace(/^data:image\/png;base64,/, ""); // Hapus prefix base64
    const signatureBytes = Buffer.from(signatureData, "base64");
    const signatureImage = await pdfDoc.embedPng(signatureBytes);

    // Tentukan ukuran dan posisi tanda tangan
    const page = pdfDoc.getPages()[0]; // Halaman pertama
    const { width, height } = page.getSize();
    page.drawImage(signatureImage, {
      x: width - 220, // Posisi X dari kanan
      y: 100, // Posisi Y dari bawah
      width: 200,
      height: 100,
    });

    form.flatten(); // Mencegah pengeditan lebih lanjut

    // Simpan PDF hasil edit
    const pdfBytes = await pdfDoc.save();

    // Kirim response dengan PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="contract.pdf"');
    res.status(200).end(pdfBytes);
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
