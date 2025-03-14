import { useState } from "react";
import axios from "axios";

export default function ContractForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/contract/createPDF",
        {
          userId: "Zitutt ngentutan",
          productId: "674403a5174ecfa6e493c5d5",
          signature: ""
        },
        {
          responseType: "arraybuffer", // Pastikan response dikembalikan sebagai binary
        }
      );

      if (response.status === 200) {
        console.log("✅ PDF berhasil dibuat");

        // Buat blob dari response dan buka PDF
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
        console.error("❌ Gagal membuat kontrak");
        alert("Gagal membuat kontrak");
      }
    } catch (error) {
      console.error("❌ Error generating contract:", error);
      alert("Terjadi kesalahan saat membuat kontrak.");
    }

    setLoading(false);
  };

  return (
    <button onClick={handleSubmit} disabled={loading}>
      {loading ? "Memproses..." : "Generate Kontrak"}
    </button>
  );
}
