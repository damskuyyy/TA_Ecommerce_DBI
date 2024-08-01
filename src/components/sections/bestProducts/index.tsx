
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import CardProduct from '@/components/ui/cardProducts';
import PaginationComponent from '@/components/ui/paginations';

const BestProducts = () => {
  const productsData = [
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain Development Kit',
      desc: 'Complete toolkit for blockchain development including tutorials, software, and support.',
      price: 100000,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Smart Contract Deployment Service',
      desc: 'Professional service for deploying smart contracts on Ethereum and other blockchains.',
      price: 150000,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Cryptocurrency Wallet',
      desc: 'Secure hardware wallet for storing your cryptocurrencies safely.',
      price: 95000,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain Consultation',
      desc: 'Expert consultation service for blockchain integration and development.',
      price: 150000,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain Certification Course',
      desc: 'Comprehensive online course for getting certified in blockchain technology.',
      price: 65000,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Decentralized Finance App',
      desc: 'App to manage your decentralized finance activities with ease.',
      price: 160500,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Crypto Mining Rig',
      desc: 'High-performance mining rig for cryptocurrency mining.',
      price: 1500000,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain Data Analytics Tool',
      desc: 'Advanced tool for analyzing blockchain data.',
      price: 500000,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Crypto Payment Gateway',
      desc: 'Secure gateway for accepting cryptocurrency payments.',
      price: 249.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain Security Audit',
      desc: 'Comprehensive security audit for blockchain applications.',
      price: 999.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'NFT Marketplace',
      desc: 'Platform for buying and selling NFTs.',
      price: 399.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Crypto Tax Software',
      desc: 'Software to help you manage and file your cryptocurrency taxes.',
      price: 59.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain Research Report',
      desc: 'In-depth research report on the latest blockchain trends and technologies.',
      price: 149.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Crypto Investment Fund',
      desc: 'Managed fund for investing in a diversified portfolio of cryptocurrencies.',
      price: 9999.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain Education Platform',
      desc: 'Online platform offering various courses on blockchain technology.',
      price: 199.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Decentralized Application (DApp) Development Service',
      desc: 'Service for developing decentralized applications on Ethereum and other platforms.',
      price: 799.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain-Based Identity Verification',
      desc: 'Secure identity verification service using blockchain technology.',
      price: 129.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Crypto Portfolio Tracker',
      desc: 'App to track and manage your cryptocurrency portfolio.',
      price: 19.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain-Based Voting System',
      desc: 'Secure and transparent voting system using blockchain technology.',
      price: 499.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain Supply Chain Solution',
      desc: 'Solution for managing supply chains using blockchain technology.',
      price: 699.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain Certification Exam',
      desc: 'Certification exam to validate your blockchain skills and knowledge.',
      price: 99.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Crypto Exchange Platform',
      desc: 'Platform for trading various cryptocurrencies.',
      price: 2499.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain Game Development',
      desc: 'Service for developing games based on blockchain technology.',
      price: 1499.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain-Based Healthcare Solutions',
      desc: 'Solutions for healthcare industry using blockchain technology.',
      price: 999.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain-Based Real Estate Platform',
      desc: 'Platform for real estate transactions using blockchain technology.',
      price: 1999.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Crypto Lending Platform',
      desc: 'Platform for lending and borrowing cryptocurrencies.',
      price: 299.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain for IoT Solutions',
      desc: 'Integrating blockchain with Internet of Things (IoT) for enhanced security and transparency.',
      price: 499.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain-Powered Voting Machine',
      desc: 'Secure and transparent voting machine powered by blockchain.',
      price: 999.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain for Supply Chain Traceability',
      desc: 'Solution for enhancing traceability in supply chains using blockchain.',
      price: 599.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Crypto Payment Processing Service',
      desc: 'Service for processing cryptocurrency payments securely.',
      price: 149.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain for Digital Advertising',
      desc: 'Platform for transparent and secure digital advertising using blockchain.',
      price: 199.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Crypto Asset Management',
      desc: 'Service for managing and growing your cryptocurrency assets.',
      price: 499.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain for Media and Entertainment',
      desc: 'Solutions for the media and entertainment industry using blockchain technology.',
      price: 799.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Crypto Savings Account',
      desc: 'High-interest savings account for your cryptocurrency holdings.',
      price: 0.00,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain for Voting and Elections',
      desc: 'Secure and transparent solutions for voting and elections using blockchain technology.',
      price: 1299.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Crypto Custody Service',
      desc: 'Secure custody service for storing large amounts of cryptocurrencies.',
      price: 999.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain-Based Loyalty Program',
      desc: 'Loyalty program for businesses using blockchain technology.',
      price: 249.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain-Powered Supply Chain Financing',
      desc: 'Solution for supply chain financing using blockchain.',
      price: 799.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Crypto ATM',
      desc: 'ATM machine for buying and selling cryptocurrencies.',
      price: 4999.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain-Based Insurance Solutions',
      desc: 'Insurance solutions using blockchain technology.',
      price: 599.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Crypto Payment Card',
      desc: 'Payment card for spending your cryptocurrencies anywhere.',
      price: 19.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain for Energy Trading',
      desc: 'Platform for trading energy using blockchain technology.',
      price: 999.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain for Intellectual Property Management',
      desc: 'Solution for managing intellectual property rights using blockchain.',
      price: 699.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Crypto Derivatives Trading Platform',
      desc: 'Platform for trading cryptocurrency derivatives.',
      price: 999.99,
      priceType: 'IDR',
      category: 'blockchain'
    },
    {
      img: 'https://imilkom.usu.ac.id/wp-content/uploads/2019/03/blockchain.png',
      title: 'Blockchain for Government Services',
      desc: 'Solutions for enhancing government services using blockchain technology.',
      price: 1499.99,
      priceType: 'IDR',
      category: 'blockchain'
    }
  ]

  return (
    <div className='w-full flex flex-col gap-16 lg:mt-16'>
      <div className='flex flex-col gap-3 items-start'>
        <h1 className='text-5xl capitalize text-center font-semibold'>Best Products</h1>
        <p className='text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque rem corrupti deleniti quod fugiat repellendus! <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, nulla?</p>
      </div>
      <div className='w-full'>
        <Tabs defaultValue="blockchain" className="w-full flex flex-col gap-5">
          <TabsList className="grid w-full lg:grid-cols-6 grid-cols-2 lg:gap-0 gap-1 h-full">
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="android">Android App</TabsTrigger>
            <TabsTrigger value=""></TabsTrigger>
          </TabsList>

          <TabsContent value="blockchain" className='flex flex-col gap-5'>
            <div className='w-full grid lg:grid-cols-5 grid-cols-1 gap-5'>
              {productsData.slice(0, 10).map((item, index) => (
                <CardProduct img={item.img} title={item.title} desc={item.desc} priceType={item.priceType} price={item.price} category={item.category} key={index}/>
              ))}
            </div>
            <PaginationComponent />
          </TabsContent>
          {/* <TabsContent value="website">
            <CardProduct />
          </TabsContent>
          <TabsContent value="android">
            <CardProduct />
          </TabsContent> */}


        </Tabs>
      </div>
    </div>
  );
};

export default BestProducts;