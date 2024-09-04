import { ItemDataType } from "@/types/itemsDataTypes";
import React, { Dispatch, SetStateAction } from "react";

type props ={
  items: ItemDataType[],
  setItems: Dispatch<SetStateAction<ItemDataType[]>>
}

const Invoice = ({items, setItems}: props) => {
  return (
    <div className="p-8 bg-white shadow-lg max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full h-32">
          <div className="absolute top-0 left-0 w-fit h-32 bg-black z-40 flex justify-center px-10 flex-col">
            <h1 className="text-3xl font-bold text-white">DBIX</h1>
            <p className="text-white">PT. Digital Blockchain Indonesia</p>
          </div>
          <div className="absolute top-0 left-[35%] w-[100px] h-28 bg-gray-500 z-20 transform origin-top-left"></div>
          <div className="absolute top-0 left-[48%] w-[50px] h-24 bg-gray-400 z-10 transform origin-top-left"></div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <p className="font-bold">Invoice To:</p>
          <p className="text-gray-500">Omy Gusti</p>
          <p className="text-gray-500">Managing Director, Company Ltd.</p>
          <p className="text-gray-500">Phone: +123 4567 8910</p>
          <p className="text-gray-500">Email: example@mail.com</p>
        </div>
        <div className="text-left md:text-right">
          <p className="font-bold">Invoice From:</p>
          <p className="text-gray-500">Ramzi Daffa</p>
          <p className="text-gray-500">Managing Director, Company Ltd.</p>
          <p className="text-gray-500">Phone: +123 4567 8910</p>
          <p className="text-gray-500">Email: example@mail.com</p>
        </div>
      </div>
      <div className="lg:overflow-x-hidden overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 mb-6">
        <thead>
          <tr className="bg-black text-white ">
            <th className="px-6 py-3 text-left text-xs font-medium">NO.</th>
            <th className="px-6 py-3 text-left text-xs font-medium">
              PRODUCT DESCRIPTION
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium">PRICE</th>
            <th className="px-6 py-3 text-left text-xs font-medium">QTY.</th>
            <th className="px-6 py-3 text-left text-xs font-medium">TOTAL</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item}>
              <td className="px-6 py-4 whitespace-nowrap">{item}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="font-bold">Business Card Design</p>
                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">$50</td>
              <td className="px-6 py-4 whitespace-nowrap">2</td>
              <td className="px-6 py-4 whitespace-nowrap">$100.00</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <p className="font-bold">Payment Method:</p>
          <p>Account No: 1234 5678 910</p>
          <p>Account Name: Omy Gusti</p>
          <p>Branch Name: XYZ</p>
        </div>
        <div className="text-left md:text-right">
          <div className="mb-2">
            <p>Subtotal: $3150.00</p>
            <p>Discount: $0.00</p>
          </div>
          <div className="text-2xl font-bold">Total: $3465.00</div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
