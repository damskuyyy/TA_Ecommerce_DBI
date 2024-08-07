import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card';
import { ProductDataType } from '@/types/productDataTypes';
import Link from 'next/link';
import { Button } from '../button';



const CardProduct = ({ img, title, desc, price, priceType, category }: ProductDataType) => {

  return (
    <Card className='flex flex-col justify-between'>
      <div>
        <CardHeader>
          <img src={img} alt={title} className='w-full h-36 object-cover rounded-md' />
        </CardHeader>
        <CardContent className="space-y-2">
          <CardTitle className='leading-snug'>{title}</CardTitle>
          <CardDescription className='text-xs'>
            {desc}
          </CardDescription>
        </CardContent>
      </div>
      <CardFooter className='flex items-center justify-between'>
        <p className='font-medium text-xs'>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(price))}</p>
        {/* <ModalCheckout category={category} desc={desc} img={img} price={price} priceType={priceType} title={title} /> */}
        <Link href={`/products/details/${title && title.replace(/ /g, '-').toLowerCase()}`}><Button size={'sm'} className='font-medium'>Buy now!</Button></Link>
      </CardFooter>
    </Card>
  );
};

export default CardProduct;