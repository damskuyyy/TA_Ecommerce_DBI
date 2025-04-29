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
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const Monitoring: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <div className='space-y-2'>
        <h1 className="text-4xl font-bold">Monitoring Progress</h1>
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
              <BreadcrumbPage className="font-semibold">Monitoring Progress</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg p-4 dark:bg-black">
        <div className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200 mt-4">
            <TableHeader className="bg-gray-50 dark:bg-gray-900">
              <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Id Transactions
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
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-950">
            {[
                        {
                          IdTransactions: "#25423",
                          products: [],
                          prices: [],
                          status: [],
                          contract: [],
                          actions: []
                        },
                        
              ].map((monitoring, idx) => (
                <TableRow key={idx}>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{monitoring.IdTransactions}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{monitoring.products}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{monitoring.prices}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{monitoring.status}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{monitoring.contract}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{monitoring.actions}</TableCell> 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;