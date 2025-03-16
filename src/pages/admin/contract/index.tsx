import React from "react";
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

const Contract: React.FC = () => {
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
              <BreadcrumbPage className="font-semibold">Contract</BreadcrumbPage>
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
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Id Contract
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-950">
              {[
                {
                  id: "#25423",
                  products: "Product A",
                  price: "10000",
                  status: "Completed",
                  contract: "contract.file",
                  action: "",
                },
              ].map((transaction, idx) => (
                <TableRow key={idx}>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{transaction.id}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{transaction.products}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{transaction.price}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "Processing"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{transaction.contract}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{transaction.action}
                  <Button className="bg-gray-400 text-black px-2 py-2 rounded-md">Accept</Button>
                  <Button className= "bg-gray-50 text-black px-2 py-2 rounded-md">Reject</Button>
                  </TableCell>
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
