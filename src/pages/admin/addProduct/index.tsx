import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import dynamic from 'next/dynamic';
import { ImagePlusIcon } from 'lucide-react';

const ReactEditor = dynamic(() => import('@/components/ui/reactEditor'), { ssr: false })

const AddProductPage = () => {
  const [productName, setProductName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [variation, setVariation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSave = () => {
    // Handle save product logic here
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <h1 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Add Product</h1>

      <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-6">
        {/* Product Information Form */}
        <Card className="w-full lg:w-2/3 shadow-lg">
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="productName">Product Name<span className="text-red-500">*</span></Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product name"
                required
              />
            </div>
            <div>
              <Label htmlFor="shortDescription">Product Short Description</Label>
              <Input
                id="shortDescription"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Enter product short description"
              />
            </div>
            <div>
              <Label htmlFor="description">Product Description</Label>
              <ReactEditor
                value={description}
                setValue={setDescription}
                placeholder="Type your text here ..."
              />
            </div>
            <div>
              <Label htmlFor="price">Price<span className="text-red-500">*</span></Label>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Base pricing"
                required
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
              />
            </div>
            <div>
              <Label htmlFor="variation">Variation<span className="text-red-500">*</span></Label>
              <Select
                onValueChange={setVariation}
                value={variation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a variation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Variation 1">Base</SelectItem>
                  <SelectItem value="Variation 2">Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Product Image Upload */}
        <Card className="w-full lg:w-1/3 shadow-lg">
          <CardHeader>
            <CardTitle>Product Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-48">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-full object-contain" />
              ) : (
                <ImagePlusIcon className="h-12 w-12" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImage(file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
                className="mt-4"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white">Cancel</Button>
            <Button onClick={handleSave} className="bg-black text-white">Save</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default AddProductPage;
