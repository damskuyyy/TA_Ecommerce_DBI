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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import OrderDataTypes from "@/types/orderDataTypes";
import axios from "axios";

const OrderTable: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [orders, setOrders] = useState<OrderDataTypes[]>([])

  const handleDateClick = () => {
    setShowCalendar(!showCalendar);
  };

  const getOrderData = async () => {
    try {
      const resp = await axios('/api/order/get')
      if (resp.status === 200) {
        setOrders(resp.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOrderData()
  }, [])

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
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
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4 dark:bg-gray-900">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg dark:bg-gray-950 dark:text-white">
              Filter By
            </button>
          </div>
          <Popover>
            <PopoverTrigger>
              <button
                onClick={handleDateClick}
                className="bg-white text-gray-600 px-4 py-2 rounded-lg dark:bg-gray-950 dark:text-white"
              >
                Date
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 dark:bg-gray-950 dark:text-white">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="bg-white text-gray-600 px-4 py-2 rounded-lg dark:bg-gray-950 dark:text-white">
                Order Status
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delivered</DropdownMenuItem>
              <DropdownMenuItem>Succes</DropdownMenuItem>
              <DropdownMenuItem>Process</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <button className="text-red-500 flex items-center space-x-1">
          <span>Reset Filter</span>
        </button>
      </div>

      {/* table */}
      <div className="bg-white shadow rounded-lg p-4 dark:bg-black">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 dark:text-white">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200">
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
                  Order Date
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Proof
                </TableHead>

              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-950">
              {orders && orders.length > 0 && orders.map((order, idx) => (
                <TableRow key={idx}>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {order.orderId}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {order.products[0].id}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "process"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-red-100 text-red-800"
                        }`}
                    >{order.status}</span>

                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {order.userId}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-6 capitalize py-4 whitespace-nowrap">
                    {order.paymentMethods}
                  </TableCell>
                  <TableCell className="px-6 capitalize py-4 whitespace-nowrap">
                    {order.paymentProof === '' ? '-' : (
                      <img src={order.paymentProof} alt="" />
                    )}</TableCell>

                  {/* <TableCell className="px-6 py-4 whitespace-nowrap">{new Date(order.orderDate)}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{order.users}</TableCell> */}

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
