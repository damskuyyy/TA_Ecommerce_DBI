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
import { Checkbox } from "@/components/ui/checkbox";
import ContractPDF from "@/pages/pdf";
import { pdf } from "@react-pdf/renderer";

const Contract = () => {
  const [contractData, setContractData] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [features, setFeatures] = useState([""]);

  const form = useForm({
    defaultValues: {
      contractName: "",
      cost: "",
      features: [],
      scopeOfWork: "",
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

  const handleAddFeature = () => {
    const newFeatures = [...features, ""];
    setFeatures(newFeatures);
    form.setValue("features", newFeatures);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
    form.setValue("features", newFeatures);
  };

  const handleDeleteFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
    form.setValue("features", newFeatures);
  };

  // const onSubmit = async (data) => {
  //   return console.log("data: ", data);
  //   setIsSubmitting(true);
  //   try {
  //     const pdfPromise = pdf(<ContractPDF data={data} />).toBlob();

  //     const response = await axios.put("/api/contract/put", {
  //       ...data,
  //       status: "AWAITING_CLIENT_SIGNATURE",
  //     });

  //     if (!response.data?.contract) {
  //       throw new Error("Data kontrak tidak tersedia.");
  //     }

  //     const updatedContract = response.data.contract;
  //     const blob = await pdfPromise;
  //     const pdfBuffer = await blob.arrayBuffer();

  //     const formData = new FormData();
  //     formData.append("contractId", updatedContract.id);
  //     formData.append("userId", updatedContract.userId);
  //     formData.append(
  //       "pdfFile",
  //       new File([pdfBuffer], "contract.pdf", { type: "application/pdf" })
  //     );

  //     const uploadResponse = await axios.put(
  //       "/api/contract/pdf/put",
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     if (uploadResponse.status === 201) {
  //       alert("Kontrak berhasil diperbarui dan PDF telah dibuat!");
  //       form.reset();
  //       setFeatures([""]);
  //       getContractData();
  //     } else {
  //       throw new Error("Gagal mengunggah PDF ke server.");
  //     }
  //   } catch (err) {
  //     console.error("❌ Error:", err);
  //     alert("Terjadi kesalahan saat memperbarui kontrak atau membuat PDF.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const onSubmit = async (data) => {
    console.log("data: ", data);
    setIsSubmitting(true);
    try {
      const response = await axios.put("/api/contract/put", {
        ...data,
      });

      if (response.status === 200) {
        alert("Data berhasil ditambahkan!");
        form.reset();
        setFeatures([""]);
        getContractData();
      } else {
        throw new Error("Respon server tidak sesuai.");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Data gagal ditambahkan!");
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
                            <Button>Fill Data</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>Fill Data</DialogHeader>
                            <Form {...form}>
                              <form
                                onSubmit={form.handleSubmit((data) =>
                                  onSubmit({ ...item, ...data })
                                )}
                                className="space-y-8"
                              >
                                <FormField
                                  control={form.control}
                                  name="cost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Cost</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          placeholder="Cost"
                                          {...field}
                                          required
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />

                                <div>
                                  <FormLabel>Features</FormLabel>
                                  <div className="space-y-2">
                                    {features.map((feature, index) => (
                                      <div
                                        key={index}
                                        className="flex gap-2 items-center"
                                      >
                                        <Input
                                          placeholder={`Feature ${index + 1}`}
                                          type="text"
                                          value={feature}
                                          onChange={(e) =>
                                            handleFeatureChange(
                                              index,
                                              e.target.value
                                            )
                                          }
                                          required
                                        />
                                        <Button
                                          type="button"
                                          variant="destructive"
                                          onClick={() =>
                                            handleDeleteFeature(index)
                                          }
                                        >
                                          Delete
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                  <Button
                                    type="button"
                                    className="mt-2 bg-gray-100 text-black"
                                    onClick={handleAddFeature}
                                  >
                                    + Tambah Feature
                                  </Button>
                                </div>

                                <FormField
                                  control={form.control}
                                  name="scopeOfWork"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Scope Of Work</FormLabel>
                                      <FormControl>
                                        <textarea
                                          className="w-full border border-gray-300 p-2 rounded"
                                          placeholder="Scope Of Work"
                                          rows={4}
                                          {...field}
                                          required
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
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
    </div>
  );
};

export default Contract;
