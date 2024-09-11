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
import OrderDataTypes from "@/types/orderDataTypes";

const orders: OrderDataTypes[] = [
  {
    id: "#25423",
    products: [],
    status: [],
    userId: "#12345",
    xenditId: "#09876",
    orderDate: new Date,
    users: [],
  },
  {
    id: "#25423",
    products: [],
    status: [],
    userId: "#12345",
    xenditId: "#09876",
    orderDate: new Date,
    users: [],
  },
  {
    id: "#25423",
    products: [],
    status: [],
    userId: "#12345",
    xenditId: "#09876",
    orderDate: new Date,
    users: [],
  },
  {
    id: "#25423",
    products: [],
    status: [],
    userId: "#12345",
    xenditId: "#09876",
    orderDate: new Date,
    users: [],
  },
  {
    id: "#25423",
    products: [],
    status: [],
    userId: "#12345",
    xenditId: "#09876",
    orderDate: new Date,
    users: [],
  },
  {
    id: "#25423",
    products: [],
    status: [],
    userId: "#12345",
    xenditId: "#09876",
    orderDate: new Date,
    users: [],
  },
  {
    id: "#25423",
    products: [],
    status: [],
    userId: "#12345",
    xenditId: "#09876",
    orderDate: new Date,
    users: [],
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
            <TableBody className="bg-white divide-y divide-gray-200">
              {orders.map((order, idx) => (
                <TableRow key={idx}>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{order.id}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{order.products}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{order.status}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{order.userId}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{order.xenditId}</TableCell>
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
                      {order.status}
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
