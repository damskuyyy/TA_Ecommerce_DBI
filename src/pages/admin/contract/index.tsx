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

const Contract: React.FC = () => {
  const [contractData, setContractData] = useState([]);
  // const [pdfUrl, setPdfUrl] = useState<string | null>(null);

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
      const resp = await axios(`/api/contract/get`);
      setContractData(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContractData();
  }, []);

  // Handle preview PDF
  // const handlePreview = (filename: string) => {
  //   if (!filename) return;
  //   const fileUrl = `http://localhost:3000/api/contract/post/getPdf?filename=${filename}`;
  //   setPdfUrl(fileUrl);
  // };

  const agreement = form.watch("agreement");

  const onSubmit = async (item: any) => {
    const values = form.getValues();

    try {
      // Update kontrak dengan PUT request
      const response = await axios.put("/api/contract/put", {
        contractId: item.id, // Sesuai dengan API
        status: "AWAITING_CLIENT_SIGNATURE", // atau "Processing"
        ...values, // Kirim data yang diperbarui
      });

      console.log("Response after PUT:", response.data);

      // Cek apakah response.data berisi data kontrak yang benar
      if (!response.data || !response.data.contract) {
        throw new Error("Data kontrak tidak tersedia dalam response.");
      }

      const updatedContract = response.data.contract;

      // Kirim data ke API untuk pembuatan PDF
      const pdfResponse = await axios.post(
        "/api/contract/post/admin",
        updatedContract,
        {
          responseType: "arraybuffer",
        }
      );

      if (pdfResponse.status === 200) {
        // Logika setelah PDF berhasil dibuat
        const pdfBlob = new Blob([pdfResponse.data], {
          type: "application/pdf",
        });

        const formData = new FormData();
        formData.append("contractId", updatedContract.id);
        formData.append("userId", updatedContract.userID);
        formData.append(
          "pdfFile",
          new File([pdfBlob], "contract.pdf", { type: "application/pdf" })
        );

        // Upload PDF ke server
        await axios.put("/api/contract/pdf/put", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Kontrak berhasil diperbarui dan PDF telah dibuat!");
        form.reset();
        getContractData();
      } else {
        throw new Error("Gagal membuat PDF");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Terjadi kesalahan saat memperbarui kontrak atau membuat PDF.");
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
                {/* <TableHead>Price</TableHead> */}
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-950">
              {contractData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.product?.name || "Unknown"}</TableCell>
                  {/* <TableCell>{item.price}</TableCell> */}
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
                  {/* <TableCell>
                    <Button
                      onClick={() => handlePreview(item.filename)}
                      className="bg-gray-400 text-black px-2 py-2 rounded-md"
                    >
                      Preview
                    </Button>
                  </TableCell> */}
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>View</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>Info Data Client</DialogHeader>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <span>Full Name</span>
                          <span>{item.fullName}</span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <span>Address</span>
                          <span>{item.address}</span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <span>Start Date</span>
                          <span>{item.startDate}</span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <span>End Date</span>
                          <span>{item.endDate}</span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <span>Description Contract</span>
                          <span>{item.descriptionContract}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <span>Features</span>
                          <ul>
                            {item.features.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <span>Scope of Work</span>
                          <span>{item.scopeOfWork}</span>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>try</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>Fill Data and Sign</DialogHeader>
                          <div>
                            <Form {...form}>
                              <form
                                onSubmit={form.handleSubmit(() =>
                                  onSubmit(item)
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
                                  ></FormField>
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
                                  disabled={!agreement}
                                >
                                  Create Contract
                                </Button>
                              </form>
                            </Form>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button className="bg-gray-400 text-black px-2 py-2 rounded-md">
                        Fill Data and Sign
                      </Button>
                      <Button className="bg-gray-50 text-black px-2 py-2 rounded-md w-fit">
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

      {/* Modal Info*/}
      {/* {pdfUrl && (
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
      )} */}
    </div>
  );
};

export default Contract;
