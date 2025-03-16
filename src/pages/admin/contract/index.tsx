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

const Contract: React.FC = () => {
  const [contractData, setContractData] = useState([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

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
  const handlePreview = (filename: string) => {
    if (!filename) return;
    const fileUrl = `http://localhost:3000/api/contract/post/getPdf?filename=${filename}`;
    setPdfUrl(fileUrl);
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
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contract</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-950">
              {contractData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.product?.name || "Unknown"}</TableCell>
                  <TableCell>{item.price}</TableCell>
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
                    <Button
                      onClick={() => handlePreview(item.filename)}
                      className="bg-gray-400 text-black px-2 py-2 rounded-md"
                    >
                      Preview
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button className="bg-gray-400 text-black px-2 py-2 rounded-md">
                      Accept
                    </Button>
                    <Button className="bg-gray-50 text-black px-2 py-2 rounded-md">
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal Preview PDF */}
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
