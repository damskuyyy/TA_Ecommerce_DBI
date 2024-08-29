import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type ProductDetails = {
  code_product: string;
  name: string;
  price: number;
  desc: string;
  image: string;
  sold: number;
  rate: number;
  review_count: number;
  variants: string[];
};

const ProductDetailsPage = () => {
  const { id } = useRouter().query;

  const isLoading = !id;

  return (
    <div className="w-full mx-auto p-4 space-y-6">
      <div className="space-y-2">
          <h1 className="text-4xl font-bold">Products</h1>
        <Breadcrumb>
          <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin">DBIX</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/products">
                    Products
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/admin/products/details/${id}`}>
                    Details
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold">
                    {id}
                  </BreadcrumbPage>
                </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-4">
        {/* Product Image and Details */}
        <Card className="w-full lg:w-2/3 shadow-lg">
          <CardContent className="flex">
            <div className="w-1/3">
              {isLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : (
                <Image
                  src="/admin/product/product.png"
                  alt="Product Image"
                  width={300}
                  height={200}
                  className="object-cover rounded"
                />
              )}
              <div className="flex space-x-2 mt-4">
                {[1, 2, 3, 4].map((i) =>
                  isLoading ? (
                    <Skeleton key={i} className="h-12 w-12" />
                  ) : (
                    <Image
                      key={i}
                      src={`/admin/product/product${i}.png`}
                      alt={`Thumbnail ${i}`}
                      width={50}
                      height={50}
                      className="object-cover rounded cursor-pointer"
                    />
                  )
                )}
              </div>
            </div>
          </div>
            <div className="w-2/3 pl-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-2/3 mt-2" />
                  <Skeleton className="h-6 w-1/3 mt-4" />
                  <Skeleton className="h-4 w-1/3 mt-4" />
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold">
                    Smart Contract Deployment Service
                  </h2>
                  <p className="text-gray-600">
                    Professional service for deploying smart contracts on
                    Ethereum and other blockchains.
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500 flex items-center">
                      <StarIcon className="w-4 h-4" /> 5.0 (1500+ ratings)
                    </span>
                    <span className="ml-4 text-gray-500">Sold 3k+</span>
                    <span className="ml-4 text-blue-500 cursor-pointer">
                      Discuss
                    </span>
                  </div>
                  <p className="text-xl font-bold mt-4">RP. 150.000,00</p>
                  <div className="mt-4">
                    <label className="block mb-2">Choose Variants:</label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a variant" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="base">Base</SelectItem>
                        <SelectItem value="pro">Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Details and Reviews */}
        <div className="w-full lg:w-1/3 space-y-4">
          {/* Item Detail */}
          <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Item Detail</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-2/3 mt-2" />
                </>
              ) : (
                <>
                  <p className="text-gray-600">Details:</p>

                  <ul className="list-disc list-inside mt-2 text-gray-700">
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li>
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </li>
                    <li>Information on usage and features.</li>
                  </ul>
                </>
              )}
            </CardContent>
          </Card>

          {/* Top Review */}
          <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Top Review</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <>
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                  <Skeleton className="h-4 w-1/3 mt-1" />
                  <Skeleton className="h-4 w-full mt-2" />
                </>
              ) : (
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold">Jess Santiago</h4>
                    <p className="text-gray-500 text-sm">
                      UI Designer | UX designer course
                    </p>
                    <p className="text-yellow-500 flex items-center mt-1">
                      <StarIcon className="w-4 h-4" /> 5.0
                    </p>
                    <p className="mt-2 text-gray-600">
                      Nullam donec dolor justo est pharetra accusam eget neque.
                      Et fusce maecenas sagittis enim.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Discussions */}
      <Card className="shadow-lg mt-6">
        <CardHeader>
            <CardTitle>Discussions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <>
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-1/3 mt-2" />
              <Skeleton className="h-4 w-full mt-2" />
            </>
          ) : (
            <>
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-semibold">Gika</p>
                  <p className="text-sm text-gray-500">40 menit lalu</p>
                  <p className="mt-2">Kak tular barang bos?</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-semibold">SHOP DESK - Samsung</p>
                  <p className="text-sm text-gray-500">40 menit lalu</p>
                  <p className="mt-2">Lorem ipsummmmm</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailsPage;
