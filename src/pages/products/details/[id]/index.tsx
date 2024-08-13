import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ProductDataType } from '@/types/productDataTypes';
import { MinusIcon, Pencil2Icon, PlusIcon, StarIcon } from '@radix-ui/react-icons';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { TabsContent } from '@radix-ui/react-tabs';
import Gallery from '@/components/ui/galery';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import Lottie from 'lottie-react';
import notfoundData from '../../../../../public/animations/notfound.json';
import { Textarea } from '@/components/ui/textarea';
import { PenBoxIcon, Trash2Icon } from 'lucide-react';
import { ItemDataType } from '@/types/itemsDataTypes';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
const ModalCheckout = dynamic(() => import('@/components/ui/modals/checkout'), { ssr: false })
const ModalAddReview = dynamic(() => import('@/components/ui/modals/addReview'), { ssr: false })

const Details = ({ items, setItems }: { items: ItemDataType[], setItems: Dispatch<SetStateAction<ItemDataType[]>> }) => {
  const { id } = useRouter().query
  const { data: status }: any = useSession()
  const [product, setProduct] = useState<ProductDataType>({
    code_product: '',
    name: '',
    price: 0,
    image: [],
    category: '',
    variants: [''],
    details: '',
    spec: '',
    information: '',
    sold: 0,
    rate: 0,
    reviews: [],
    discusses: [],
    stock: 0,
    minOrder: 0,
    desc: ''
  })
  const [variant, setVariant] = useState('')
  const [qty, setQty] = useState(1)
  const [isReply, setIsReply] = useState(false)
  const replyRefs = useRef<HTMLFormElement>(null)
  const [load, setLoad] = useState(false)
  const hasReviews = product?.reviews && product.reviews.length > 0
  const hasDiscuss = product?.discusses && product.discusses.length > 0
  const { push } = useRouter()
  const [notesView, setNotesView] = useState(false)
  const [notes, setNotes] = useState('')
  const [notesDone, setNotesDone] = useState(false)
  const notesRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()

  const handleQtyPlus = () => {
    setQty(qty + 1)
  }
  const handleQtyMinus = () => {
    setQty(qty - 1)
    if (qty <= 1) {
      setQty(1)
    }
  }

  const handleViewReply = () => {
    setIsReply(!isReply)
    setTimeout(() => {
      if (replyRefs.current) {
        replyRefs.current.scrollIntoView()
      }
    }, 10)
  }

  const handleViewNotes = () => {
    setNotesView(true)
  }
  const handleCloseNotes = () => {
    setNotesView(false)
  }
  const handleDoneNotes = () => {
    setNotesView(false)
    if (notesRef.current) {
      setNotes(notesRef.current.value)
      notesRef.current.value = notes
    }
  }

  useEffect(() => {
    if (notes === '') {
      setNotesDone(false)
    } else {
      setNotesDone(true)
    }
  }, [notes])

  const getData = async () => {
    setLoad(true)
    if (id) {
      try {
        const resp = await axios(`/api/product/get?code=${String(id)}`)
        setProduct(resp.data)
        setLoad(false)
      } catch (error) {
        setLoad(false)
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getData()
  }, [id])

  useEffect(() => {
    if (product.variants) {
      setVariant(product?.variants?.[0])
    }
  }, [product.variants])

  const calculateSubtotal = (price: number) => {
    return price * qty
  }

  const handlePushItems = () => {
    if (status === 'authenticated') {
      setItems((prevItems) => {
        const itemExists = prevItems.some(item => item.code_product === String(id));

        if (itemExists) {
          toast({
            title: 'Ouch!',
            description: 'You have added into cart 😒! If you wanna update quantity, please update it on cart icon in the top right😁',
            variant: 'destructive',
          })
          return prevItems
        } else {
          toast({
            title: 'Thank you 😁',
            description: 'The product has been added in your cart. Click "Cart icon" on top right to view your recent cart 😊',
            variant: 'default',
          })
          return [...prevItems, { code_product: String(id), qty, variant, notes }];
        }
      })
    } else {
      toast({
        className: cn(
          'flex fixed md:max-w-[420px] md:top-4 md:right-4 top-0 right-0'
        ),
        title: 'Uh Oh! 😒',
        variant: 'destructive',
        description: "You're not logged in 😑. Please login first to product into cart!"
      })
    }

    console.log(items)
  }


  return (
    <>
      <Head>
        <title>DBIX - Item Details</title>
      </Head>
      {product && <div className='flex w-full justify-between lg:flex-row flex-col gap-10'>
        <div className='lg:w-[70%] w-full'>
          <div className='flex flex-col gap-10 w-full'>
            <div className='w-full grid lg:grid-cols-2 grid-cols-1 gap-8'>
              <div className='w-full'>
                <div className='w-full sticky top-24'>
                  <Gallery image={product.image} />
                </div>
              </div>
              <div className='w-full flex flex-col gap-3'>
                {load ? (
                  <Skeleton className='w-1/2 h-3' />
                ) : <h1 className='text-2xl font-bold capitalize'>{product.name}</h1>}
                <div className='flex flex-col gap-2'>
                  {load ? (
                    <div className='flex flex-col gap-3 w-full'>
                      <Skeleton className='w-full h-2' />
                      <Skeleton className='w-full h-2' />
                      <Skeleton className='w-full h-2' />
                      <Skeleton className='w-full h-2' />
                    </div>
                  ) : (
                    <p className='text-sm text-gray-500 font-medium'>{product.desc}</p>
                  )}
                  <div className='flex justify-between flex-wrap w-fit gap-3 items-center'>
                    <div className='flex items-center gap-1'>
                      <p className='text-sm font-medium'>Sold {product.sold}</p>
                    </div>
                    <div className='w-1 h-1 bg-zinc-900 rounded-full'></div>
                    <div className='flex items-center gap-1'>
                      <StarIcon color='orange' />
                      <p className='text-sm font-medium'>{product.rate}</p>
                    </div>
                    <div className='w-1 h-1 bg-zinc-900 rounded-full'></div>
                    <div className='flex items-center gap-1'>
                      <p className='text-sm font-medium'>Discuss ({product.discusses?.length})</p>
                    </div>
                  </div>
                </div>
                {load ? (
                  <Skeleton className='w-3/4 h-5' />
                ) : <h1 className='text-3xl font-bold'>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(product.price))}</h1>}
                <hr />
                <div className='flex flex-col gap-3'>
                  <h1 className='font-semibold'>Choose Variants :</h1>
                  <div className='flex items-center gap-3'>
                    {load ? (
                      <Skeleton className='w-1/4 h-5' />
                    ) : (
                      product.variants?.map((item, index) => (
                        <Button key={index} onClick={() => setVariant(item)} size={'sm'} variant={variant === item ? 'default' : 'outline'} className='capitalize'>{item}</Button>
                      ))
                    )}

                  </div>
                  <div></div>
                </div>
                <hr />
                <Tabs defaultValue="details" className='w-full flex flex-col gap-5 items-start'>
                  <TabsList className="w-full h-fulll">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="specification">Specification</TabsTrigger>
                    <TabsTrigger value="information">Information</TabsTrigger>
                  </TabsList>
                  <TabsContent value='details' className='w-full'>
                    <div className='flex flex-col w-full gap-1'>
                      <p className='font-semibold text-gray-500 text-sm'>Min. Order: <span className='text-black'>{product.minOrder}</span></p>
                      <p className='font-semibold text-gray-500 text-sm'>Category: <span className='text-black capitalize'>{product.category}</span></p>
                      {load ? (
                        <div className='flex flex-col gap-2 mt-3'>
                          <Skeleton className='w-full h-2' />
                          <Skeleton className='w-full h-2' />
                          <Skeleton className='w-full h-2' />
                          <Skeleton className='w-full h-2' />
                          <Skeleton className='w-full h-2' />
                        </div>
                      ) : <div dangerouslySetInnerHTML={{ __html: String(product.details) }} className='text-sm text-gray-500 mt-3' />}
                    </div>
                  </TabsContent>
                  <TabsContent value='specification' className='w-full'>
                    {load ? (
                      <div className='flex flex-col gap-2 mt-3'>
                        <Skeleton className='w-full h-2' />
                        <Skeleton className='w-full h-2' />
                        <Skeleton className='w-full h-2' />
                        <Skeleton className='w-full h-2' />
                        <Skeleton className='w-full h-2' />
                      </div>
                    ) : <div dangerouslySetInnerHTML={{ __html: String(product.spec) }} className='text-sm text-gray-500' />}
                  </TabsContent>
                  <TabsContent value='information' className='w-full'>
                    {load ? (
                      <div className='flex flex-col gap-2 mt-3'>
                        <Skeleton className='w-full h-2' />
                        <Skeleton className='w-full h-2' />
                        <Skeleton className='w-full h-2' />
                        <Skeleton className='w-full h-2' />
                        <Skeleton className='w-full h-2' />
                      </div>
                    ) : <div dangerouslySetInnerHTML={{ __html: String(product.information) }} className='text-sm text-gray-500' />}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full">
              <h1 className='text-4xl font-semibold'>Reviews</h1>
              <hr />
              {load ? (
                <Card >
                  <CardHeader>
                    <div className='flex flex-col gap-1 w-full'>
                      <div className='items-center flex gap-2'>
                        <Skeleton className='w-5 h-5 rounded-full' />
                        <Skeleton className=' w-1/3 h-2' />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='flex flex-col gap-3'>
                    <Skeleton className=' w-full h-2' />
                    <Skeleton className=' w-full h-2' />
                    <Skeleton className=' w-full h-2' />
                    <Skeleton className=' w-full h-2' />
                    <Skeleton className=' w-full h-2' />
                    <Skeleton className=' w-full h-2' />
                    <Skeleton className=' w-full h-2' />
                  </CardContent>
                </Card>
              ) : (
                hasReviews && !load ? (
                  product.reviews?.map((item, index) => (
                    <Card key={index}>
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
                  ))
                ) : (
                  <div className='flex flex-col gap-0 w-full items-center'>
                    <div className='w-1/4'>
                      <Lottie animationData={notfoundData} />
                    </div>
                    <h1 className='text-gray-500 text-center'>Unfortunately, our product has no reviews. <br /> Click "Add review" button below to add review into our product 😊</h1>
                    <ModalAddReview />
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col gap-5 w-full">
              <h1 className='text-4xl font-semibold'>Discussion</h1>
              <hr />
              {load ? (
                <Card >
                  <CardHeader>
                    <div className='flex flex-col gap-1 w-full'>
                      <div className='items-center flex gap-2'>
                        <Skeleton className='w-5 h-5 rounded-full' />
                        <Skeleton className=' w-1/3 h-2' />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='flex flex-col gap-3'>
                    <Skeleton className=' w-full h-2' />
                    <Skeleton className=' w-full h-2' />
                    <Skeleton className=' w-full h-2' />
                    <Skeleton className=' w-full h-2' />
                    <Skeleton className=' w-full h-2' />
                    <Skeleton className=' w-full h-2' />
                    <Skeleton className=' w-full h-2' />
                  </CardContent>
                </Card>
              ) : (
                hasDiscuss && !load ? (
                  product.reviews?.map((item, index) => (
                    <Card key={index}>
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
                  ))
                ) : (
                  <div className='flex flex-col gap-0 w-full items-center'>
                    <div className='w-1/4'>
                      <Lottie animationData={notfoundData} />
                    </div>
                    <h1 className='text-gray-500 text-center'>Unfortunately, our product has no discussions. <br /> Click "Add discussion" button below to add discussion into our product 😊</h1>
                    <Button size={'sm'} className='mt-2'>Add discussion</Button>
                  </div>
                )
              )}
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
                  <p className='font-medium capitalize flex items-center gap-1 justify-center '>remaining stock : <span className={`${product.stock && product.stock >= 99 ? "underline" : ''}`}>{product.stock && product?.stock >= 99 ? 'Unlimited' : product.stock}</span> </p>
                </div>
                {notesView ? (
                  <div className='flex flex-col gap-3 w-full items-end mb-3'>
                    <Textarea className='h-20 text-sm' placeholder='Type a notes here...' ref={notesRef} onChange={(e) => setNotes(e.target.value)} value={notes} />
                    <div className='flex items-center gap-3'>
                      <Button onClick={handleCloseNotes} size={'sm'} variant={'destructive'}>Cancel</Button>
                      <Button size={'sm'} onClick={handleDoneNotes}>Done</Button>
                    </div>
                  </div>
                ) : (
                  notesDone && notes !== '' ? (
                    <div className='text-sm text-gray-500 p-2 border rounded-md w-full flex relative'>
                      <div className='flex flex-col gap-1 w-full'>
                        <p className='text-sm font-medium text-zinc-950'>Notes :</p>
                        <span className='text-wrap overflow-hidden'>{notes}</span>
                      </div>
                      <div className='flex items-center w-fit gap-2 right-2 justify-between absolute'>
                        <button onClick={() => {
                          setNotesDone(false)
                          setNotes('')
                        }} className='hover:opacity-100 opacity-50'><Trash2Icon color='#000000' size={16} /></button>
                        <button onClick={() => setNotesView(true)} className='hover:opacity-100 opacity-50'><PenBoxIcon size={16} color='#000000' /></button>
                      </div>

                    </div>
                  ) : (
                    <Button onClick={handleViewNotes} variant={'outline'} className='flex text-sm items-center justify-start gap-2'>
                      <Pencil2Icon />
                      Add Notes
                    </Button>
                  )
                )}
                <div className='flex justify-between'>
                  <h1 className='text-gray-500 font-medium'>Subtotal</h1>
                  <h1 className='font-medium'>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(calculateSubtotal(product.price)))}</h1>
                </div>
                <div className='mt-5 w-full flex flex-col gap-3'>
                  <Button disabled={items.some(item => item.code_product === String(id))} variant={'outline'} onClick={handlePushItems}>Add to cart</Button>
                  <ModalCheckout name={product.name} price={calculateSubtotal(product.price)} image={product.image} variants={[variant]} spec={''} information={''} sold={0} rate={0} reviews={[]} discusses={[]} stock={0} minOrder={0} desc={product.desc} category={''} />
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      </div>}

    </>
  );
};

export default Details;