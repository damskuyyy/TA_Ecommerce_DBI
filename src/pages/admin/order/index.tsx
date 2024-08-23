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

const orders: OrderDataTypes[] = [
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    variant: "Base",
    quantity: 1,
    status: "Completed",
    amount: 200,
  },
  {
    id: "#25424",
    date: "Nov 6th, 2023",
    customer: "Nikhil",
    variant: "Base",
    quantity: 1,
    status: "Processing",
    amount: 200,
  },
  {
    id: "#25423",
    date: "Nov 5th, 2023",
    customer: "Shivam",
    variant: "Base",
    quantity: 1,
    status: "Rejected",
    amount: 200,
  },
  {
    id: "#25422",
    date: "Nov 4th, 2023",
    customer: "Shadab",
    variant: "Pro",
    quantity: 1,
    status: "Completed",
    amount: 200,
  },
  {
    id: "#25421",
    date: "Nov 2nd, 2023",
    customer: "Yogesh",
    variant: "Pro",
    quantity: 1,
    status: "Completed",
    amount: 200,
  },
  {
    id: "#25420",
    date: "Nov 2nd, 2023",
    customer: "Yogesh",
    variant: "Pro",
    quantity: 1,
    status: "Processing",
    amount: 200,
  },
  {
    id: "#25419",
    date: "Nov 2nd, 2023",
    customer: "Yogesh",
    variant: "Pro",
    quantity: 1,
    status: "Rejected",
    amount: 200,
  },
];

const OrderTable: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <div className='space-y-2'>
        <h1 className="text-4xl font-bold">Orders</h1>
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
              <BreadcrumbPage className="font-semibold">Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* filter */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg">
              Filter By
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg">
              Date
            </button>
            <button className="bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg">
              Order Status
            </button>
          </div>
        </div>
        <button className="text-red-500 flex items-center space-x-1">
          <span>Reset Filter</span>

        </button>
      </div>

      {/* table */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variant
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {orders.map((order, idx) => (
                <TableRow key={idx}>
                  <TableCell className="px-6 py-4 whitespace-nowrap">Lorem Ipsum</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{order.id}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{order.date}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {order.customer}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {order.variant}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    X{order.quantity}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    ₹{order.amount.toFixed(2)}
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

export default OrderTable;
