import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SignaturePad from "@/components/ui/signature-pad";
import { Checkbox } from "@/components/ui/checkbox";
import ContractPDF from "@/pages/pdf";
import { pdf } from "@react-pdf/renderer";

const Contract = () => {
  const [contractData, setContractData] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      contractName: "",
      cost: "",
      signature: "",
      agreement: false,
    },
  });

  const getContractData = async () => {
    try {
      const resp = await axios("/api/contract/get");
      setContractData(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContractData();
  }, []);

  const handlePreview = (filename) => {
    if (!filename) return;
    const fileUrl = `http://localhost:3000/api/contract/pdf/get?filename=${filename}`;
    setPdfUrl(fileUrl);
  };

  const agreement = form.watch("agreement");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const pdfPromise = pdf(<ContractPDF data={data} />).toBlob();

      const response = await axios.put("/api/contract/put", {
        ...data,
        status: "AWAITING_CLIENT_SIGNATURE",
      });

      if (!response.data?.contract) {
        throw new Error("Data kontrak tidak tersedia.");
      }

      const updatedContract = response.data.contract;
      const blob = await pdfPromise;
      const pdfBuffer = await blob.arrayBuffer();

      const formData = new FormData();
      formData.append("contractId", updatedContract.id);
      formData.append("userId", updatedContract.userId);
      formData.append(
        "pdfFile",
        new File([pdfBuffer], "contract.pdf", { type: "application/pdf" })
      );

      const uploadResponse = await axios.put(
        "/api/contract/pdf/put",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (uploadResponse.status === 201) {
        alert("Kontrak berhasil diperbarui dan PDF telah dibuat!");
        form.reset();
        getContractData();
      } else {
        throw new Error("Gagal mengunggah PDF ke server.");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Terjadi kesalahan saat memperbarui kontrak atau membuat PDF.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectContract = async (id) => {
    try {
      const confirmDelete = confirm(
        "Apakah kamu yakin ingin menolak kontrak ini?"
      );
      if (!confirmDelete) return;

      await axios.delete(`/api/contract/delete/${id}`);
      alert("Kontrak berhasil ditolak");
      getContractData();
    } catch (e) {
      console.error("❌ Gagal menolak kontrak:", e);
      alert("Terjadi kesalahan saat menolak kontrak");
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Contract</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">DBI</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                Contract
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg p-4 dark:bg-black">
        <div className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200 mt-4">
            <TableCaption>A list of your recent contracts.</TableCaption>
            <TableHeader className="bg-gray-50 dark:bg-gray-900">
              <TableRow>
                <TableHead>Id Contract</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Id User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Contract</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-950">
              {contractData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.product?.name || "Unknown"}</TableCell>
                  <TableCell>{item.userId}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Processing"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>View</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>Info Data Client</DialogHeader>
                        {/* Add client info here */}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    {item.status !== "PENDING_APPROVAL" ? (
                      <Button
                        onClick={() => handlePreview(item.filename)}
                        className="bg-gray-400 text-black px-2 py-2 rounded-md"
                      >
                        Preview
                      </Button>
                    ) : (
                      <span>-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      {item.status === "PENDING_APPROVAL" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>Fill Data and Sign</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>Fill Data and Sign</DialogHeader>
                            <Form {...form}>
                              <form
                                onSubmit={form.handleSubmit((data) =>
                                  onSubmit({ ...item, ...data })
                                )}
                                className="space-y-8"
                              >
                                {[
                                  {
                                    name: "contractName",
                                    label: "Contract Name",
                                    type: "text",
                                  },
                                  {
                                    name: "cost",
                                    label: "Cost",
                                    type: "number",
                                  },
                                ].map(({ name, label, type }) => (
                                  <FormField
                                    key={name}
                                    control={form.control}
                                    name={name}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>{label}</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder={label}
                                            type={type}
                                            {...field}
                                            required
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                ))}
                                <SignaturePad
                                  onSave={(signature) =>
                                    form.setValue("signature", signature)
                                  }
                                />
                                <div className="flex items-center gap-2 mt-4">
                                  <FormField
                                    control={form.control}
                                    name="agreement"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            required
                                          />
                                        </FormControl>
                                        <span>Setuju</span>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <Button
                                  type="submit"
                                  className="mt-4 w-full bg-black text-white"
                                  disabled={!agreement || isSubmitting}
                                >
                                  {isSubmitting
                                    ? "Creating..."
                                    : "Create Contract"}
                                </Button>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>
                      )}
                      <Button
                        className="bg-gray-50 text-black px-2 py-2 rounded-md w-fit"
                        onClick={() => handleRejectContract(item.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal PDF Preview */}
      {pdfUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] h-[90%] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Preview Contract</h2>
              <Button
                onClick={() => setPdfUrl(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </Button>
            </div>
            <iframe src={pdfUrl} className="w-full flex-grow" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Contract;
