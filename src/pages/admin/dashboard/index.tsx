import React from "react";
import CardDashboard from "@/components/ui/cardDashboard"; // Import the Card component
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Head from "next/head";

const Dashboard: React.FC = () => {
  return (
    <>
      <Head>
        <title>DBIX | Admin - dashboard</title>
      </Head>
      <div className="lg:p-4 p-1 space-y-6">
        <div className="space-y-3">
          <h2 className="font-bold text-4xl">Dashboard</h2>
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
                <BreadcrumbPage className="font-semibold">
                  Dashboard
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CardDashboard
            title="Total User"
            value={40689}
            description="8.5% Up from yesterday"
            descriptionColor="text-green-500"
          />
          <CardDashboard
            title="Total Order"
            value={10293}
            description="1.3% Up from past week"
            descriptionColor="text-green-500"
          />
          <CardDashboard
            title="Total Sales"
            value="$89,000"
            description="4.3% Down from yesterday"
            descriptionColor="text-red-500"
          />
          <CardDashboard
            title="Total Pending"
            value={2040}
            description="1.8% Up from yesterday"
            descriptionColor="text-green-500"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg lg:p-4 p-1">
          <h2 className="text-lg font-semibold text-gray-700">Recent Orders</h2>
          <ScrollArea className="lg:pb-0 pb-4">
            <Table className="min-w-full divide-y divide-gray-200 mt-4">
              <TableCaption>A list of your recent invoices.</TableCaption>
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
                ].map((order, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {order.id}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {order.products}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {order.status}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {order.userId}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {order.xenditId}
                    </TableCell>
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
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="overflow-x-auto shadow-md"></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
