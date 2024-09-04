import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ProductDataType } from "@/types/productDataTypes";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import formattedPrice from "@/utils/formattedPrice";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  calculateSubtotal,
  calculateTransactionFee,
  calculateApplicationFee,
  calculateTax,
  calculateTotal,
} from "@/utils/calcutale";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Image } from "lucide-react";

// Komponen Modal
const PaymentProofModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [image, setImage] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setImage(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }
    const formData = new FormData();
    formData.append("paymentProof", image);
    try {
      const response = await axios.post("/api/upload-payment-proof", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("Payment proof uploaded successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Error uploading payment proof:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Upload Payment Proof</h2>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-8 rounded-lg mb-4 text-center cursor-pointer ${
            isDragActive ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <Image />
            </div>
            {image ? (
              <p className="text-gray-500">{image.name}</p>
            ) : (
              <>
                <p className="text-gray-500 mb-1">Attach File</p>
                <p className="text-gray-400">or Drag & Drop</p>
              </>
            )}
          </div>
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Submit
        </Button>
        <Button onClick={onClose} className="w-full mt-2" variant="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
};

const CheckoutPage = ({ products }: { products: ProductDataType[] }) => {
  const { id } = useRouter().query;
  const [isModalOpen, setModalOpen] = useState(false);

  const transactionValue = 0.05; // 5% transaction fee
  const applicationValue = 0.02; // 2% application fee
  const taxRate = 0.1; // 10% tax
  const subtotal = calculateSubtotal(products);
  const transactionFee = calculateTransactionFee(subtotal, transactionValue);
  const applicationFee = calculateApplicationFee(subtotal, applicationValue);
  const tax = calculateTax(subtotal, taxRate);
  const total = calculateTotal(
    products,
    transactionValue,
    applicationValue,
    taxRate
  );

  const postCheckout = async () => {
    try {
      const resp = await axios.post("/api/payment/create-checkout", {
        amount: total,
        description: `Checkout for ${String(id).replace("-", " ")}`,
        items: [],
      });
      if (resp.status === 200) {
        setTimeout(() => {
          window.open(resp.data.data.invoiceUrl);
          setModalOpen(true);
        }, 500);
      }
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>DBIX | user - checkout</title>
      </Head>
      <div className="w-full space-y-8 pb-16">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold">DBIX Checkout</h1>
          <p className="">Checkout for {String(id).replace("-", " ")}</p>
        </div>
        <ScrollArea>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code product</TableHead>
                <TableHead>Ordered product</TableHead>
                <TableHead>Unit price</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Item subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {item.code_product}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 lg:flex-row flex-col">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-16 h-10 object-cover rounded-lg"
                      />
                      <div className="space-y-0 text-sm text-muted-foreground">
                        <p className="text-primary font-semibold">
                          {item.name}
                        </p>
                        <p className="">Variat : {item.variant}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formattedPrice.toIDR(item.price)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {formattedPrice.toIDR(item.price * Number(item.quantity))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="w-full pt-4 border-t-2 border-dashed">
          <div className="gap-16 rounded-md place-items-start grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full space-y-2">
              <p className="text-lg font-medium">Message for sellers</p>
              <Textarea placeholder="Type your message here..." />
            </div>
            <div className="space-y-2 w-full">
              <div className="flex w-full justify-between">
                <h1 className="font-semibold text-primary text-sm">Subtotal</h1>
                <p className="text-gray-500 text-sm">
                  {formattedPrice.toIDR(subtotal)}
                </p>
              </div>
              <hr />
              <div className="flex w-full justify-between">
                <h1 className="font-semibold text-primary text-sm">TAX :</h1>
                <p className="text-gray-500 text-sm text-right">
                  ({taxRate * 100}%) {formattedPrice.toIDR(tax)}{" "}
                </p>
              </div>

              <div className="flex w-full justify-between">
                <h1 className="font-semibold text-primary text-sm">
                  Transaction fee
                </h1>
                <p className="text-gray-500 text-sm text-right">
                  ({transactionValue * 100}%){" "}
                  {formattedPrice.toIDR(transactionFee)}{" "}
                </p>
              </div>
              <div className="flex w-full justify-between">
                <h1 className="font-semibold text-primary text-sm">
                  Application fee
                </h1>
                <p className="text-gray-500 text-sm text-right">
                  ({applicationValue * 100}%){" "}
                  {formattedPrice.toIDR(applicationFee)}{" "}
                </p>
              </div>
              <hr />
              <div className="flex w-full justify-between">
                <h1 className="font-semibold text-primary text-sm">TOTAL :</h1>
                <p className="text-primary font-bold text-2xl">
                  {formattedPrice.toIDR(total)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-16">
          <p className="text-muted-foreground">
            By clicking “Place Order”, I agree to the Product Protection's Terms
            & Conditions.
          </p>
          <div className="space-y-4">
            <Button onClick={postCheckout} className="w-full text-lg" size={"lg"}>
              Place order
            </Button>
          </div>
        </div>
      </div>

      <PaymentProofModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default CheckoutPage;
