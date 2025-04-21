import { NextApiRequest, NextApiResponse } from "next";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    fullName,
    address,
    contractName,
    cost,
    startDate,
    endDate,
    features,
    scopeOfWork,
    signature,
  } = req.body;

  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const margin = 50;
    let y = 800;

    const drawText = (text: string, x: number, y: number, size = 12) => {
      page.drawText(text, { x, y, size, font, color: rgb(0, 0, 0) });
    };

    const drawWrappedText = (
      text: string,
      x: number,
      yStart: number,
      lineHeight: number,
      maxChars: number
    ) => {
      const lines = text.match(new RegExp(`.{1,${maxChars}}`, "g")) || [text];
      let yPos = yStart;
      lines.forEach((line) => {
        drawText(line, x, yPos);
        yPos -= lineHeight;
      });
      return yPos;
    };

    // Title
    drawText("Digital Contract", margin, y, 18);
    y -= 40;

    // Basic info
    drawText(`Contract Name: ${contractName}`, margin, (y -= 20));
    drawText(`Client Name: ${fullName}`, margin, (y -= 20));
    drawText(`Address: ${address}`, margin, (y -= 20));
    drawText(`Project Cost: Rp ${cost}`, margin, (y -= 20));
    drawText(`Start Date: ${startDate}`, margin, (y -= 20));
    drawText(`End Date: ${endDate}`, margin, (y -= 20));

    // Features
    y -= 25;
    drawText("Features:", margin, (y -= 15));
    features?.forEach((feature: string) => {
      drawText(`- ${feature}`, margin + 20, (y -= 15));
    });

    // Scope of Work
    y -= 25;
    drawText("Scope of Work:", margin, (y -= 15));
    y = drawWrappedText(scopeOfWork, margin + 20, y - 10, 15, 90);

    // Signature
    if (signature) {
      const signatureImage = await pdfDoc.embedPng(signature);
      const dims = signatureImage.scale(0.5);
      page.drawImage(signatureImage, {
        x: margin,
        y: y - dims.height - 20,
        width: dims.width,
        height: dims.height,
      });
      y -= dims.height + 30;
    }

    // Signature name and date
    drawText(`Signed by: ${fullName}`, margin, y);
    drawText(`Signed at: ${new Date().toLocaleDateString()}`, margin, y - 15);

    const pdfBytes = await pdfDoc.save();
    res.setHeader("Content-Type", "application/pdf");
    res.status(200).send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate contract." });
  }
}
