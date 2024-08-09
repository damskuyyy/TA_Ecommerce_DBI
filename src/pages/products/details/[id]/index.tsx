import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ProductDataType } from '@/types/productDataTypes';
import { MinusIcon, Pencil2Icon, PlusIcon, StarIcon } from '@radix-ui/react-icons';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { TabsContent } from '@radix-ui/react-tabs';
import Gallery from '@/components/ui/galery';
import { Reply, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Head from 'next/head';
const ModalCheckout = dynamic(() => import('@/components/ui/modals/checkout'), { ssr: false })

const Details = () => {
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

  const [variant, setVariant] = useState('base')
  const { id } = useRouter().query
  const [qty, setQty] = useState(1)
  const [isReply, setIsReply] = useState(false)
  const replyRefs = useRef<HTMLFormElement>(null)

  const handleQtyPlus = () => {
    setQty(qty + 1)
  }
  const handleQtyMinus = () => {
    setQty(qty - 1)
    if (qty <= 1) {
      setQty(1)
    }
  }

  const [data, setData] = useState<ProductDataType>({
    title: '',
    category: '',
    desc: '',
    img: '',
    price: 0,
    priceType: ''
  })
  useEffect(() => {
    if (id) {
      const formattedId = String(id).replace(/-/g, ' ')
      const findedData = productsData.find(item => item.title.toLowerCase() === formattedId)
      if (findedData) {
        setData(findedData)
      } else {
        console.log('data not found')
      }
    }
  }, [id])

  const handleViewReply = () => {
    setIsReply(!isReply)
    setTimeout(() => {
      if (replyRefs.current) {
        replyRefs.current.scrollIntoView()
      }
    }, 10)
  }


  return (
    <>
      <Head>
        <title>DBIX - Item Details</title>
      </Head>

      <div className='flex w-full justify-between lg:flex-row flex-col gap-10'>
        <div className='lg:w-[70%] w-full'>
          <div className='flex flex-col gap-10 w-full'>
            <div className='w-full grid lg:grid-cols-2 grid-cols-1 gap-8'>
              <div className='w-full'>
                {/* <img src={data.img} alt="" className='w-full rounded-md h-56 object-cover' /> */}
                <div className='w-full sticky top-24'>
                  <Gallery />
                </div>
              </div>
              <div className='w-full flex flex-col gap-3'>
                <h1 className='text-2xl font-bold'>{data.title}</h1>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm text-gray-500 font-medium'>{data.desc}</p>
                  <div className='flex justify-between flex-wrap w-fit gap-3 items-center'>
                    <div className='flex items-center gap-1'>
                      <p className='text-sm font-medium'>Sold 3k+</p>
                    </div>
                    <div className='w-1 h-1 bg-zinc-900 rounded-full'></div>
                    <div className='flex items-center gap-1'>
                      <StarIcon color='orange' />
                      <p className='text-sm font-medium'>5 <span className='text-gray-500 font-medium'>( 1500+ rate )</span></p>
                    </div>
                    <div className='w-1 h-1 bg-zinc-900 rounded-full'></div>
                    <div className='flex items-center gap-1'>
                      <p className='text-sm font-medium'>Discuss (1)</p>
                    </div>
                  </div>
                </div>
                <h1 className='text-3xl font-bold'>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(data.price))}</h1>
                <hr />
                <div className='flex flex-col gap-3'>
                  <h1 className='font-semibold'>Choose Variants :</h1>
                  <div className='flex items-center gap-3'>
                    <Button onClick={() => setVariant('base')} size={'sm'} variant={variant === 'base' ? 'default' : 'outline'}>Base</Button>
                    <Button onClick={() => setVariant('pro')} size={'sm'} variant={variant === 'pro' ? 'default' : 'outline'}>Pro</Button>
                  </div>
                  <div></div>
                </div>
                <hr />
                <Tabs defaultValue="details" className='flex flex-col gap-3'>
                  <TabsList className="grid w-full lg:grid-cols-3 grid-cols-2 lg:gap-0 gap-1 h-full">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="specification">Specification</TabsTrigger>
                    <TabsTrigger value="information">Information</TabsTrigger>
                  </TabsList>
                  <TabsContent value='details'>
                    <div className='flex flex-col w-full gap-1'>
                      <p className='font-semibold text-gray-500 text-sm'>Condition: <span className='text-black'>New</span></p>
                      <p className='font-semibold text-gray-500 text-sm'>Min. Order: <span className='text-black'>1</span></p>
                      <p className='font-semibold text-gray-500 text-sm'>Category: <span className='text-black capitalize'>{data.category}</span></p>
                      <p className='text-gray-500 text-sm font-normal'>
                        Spesifikasi Handuk Mandi Hotel Premium Quality :
                        - Ukuran Asli :±65x140cm (toleransi selisih 1-3 cm) dan 50x100 cm
                        - Berat Kotor (blum termasuk packaging) : ±385 gram/pc (toleransi selisih 10-20 gram/pc) dan ±180 gram/pc (toleransi selisih 2-10 gram/pc)
                      </p>
                      <p className='flex items-center gap-2'></p>
                    </div>
                  </TabsContent>
                  <TabsContent value='specification'>
                    Spec
                  </TabsContent>
                  <TabsContent value='information'>
                    Info
                  </TabsContent>
                </Tabs>
                {/* <div className="h-screen"></div> */}
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full">
              <h1 className='text-4xl font-semibold'>Reviews</h1>
              <hr />
              <Card>
                <CardHeader>
                  <div className='flex items-center gap-2'>
                    <StarIcon color='orange' fill='#f59e0b' />
                    <StarIcon color='orange' fill='#f59e0b' />
                    <StarIcon color='orange' fill='#f59e0b' />
                    <StarIcon color='orange' fill='#f59e0b' />
                    <StarIcon color='orange' fill='#f59e0b' />
                  </div>
                  <div className='flex flex-col gap-1 w-full'>
                    <div className='items-center flex gap-2'>
                      <img src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj" alt="" className='w-8 h-8 object-cover rounded-full' />
                      <p className='font-semibold'>Sarah Vallent</p>
                    </div>
                    <p className='text-sm text-gray-500 font-medium'>Variant : Pro</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ex quisquam ratione, dolores dolorem repellat mollitia in iure, accusamus enim voluptatum porro iusto soluta beatae, cum maiores ut earum explicabo a illo facere molestiae tenetur? Eos, et omnis? At voluptatibus impedit in odio sint quia perferendis cupiditate praesentium harum quam. Excepturi ut magni, officia sit voluptas obcaecati provident dolorem vero. Ad molestiae accusantium distinctio modi natus dolores. Nihil perferendis excepturi non molestiae ipsa impedit et ab, quam voluptate iste placeat ratione expedita molestias hic nulla assumenda saepe inventore sequi soluta possimus! Voluptatum molestias doloribus, ut a soluta est illum nam! Optio molestiae inventore dolorem obcaecati accusantium? Reiciendis sequi numquam laborum eaque sint! Fugiat pariatur iure aut modi soluta, porro deserunt quis rem saepe. Culpa, voluptas? Qui quas libero soluta quis corporis doloremque necessitatibus eos culpa consequuntur ab voluptatibus voluptatem quisquam dolores dolorum unde et, praesentium quod commodi molestiae minima itaque.</p>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col gap-5 w-full">
              <h1 className='text-4xl font-semibold'>Discussion</h1>
              <hr />
              <Card>
                <div>
                  <CardHeader>
                    <div className='flex flex-col gap-1 w-full'>
                      <div className='items-center flex gap-2'>
                        <img src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj" alt="" className='w-8 h-8 object-cover rounded-full' />
                        <p className='font-semibold'>Sarah Vallent</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='flex flex-col gap-1'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quia.?</p>
                    <div className='w-full flex justify-end'>
                      <button onClick={handleViewReply} className='text-right text-sm hover:italic hover:opacity-80 cursor-pointer flex items-center gap-1 font-medium justify-end'>Reply <Reply size={14} /> </button>
                    </div>
                  </CardContent>
                </div>
                <hr />
                <div className='p-5 bg-secondary/50'>
                  <div>
                    <CardHeader>
                      <div className='flex flex-col gap-1 w-full'>
                        <div className='items-center flex gap-2'>
                          <img src="/logo.png" alt="" className='w-8 h-8 object-cover rounded-full' />
                          <p className='font-semibold'>DBIX</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quia.?</p>
                    </CardContent>
                  </div>
                  <div>
                    <CardHeader>
                      <div className='flex flex-col gap-1 w-full'>
                        <div className='items-center flex gap-2'>
                          <img src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj" alt="" className='w-8 h-8 object-cover rounded-full' />
                          <p className='font-semibold'>Sarah Vallent</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quia.?</p>
                    </CardContent>
                  </div>
                  {isReply && <form className='flex flex-col gap-2 w-full justify-end items-end lg:mt-5' id='reply-1' ref={replyRefs}>
                    <Textarea className='bg-transparent' placeholder='Type a reply here...' />
                    <div className='flex items-center gap-2'>
                      <Button type='button' variant={'destructive'} size={'sm'} className='flex items-center gap-1' onClick={() => setIsReply(false)}>Close</Button>
                      <Button type='submit' variant={'default'} size={'sm'} className='flex items-center gap-1'>Send <Send size={14} /> </Button>
                    </div>
                  </form>}
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className='lg:w-[30%] w-full sticky top-24 h-full'>
          <div className='w-full'>
            <Card className='flex flex-col'>
              <CardHeader className='font-bold text-lg'>Set Amount and Notes</CardHeader>
              <CardContent className='flex flex-col gap-3'>
                <p className='text-gray-500'>Variant: <span className='font-medium text-black capitalize'>{variant}</span></p>
                <hr />
                <div className='flex items-center gap-2'>
                  <div className='border rounded-md flex justify-between items-center gap-1'>
                    <Button onClick={handleQtyMinus} variant={'ghost'} size={'icon'}>
                      <MinusIcon />
                    </Button>
                    <p className='font-medium'>{qty}</p>
                    <Button onClick={handleQtyPlus} variant={'ghost'} size={'icon'}>
                      <PlusIcon />
                    </Button>
                  </div>
                  <p className='font-medium capitalize flex items-center gap-1 justify-center'>remaining stock : <span className='underline'>Unlimited</span> </p>
                </div>
                <Button variant={'outline'} className='flex text-sm items-center justify-start gap-2'>
                  <Pencil2Icon />
                  Add Notes
                </Button>
                <div className='flex justify-between'>
                  <h1 className='text-gray-500 font-medium'>Subtotal</h1>
                  <h1 className='font-medium'>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(data.price))}</h1>
                </div>
                <div className='mt-5 w-full flex flex-col gap-3'>
                  <Button variant={'outline'}>Add to cart</Button>
                  <ModalCheckout title={data.title} category={data.category} desc={data.desc} img={data.img} price={data.price} priceType={data.priceType} />
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      </div>

    </>
  );
};

export default Details;