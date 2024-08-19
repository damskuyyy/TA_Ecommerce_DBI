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

const Transaction: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="font-bold text-2xl text-gray-700">Dashboard</h2>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700">Recent Orders</h2>
        <div className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200 mt-4">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader className="bg-gray-50">
            <TableRow>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Xandit ID</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customers ID</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
            {[
                { XanditID: 200, id: '#25426', date: 'Nov 8th, 2023',  type: 'Credit Card', total: 1 , product:'lorem ipsum', status: 'Completed'},
                { XanditID: 200, id: '#25424', date: 'Nov 6th, 2023',  type: 'Credit Card', total: 1 , product:'lorem ipsum', status: 'Completed'},
                { XanditID: 200, id: '#25423', date: 'Nov 5th, 2023',  type: 'Credit Card', total: 1 , product:'lorem ipsum', status: 'Processing'},
                { XanditID: 200, id: '#25422', date: 'Nov 4th, 2023',  type: 'Wallet', total: 1 , product:'lorem ipsum', status: 'Processing'},
                { XanditID: 200, id: '#25421', date: 'Nov 2nd, 2023',  type: 'Wallet', total: 1 , product:'lorem ipsum', status: 'Completed'},
              ].map((transaction, idx) => (
                <TableRow key={idx}>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{transaction.XanditID}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{transaction.id}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{transaction.date}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{transaction.type}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">X{transaction.total}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">{transaction.product}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {transaction.status}
                    </span>
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