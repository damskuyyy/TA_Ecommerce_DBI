import { FormEvent, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import dynamic from 'next/dynamic';
import { FolderPlusIcon, ImagePlusIcon, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ReactEditor = dynamic(() => import('@/components/ui/reactEditor'), { ssr: false })

const AddProductPage = () => {
  const [productName, setProductName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [variation, setVariation] = useState<string[]>([]);
  const [variationValue, setVariationValue] = useState('')
  const [image, setImage] = useState<string[]>([]);
  const [imageValue, setImageValue] = useState('')
  const [category, setCategory] = useState('website')
  const [variationInputView, setVariationInputView] = useState(false)
  const [imageInputView, setImageInputView] = useState(false)
  const variationInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const categoryView = [
    "Website",
    "Web 3",
    "Android Application",
    "IOS Application",
    "Blockchain Service",
    "Bussiness Platform",
    "Gaming Exchange Based Token",
    "Payment Gateway",
    "Decentralized Exchange",
    "IOT",
    "Create Robot Trading",
    "Exchanger Platform",
    "Android Exchange",
    "IOS Exchange",
    "NFT Platform",
    "(COIN) - Sha 256",
    "(TOKEN) - ERC 20, BSC 20, TRC 20",
  ]

  const handleAddVariation = (e: FormEvent) => {
    e.preventDefault()
    setVariation((prev) => [...prev, variationValue])
    setVariationValue('')
    if (variationInputRef.current) {
      variationInputRef.current.value = ''
      variationInputRef.current.focus()
    }
  }
  const handleAddImage = (e: FormEvent) => {
    e.preventDefault()
    setImage((prev) => [...prev, imageValue])
    setImageValue('')
    if (imageInputRef.current) {
      imageInputRef.current.value = ''
      imageInputRef.current.focus()
    }
  }

  const handleDeleteVariants = (index: number) => {
    const values = variation.filter((_, i) => i !== index)
    setVariation(values)
  }
  const handleDeleteImage = (index: number) => {
    const values = variation.filter((_, i) => i !== index)
    setImage(values)
  }

  const handleSave = () => {
    // Handle save product logic here
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Add Product</h1>

      <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-6">
        {/* Product Information Form */}
        <Card className="w-full lg:w-2/3 shadow-lg">
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div>
                <Label htmlFor="productName">Name<span className="text-red-500">*</span></Label>
                <Input
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Product name"
                  required
                  className='mt-2'
                />
              </div>
              <div>
                <Label htmlFor="productName">Category<span className="text-red-500">*</span></Label>
                <div className='w-full mt-2'>
                  <Select onValueChange={setCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorires</SelectLabel>
                        {categoryView.map((item, index) => (
                          <SelectItem value={item.toLocaleLowerCase()} key={index}>{item}</SelectItem>
                        ))}

                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <div className='w-full mt-2'>
                  <ReactEditor
                    value={description}
                    setValue={setDescription}
                    placeholder="Type your text here ..."
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="price">Price<span className="text-red-500">*</span></Label>
                <Input
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Base pricing"
                  required
                  className='mt-2'
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity<span className="text-red-500">*</span></Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  min={1}
                  step={1}
                  placeholder="Quantity"
                  required
                  className='mt-2'
                />
              </div>
              <div>
                <Label htmlFor="variation">Variants<span className="text-red-500">*</span></Label>
                {variationInputView ? (
                  <div className='flex flex-col gap-2 w-full mt-2 mb-4'>
                    <ul className='inline-flex flex-wrap gap-5'>
                      {variation.map((item, index) => (
                        <li key={index} className='relative cursor-default text-muted-foreground group text-sm'>
                          <Badge>{item}</Badge>
                          <button onClick={() => handleDeleteVariants(index)} className='p-0.5 absolute rounded-md -top-2 bg-destructive hidden group-hover:block -right-3'>
                            <span className='text-white'><X size={14} /></span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <form onSubmit={handleAddVariation} className='space-y-2'>
                      <Input required ref={variationInputRef} type='text' placeholder='Type a variation here...' onChange={(e) => setVariationValue(e.target.value)} />
                      <div className='flex items-center gap-2'>
                        <Button type='submit' size={'sm'} className='w-fit'>Add</Button>
                        <Button type='button' onClick={() => {
                          setVariationValue('')
                          setVariationInputView(false)
                        }} size={'sm'} className='w-fit' variant={'destructive'}>Cancel</Button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <button onClick={() => setVariationInputView(true)} className='border mt-2 hover:border-primary transition-colors border-dashed w-full rounded-md h-24 flex justify-center flex-col gap-2 items-center'>
                    <FolderPlusIcon />
                    <p className='text-muted-foreground text-sm'>Add Variation</p>
                  </button>
                )}
              </div>

              <Button className='w-full'>Save</Button>
            </div>
          </CardContent>
        </Card>

        {/* Product Image Upload */}
        <Card className="w-full lg:w-1/3 shadow-lg h-fit sticky top-20">
          <CardHeader>
            <CardTitle>Product Image</CardTitle>
          </CardHeader>
          <CardContent>
            {imageInputView ? (
              <div className='flex flex-col gap-2 w-full mt-2 mb-4'>
                <ul className='inline-flex flex-wrap gap-5'>
                  {image.map((item, index) => (
                    <li key={index} className='relative cursor-default text-muted-foreground group text-sm'>
                      <img src={item} alt={String(index)} className='w-16 h-16 object-cover' />
                      <button onClick={() => handleDeleteImage(index)} className='p-0.5 absolute rounded-md -top-2 bg-destructive hidden group-hover:block -right-3'>
                        <span className='text-white'><X size={14} /></span>
                      </button>
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleAddImage} className='space-y-2'>
                  <Input required ref={imageInputRef} type='text' placeholder='Input image link here...' onChange={(e) => setImageValue(e.target.value)} />
                  <div className='flex items-center gap-2'>
                    <Button type='submit' size={'sm'} className='w-fit'>Add</Button>
                    <Button type='button' onClick={() => {
                      setImageValue('')
                      setImageInputView(false)
                    }} size={'sm'} className='w-fit' variant={'destructive'}>Cancel</Button>
                  </div>
                </form>
              </div>
            ) : (
              <button onClick={() => setImageInputView(true)} className='border mt-2 hover:border-primary transition-colors border-dashed w-full rounded-md h-24 flex justify-center flex-col gap-2 items-center'>
                <ImagePlusIcon />
                <p className='text-muted-foreground text-sm'>Add Images</p>
              </button>
            )}
          </CardContent>
          {/* <CardFooter className="flex justify-between">
            <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white">Cancel</Button>
            <Button onClick={handleSave} className="bg-black text-white">Save</Button>
          </CardFooter> */}
        </Card>
      </div>
    </div>
  );
}

export default AddProductPage;
