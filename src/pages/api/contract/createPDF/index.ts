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
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      contractName,
      cost,
      startDate,
      endDate,
      scopeOfWork,
      signature,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !address ||
      !contractName ||
      !cost ||
      !startDate ||
      !endDate ||
      !scopeOfWork ||
      !signature
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    console.log("🔹 Received Data:", req.body);

    // Path ke template PDF
    const pdfPath = path.join(process.cwd(), "public", "contract-template.pdf");

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: "Template PDF not found" });
    }

    // Load PDF template ke pdf-lib
    const templateBuffer = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(templateBuffer);
    const form = pdfDoc.getForm();

    // Isi field teks dalam PDF (sesuai dengan field dalam template)
    form.getTextField("firstName").setText(firstName);
    form.getTextField("lastName").setText(lastName);
    form.getTextField("email").setText(email);
    form.getTextField("phoneNumber").setText(phoneNumber);
    form.getTextField("address").setText(address);
    form.getTextField("contractName").setText(contractName);
    form.getTextField("cost").setText(cost);
    form.getTextField("startDate").setText(startDate);
    form.getTextField("endDate").setText(endDate);
    form.getTextField("scopeOfWork").setText(scopeOfWork);

    // Konversi tanda tangan dari base64 ke Uint8Array
    const signatureData = signature.replace(/^data:image\/png;base64,/, ""); // Hapus prefix base64
    const signatureBytes = Buffer.from(signatureData, "base64");
    const signatureImage = await pdfDoc.embedPng(signatureBytes);

    // Tambahkan tanda tangan di posisi yang benar
    const page = pdfDoc.getPages()[0]; // Halaman pertama
    const { width, height } = page.getSize();
    page.drawImage(signatureImage, {
      x: width - 220, // Posisi dari kanan
      y: 100, // Posisi dari bawah
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
