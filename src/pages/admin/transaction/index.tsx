import React from "react";
import CardTransactions from "@/components/ui/cardTransactions";  // Import the Card component
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

const Transaction: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <div className='space-y-2'>
        <h1 className="text-4xl font-bold">Transactions</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">DBIX</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">Transactions</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <CardTransactions
          title="Total User"
          value={40689}
          description="8.5% Up from yesterday"
          descriptionColor="text-green-500"
        />
        <CardTransactions
          title="Total Order"
          value={10293}
          description="1.3% Up from past week"
          descriptionColor="text-green-500"
        />
        <CardTransactions
          title="Total Sales"
          value="$89,000"
          description="4.3% Down from yesterday"
          descriptionColor="text-red-500"
        />
        <CardTransactions
          title="Total Pending"
          value={2040}
          description="1.8% Up from yesterday"
          descriptionColor="text-green-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg p-4 dark:bg-black">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Recent Orders</h2>
        <div className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200 mt-4">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader className="bg-gray-50 dark:bg-gray-900">
              <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Id
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Id
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Xendit Id
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Date
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-950">
            {[
                        {
                          id: "#25423",
                          products: [],
                          status: [],
                          userId: "#12345",
                          xenditId: "#09876",
                          orderDate: new Date(),
                          users: [],
                        },
                        {
                          id: "#25423",
                          products: [],
                          status: [],
                          userId: "#12345",
                          xenditId: "#09876",
                          orderDate: new Date(),
                          users: [],
                        },
                        {
                          id: "#25423",
                          products: [],
                          status: [],
                          userId: "#12345",
                          xenditId: "#09876",
                          orderDate: new Date(),
                          users: [],
                        },
                        {
                          id: "#25423",
                          products: [],
                          status: [],
                          userId: "#12345",
                          xenditId: "#09876",
                          orderDate: new Date(),
                          users: [],
                        },
                        {
                          id: "#25423",
                          products: [],
                          status: [],
                          userId: "#12345",
                          xenditId: "#09876",
                          orderDate: new Date(),
                          users: [],
                        },
              ].map((transaction, idx) => (
                <TableRow key={idx}>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{transaction.id}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{transaction.products}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{transaction.status}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{transaction.userId}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{transaction.xenditId}</TableCell>
                    {/* <TableCell className="px-6 py-4 whitespace-nowrap">{new Date(order.orderDate)}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{order.users}</TableCell> */}
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {/* <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    > */}
                      {transaction.status}
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

export default Transaction;