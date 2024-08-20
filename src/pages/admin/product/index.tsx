import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import ModalDelete from '@/components/ui/modals/deleteProduct'; 


type Product = {
  title: string;
  description: string;
  price: number;
}

type Pagination ={
  currentPage: number;
  totalPages: number;
  onPageChange : (page: number) => void;
}

const convertRupiah = (value:number)=>{
  const formatRupiah = new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(value);
  return formatRupiah
}

const ProductCard = ({ 
    title, 
    description, 
    price }: Product) => (
      <Card className="shadow-lg">
      <CardHeader className="flex p-4 justify-items-start border-b">
        <div className="flex-shrink-0 items-start">
          <img src="/admin/product/product.png" alt={title} className="h-16 w-16 object-cover" />
        </div>
        <div className="ml-4 flex-grow justify-items-end">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
          <p className="text-md font-bold mt-2">{convertRupiah(price)}</p>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-center gap-2 p-4">
        <Button className="bg-black text-white">Edit Product</Button>
        <Button variant="outline" className="border border-[#00B69B] text-[#00B69B] hover:bg-[#00B69C] hover:text-white">View Product</Button>
        <ModalDelete />
      </CardFooter>
    </Card>
);

const Pagination = ({ currentPage, totalPages, onPageChange }:Pagination) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center mt-6">
      <Button
        variant="outline"
        className="mr-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          variant={currentPage === number ? 'default' : 'outline'}
          className={`mx-1 ${currentPage === number ? 'bg-gray-300' : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Button>
      ))}
      <Button
        variant="outline"
        className="ml-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const productsPerPage = 6;

  const products:Product[] = [
    { title: 'Cryptocurrency Wallet', description: 'Secure hardware for storing your cryptocurrencies safely', price: 95000 },
    { title: 'Cryptocurrency Wallet', description: 'Secure hardware for storing your cryptocurrencies safely', price: 95000 },
    { title: 'Cryptocurrency Wallet', description: 'Secure hardware for storing your cryptocurrencies safely', price: 95000 },
    { title: 'Cryptocurrency Wallet', description: 'Secure hardware for storing your cryptocurrencies safely', price: 95000 },
    { title: 'Cryptocurrency Wallet', description: 'Secure hardware for storing your cryptocurrencies safely', price: 95000 },
    { title: 'Cryptocurrency Wallet', description: 'Secure hardware for storing your cryptocurrencies safely', price: 95000 },
    { title: 'Cryptocurrency Wallet', description: 'Secure hardware for storing your cryptocurrencies safely', price: 95000 },
    { title: 'Cryptocurrency Wallet', description: 'Secure hardware for storing your cryptocurrencies safely', price: 95000 },
  ];

  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  
  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product grid</h1>
        <Button className="bg-black text-white">Add Product +</Button>
      </div>

      <div className="flex items-center mb-6">
        <Input
          type="text"
          placeholder="Search"
          className="bg-[#E0E0E0] w-full max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {currentProducts.map((product: Product, index) => (
          <ProductCard key={index} title={String(product.title)} description={String(product.description)} price={Number(product.price)}/>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductsPage;
