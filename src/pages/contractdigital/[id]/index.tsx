"use client";

import { Button } from "@/components/ui/button";
import { ProductDataType } from "@/types/productDataTypes";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Gallery from "@/components/ui/galery";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import formattedPrice from "@/utils/formattedPrice";
import { useProductStore } from "@/store/product";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { StarIcon } from "@radix-ui/react-icons";
import SignaturePad from "@/components/ui/signature-pad";

const Contractdigital = () => {
  const { id } = useRouter().query; //deklarasi state, mengambil parameter id dari url menggunakan userouter untuk menentukan produk yg sedang dilihat
  const { data: session, status }: any = useSession(); //mengambil data sesi pengguna (login)
  const [product, setProduct] = useState<ProductDataType>(
    {} as ProductDataType
  ); //menyimpan data produk dari api
  const [variant, setVariant] = useState(""); //menyimpan varian produk yang dipilih
  const [load, setLoad] = useState(false); //loading data
  const { toast } = useToast(); //untuk menampilkan notifikasi kepada pengguna
  const [updated, setUpdated] = useState(false); //menandai perubahan sehingga dapat memicu pengambilan ulang data
  const [signature, setSignature] = useState<string | null>(null);

  const router = useRouter();
  const { updateProduct } = useProductStore();

  const handleSignatureSave = (data: string) => {
    setSignature(data); // Simpan base64 tanda tangan
  };

  const handleSubmit = async () => {
    try {
      // Generate PDF
      const response = await axios.post(
        "/api/contract/createPDF",
        {
          userId: "asdasdas",
          productId: "asdasd",
          signature,
        },
        { responseType: "arraybuffer" }
      );

      if (response.status === 200) {
        console.log("✅ PDF berhasil dibuat");

        // Simpan PDF ke Blob
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });

        // Buat FormData untuk upload
        const formData = new FormData();
        formData.append("userId", "asdasd");
        formData.append("productId", "asasas");
        formData.append(
          "pdfFile",
          new File([pdfBlob], "contract.pdf", { type: "application/pdf" })
        );

        // Upload PDF ke GridFS
        await axios.post("/api/contract/post/pdf", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("✅ PDF berhasil diunggah");
        toast({ title: "Success", description: "PDF uploaded successfully!" });
      } else {
        console.error("❌ Gagal membuat kontrak");
        alert("Gagal membuat kontrak");
      }
    } catch (error) {
      console.error("❌ Error generating contract:", error);
      alert("Terjadi kesalahan saat membuat kontrak.");
    }
  };

  const getData = async () => {
    setLoad(true);
    if (id) {
      try {
        const resp = await axios(`/api/product/get?code=${String(id)}`); //menggunakan axios untuk mengambil data produk berdasarkan id
        setProduct(resp.data);
        setLoad(false); //status setload digunakan untuk menandai data yang sedang diambil
      } catch (error) {
        setLoad(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [id, updated]); //memanggil fungsi getdata setiap kali id atau updated berubah

  useEffect(() => {
    if (product.variants) {
      setVariant(product?.variants?.[0]);
    }
  }, [product.variants]); //menyimpan varian pertama produk saat data produk sudah diambil

  return (
    <>
      {product && (
        <div className="flex w-full justify-between lg:flex-row flex-col gap-10">
          <div className="w-full">
            <div className="flex flex-col gap-10 w-full">
              <div className="w-full grid grid-cols-1 gap-8">
                <div className="w-full">
                  <div className="w-full sticky top-24">
                    <Gallery image={product.image && product.image} />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  {load ? (
                    <Skeleton className="w-1/2 h-3" />
                  ) : (
                    <h1 className="text-2xl font-bold capitalize">
                      {product.name}
                    </h1>
                  )}
                  <div className="flex flex-col gap-2">
                    {load ? (
                      <div className="flex flex-col gap-3 w-full">
                        <Skeleton className="w-full h-2" />
                        <Skeleton className="w-full h-2" />
                        <Skeleton className="w-full h-2" />
                        <Skeleton className="w-full h-2" />
                      </div>
                    ) : (
                      <div
                        className="text-sm text-gray-500 font-medium"
                        dangerouslySetInnerHTML={{ __html: product.desc }}
                      />
                    )}
                    <div className="flex justify-between flex-wrap w-fit gap-3 items-center">
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-medium">
                          Sold {product.sold}
                        </p>
                      </div>
                      <div className="w-1 h-1 bg-zinc-900 rounded-full"></div>
                      <div className="flex items-center gap-1">
                        <StarIcon color="orange" />
                        <p className="text-sm font-medium">{product.rate}</p>
                      </div>
                      <div className="w-1 h-1 bg-zinc-900 rounded-full"></div>
                      <div className="flex items-center gap-1"></div>
                    </div>
                  </div>
                  {load ? (
                    <Skeleton className="w-3/4 h-5" />
                  ) : (
                    <h1 className="text-3xl font-bold">
                      {formattedPrice.toIDR(product.price)}
                    </h1>
                  )}
                  <hr />
                  <div className="flex flex-col gap-3">
                    <h1 className="font-semibold">Choose Variants :</h1>
                    <div className="flex items-center gap-3">
                      {load ? (
                        <Skeleton className="w-1/4 h-5" />
                      ) : (
                        product.variants?.map((item, index) => (
                          <Button
                            key={index}
                            onClick={() => setVariant(item)}
                            size={"sm"}
                            variant={variant === item ? "default" : "outline"}
                            className="capitalize"
                          >
                            {item}
                          </Button>
                        ))
                      )}
                    </div>
                  </div>
                  <hr />
                  <Tabs
                    defaultValue="details"
                    className="w-full flex flex-col gap-5 items-start"
                  >
                    <TabsList className="w-full h-fulll">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="specification">
                        Specification
                      </TabsTrigger>
                      <TabsTrigger value="information">Information</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="w-full">
                      <div className="flex flex-col w-full gap-1">
                        <p className="font-semibold text-gray-500 text-sm">
                          Min. Order:{" "}
                          <span className="text-black">{product.minOrder}</span>
                        </p>
                        <p className="font-semibold text-gray-500 text-sm">
                          Category:{" "}
                          <span className="text-black capitalize">
                            {product.category}
                          </span>
                        </p>
                        {load ? (
                          <div className="flex flex-col gap-2 mt-3">
                            <Skeleton className="w-full h-2" />
                            <Skeleton className="w-full h-2" />
                            <Skeleton className="w-full h-2" />
                            <Skeleton className="w-full h-2" />
                            <Skeleton className="w-full h-2" />
                          </div>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: String(product.details),
                            }}
                            className="text-sm text-gray-500 mt-3"
                          />
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="specification" className="w-full">
                      {load ? (
                        <div className="flex flex-col gap-2 mt-3">
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: String(product.spec),
                          }}
                          className="text-sm text-gray-500"
                        />
                      )}
                    </TabsContent>
                    <TabsContent value="information" className="w-full">
                      {load ? (
                        <div className="flex flex-col gap-2 mt-3">
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: String(product.information),
                          }}
                          className="text-sm text-gray-500"
                        />
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">Personal Info</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
              <Input placeholder="Email" />
              <Input placeholder="Phone Number" />
              <Input placeholder="Address" className="col-span-2" />
            </div>
            <h2 className="text-xl font-bold my-4">Contract Info</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Contract Name" />
              <Input placeholder="Cost" />
              <Input placeholder="Email" />
              <Input placeholder="Phone Number" />
              <Input type="date" placeholder="Start Date" />
              <Input type="date" placeholder="End Date" />
              <Textarea placeholder="Scope of Work" className="col-span-2" />
            </div>
            <SignaturePad onSave={handleSignatureSave} />
            <div className="flex items-center gap-2 mt-4">
              <Checkbox />
              <span>Setuju</span>
            </div>
            <Button
              className="mt-4 w-full bg-black text-white"
              onClick={handleSubmit}
            >
              Create Contract
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default Contractdigital;
