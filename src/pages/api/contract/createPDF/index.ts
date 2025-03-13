import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Ambil data dari request
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ error: "userId and productId are required" });
    }

    console.log(
      "🔹 Received Data - userId:",
      userId,
      ", productId:",
      productId
    );

    // Path ke template PDF
    const pdfPath = path.join(process.cwd(), "public", "contract-template.pdf");
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: "Template PDF not found" });
    }

    // Load PDF template ke pdf-lib
    const templateBuffer = fs.readFileSync(pdfPath);
    const templateBytes = new Uint8Array(templateBuffer);
    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();

    // Debugging: Cek apakah field tersedia dalam PDF
    const availableFields = form.getFields().map((f) => f.getName());
    console.log("✅ Available Form Fields:", availableFields);

    // Pastikan field yang ingin diisi tersedia
    if (
      !availableFields.includes("userIdField") ||
      !availableFields.includes("productIdField")
    ) {
      return res
        .status(400)
        .json({ error: "Form fields not found in PDF template" });
    }

    // Mengisi field dalam PDF
    const userField = form.getTextField("userIdField");
    userField.setText(userId);

    const productField = form.getTextField("productIdField");
    productField.setText(productId);

    // Flatten form agar pengguna tidak bisa mengedit PDF hasil
    form.flatten();

    // Simpan PDF hasil edit
    const pdfBytes = await pdfDoc.save();

    // Debug: Simpan PDF di server untuk pengecekan manual
    const outputPath = path.join(
      process.cwd(),
      "public",
      `output${userId}.pdf`
    );
    fs.writeFileSync(outputPath, pdfBytes);
    console.log("✅ PDF berhasil dibuat dan disimpan di:", outputPath);

    // Kirim response dengan PDF sebagai file
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="contract.pdf"');
    res.status(200).end(pdfBytes); // Gunakan end() langsung tanpa send()
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
