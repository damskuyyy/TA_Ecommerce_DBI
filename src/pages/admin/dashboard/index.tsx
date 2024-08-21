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

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 space-y-8">
      <h2 className="font-bold text-2xl text-gray-700">Dashboard</h2>
      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 w-fit lg:w-full">
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
      <div className="bg-white shadow rounded-lg p-4 w-full">
        <h2 className="text-lg font-semibold text-gray-700">Recent Orders</h2>
        <div className="relative w-full overflow-auto">
          <Table className="w-full divide-y divide-gray-200 mt-4">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader className="bg-gray-50">
            <TableRow>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variant</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
            {[
                { id: '#25426', date: 'Nov 8th, 2023', customer: 'Kavin', variant: 'Base', quantity: 1, status: 'Delivered', amount: 200 },
                { id: '#25424', date: 'Nov 6th, 2023', customer: 'Nikhil', variant: 'Base', quantity: 1, status: 'Delivered', amount: 200 },
                { id: '#25423', date: 'Nov 5th, 2023', customer: 'Shivam', variant: 'Base', quantity: 1, status: 'Canceled', amount: 200 },
                { id: '#25422', date: 'Nov 4th, 2023', customer: 'Shadab', variant: 'Pro', quantity: 1, status: 'Delivered', amount: 200 },
                { id: '#25421', date: 'Nov 2nd, 2023', customer: 'Yogesh', variant: 'Pro', quantity: 1, status: 'Delivered', amount: 200 },
              ].map((order, idx) => (
                <TableRow key={idx}>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{`Lorem Ipsum`}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{order.id}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{order.date}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{order.customer}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{order.variant}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">X{order.quantity}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">₹{order.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
