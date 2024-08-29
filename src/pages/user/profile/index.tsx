import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { UserDataType } from "@/types/userDataTypes";
import { Badge } from "@/components/ui/badge";
import Head from "next/head";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { CheckCircleIcon, CircleUserRound, CogIcon, LoaderCircle, LockKeyholeIcon, MinusIcon, PenSquareIcon, PlusIcon, ShoppingBasketIcon, Trash2Icon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import noData from "../../../../public/animations/nodata.json";
import emailVerified from "../../../../public/animations/emailVerified.json";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { ProductDataType } from "@/types/productDataTypes";
import { ItemDataType } from "@/types/itemsDataTypes";
import { calculateApplicationFee, calculateSubtotal, calculateTax, calculateTotal, calculateTransactionFee } from "@/utils/calcutale";
import Alerts from "@/components/ui/alerts";
import formattedPrice from "@/utils/formattedPrice";


const ProfilePage = ({ items, setItems, products, setProducts }: { items: ItemDataType[], setItems: Dispatch<SetStateAction<ItemDataType[]>>, products: ProductDataType[], setProducts: Dispatch<SetStateAction<ProductDataType[]>> }) => {
  const { data: session, status }: any = useSession()
  const [load, setLoad] = useState(false)
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isEditing1, setIsEditing1] = useState(false)
  const [user, setUser] = useState<UserDataType>({
    id: "",
    name: "",
    email: "",
    image: "",
    emailVerified: false,
    items: [],
    type: "",
    orders: [],
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const inputRef1 = useRef<HTMLInputElement>(null)
  const [updated, setUpdated] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [nameLoad, setNameLoad] = useState(false)
  const [emailLoad, setEmailLoad] = useState(false)


  const getDataUser = async () => {
    setLoad(true)
    if (session?.user) {
      try {
        const resp = await axios(`/api/user/get/${session?.user.id}`)
        setUser(resp.data)
        setLoad(false)
      } catch (error) {
        setLoad(true)
        toast({
          title: "Uh Oh! 😒",
          description:
            "Failed to get user data. Please check your connection or contact the developer!",
          variant: "destructive",
        })
      }
    }
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }
  const handleEditClick1 = () => {
    setIsEditing1(true)
  }

  useEffect(() => {
    getDataUser()
  }, [session?.user.id, updated])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = String(user.name)
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  useEffect(() => {
    if (inputRef1.current) {
      inputRef1.current.value = String(user.email)
      inputRef1.current.focus()
      inputRef1.current.select()
    }
  }, [isEditing1])

  const handleSubmitName = async () => {
    if (session?.user) {
      setNameLoad(true)
      try {
        await axios.put(`/api/user/update/name/${String(session.user.id)}`, { name })
        toast({
          title: 'Success ✅',
          description: 'The name has been updated!'
        })
        setNameLoad(false)
        setUpdated(!updated)
        setIsEditing(false)
      } catch (error) {
        setNameLoad(false)
        console.log(error)
      }
    }
  }

  const incrementQty = (index: number) => {
    setProducts(prevProducts =>
      prevProducts.map((item, i) =>
        i === index ? { ...item, qty: (item.qty ?? 1) + 1 } : item
      )
    )
    setItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, qty: (item.qty ?? 1) + 1 } : item
      )
    )
  }

  const decrementQty = (index: number) => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts
        .map((item, i) => i === index ? { ...item, qty: (item.qty ?? 1) - 1 } : item)
        .filter(item => item.qty && item.qty > 0)

      if (updatedProducts.length === 0) {
        setProducts([])
        return []
      } else {
        return updatedProducts
      }
    })

    setItems(prevItems => {
      const updatedItems = prevItems
        .map((item, i) => i === index ? { ...item, qty: (item.qty ?? 1) - 1 } : item)
        .filter(item => item.qty && item.qty > 0)

      if (updatedItems.length === 0) {
        setItems([])
        return []
      } else {
        return updatedItems
      }
    })
  }

  const transactionValue = 0.05 // 5% transaction fee
  const applicationValue = 0.02 // 2% application fee
  const taxRate = 0.1 // 10% tax

  const subtotal = calculateSubtotal(products)
  const transactionFee = calculateTransactionFee(subtotal, transactionValue)
  const applicationFee = calculateApplicationFee(subtotal, applicationValue)
  const tax = calculateTax(subtotal, taxRate)
  const total = calculateTotal(products, transactionValue, applicationValue, taxRate)

  return (
    <>
      <Head>
        <title>DBIX | User - {String(user.name)}</title>
      </Head>
      <Tabs className="max-w-screen-lg mx-auto pb-8" defaultValue="myProfile">
        <ScrollArea className="w-full max-w-screen-xl lg:pb-0 pb-4 h-fit">
          <TabsList className="w-full">
            <TabsTrigger value="myProfile" className="flex items-center gap-2">
              <CircleUserRound size={20} />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <LockKeyholeIcon size={20} />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="recentOrder"
              className="flex items-center gap-2"
            >
              <ShoppingBasketIcon size={20} />
              Recent Order
            </TabsTrigger>
          </TabsList>
          <Scrollbar orientation="horizontal" />
        </ScrollArea>
        {load ? (
          <div className="w-full h-[50vh] opacity-50 flex justify-center items-center">
            <div className="flex items-center gap-3">
              <LoaderCircle size={28} className="animate-spin" />
              <h1 className="text-xl font-semibold">Loading user ...</h1>
            </div>
          </div>
        ) : (
          <>
            <TabsContent value="myProfile" className="lg:mt-8 md:mt-6 mt-5">
              <div className="flex flex-col w-full gap-5">
                <Card className="w-full">
                  <CardContent className="pt-3">
                    <div className="flex-grow bg-white w-full flex flex-col gap-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 group">
                          <div className="relative">
                            <img src={user.image} alt="userImage" className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-foreground" />
                            <button className="p-1 absolute"></button>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h2 className="text-xl font-semibold capitalize">
                                {user.name}
                              </h2>
                            </div>
                            <p className="text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-5">
                        Personal Information
                      </h3>
                    </div>
                    <Table className="w-fit">
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium text-gray-500">Name</TableCell>
                          <TableCell className="w-[0px] text-gray-500 font-medium">:</TableCell>
                          <TableCell className="font-medium text-gray-500 flex items-center justify-start gap-2">
                            {isEditing ? <Input className="capitalize" ref={inputRef} value={name} onChange={(e) => setName(e.target.value)} /> : user.name}
                            {isEditing ? (
                              <>
                                <Button size={"sm"} onClick={handleSubmitName} disabled={nameLoad}>{nameLoad ? (
                                  <LoaderCircle size={16} className="animate-spin" />
                                ) : "Save"}</Button>
                                <Button size={"sm"} variant={"destructive"} onClick={() => setIsEditing(false)}>Cancel</Button>
                              </>
                            ) : (
                              <button
                                onClick={handleEditClick}
                                className="hover:bg-secondary hover:opacity-80"
                              >
                                <PenSquareIcon size={16} />
                              </button>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium text-gray-500">Email</TableCell>
                          <TableCell className="w-[0px] text-gray-500 font-medium">:</TableCell>
                          <TableCell className="font-medium text-gray-500 flex items-center justify-start gap-2">
                            {isEditing1 ? (
                              <Input ref={inputRef1} />
                            ) : (
                              user.email
                            )}
                            {isEditing1 ? (
                              <>
                                <Button size={"sm"}>Save</Button>
                                <Button size={"sm"} variant={"destructive"} onClick={() => setIsEditing1(false)}>Cancel</Button>
                              </>
                            ) : (
                              <button
                                onClick={handleEditClick1}
                                className="hover:bg-secondary hover:opacity-80"
                              >
                                <PenSquareIcon size={16} />
                              </button>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium text-gray-500">Phone</TableCell>
                          <TableCell className="w-[0px] text-gray-500 font-medium">:</TableCell>
                          <TableCell className="font-medium text-gray-500 flex items-center justify-start gap-2">
                            {user.phone ? (
                              user.phone
                            ) : (
                              <Badge variant={"destructive"}>No data</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium text-gray-500">Email verified</TableCell>
                          <TableCell className="w-[0px] text-gray-500 font-medium">:</TableCell>
                          <TableCell className="font-medium text-gray-500 flex items-center justify-start gap-2">
                            {user.emailVerified ? (
                              <Badge className="flex items-center gap-1 w-fit">
                                Verified <CheckCircleIcon size={14} />{" "}
                              </Badge>
                            ) : (
                              <Badge variant={"destructive"}>
                                Not verified
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium text-gray-500">Type login</TableCell>
                          <TableCell className="w-[0px] text-gray-500 font-medium">:</TableCell>
                          <TableCell className="font-medium text-gray-500 flex items-center justify-start gap-2 capitalize">
                            {user.type}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <div className="" id="cart">
                  <h1 className="text-2xl font-semibold mb-3">Cart</h1>
                  <hr />
                </div>
                {items.length > 0 || products.length > 0 ? (
                  <div className="w-full flex lg:flex-row flex-col justify-between gap-2">
                    <div className="lg:w-[70%] w-full pe-2 border-r">
                      <div className="grid lg:grid-cols-2 w-full md:grid-cols-2 grid-cols-1 gap-5">
                        {products.map((item, index) => (
                          <Card key={index} className="pt-3 w-full flex justify-center items-center">
                            <CardContent className="flex items-start justify-between w-full">
                              <div className="flex items-start gap-2">
                                <img src={item.image[0]} alt={item.name} className={`w-20 ${item.notes ? 'h-20' : 'h-16'} rounded-md object-cover `} />
                                <div className="flex flex-col h-full items-start justify-between">
                                  <p className="font-bold first-letter:uppercase">{item.name}</p>
                                  <p className="font-medium text-sm">Variant : <span className="font-bold capitalize">{item.variant}</span></p>
                                  <p className="font-medium text-sm">{formattedPrice.toIDR(item.price)}</p>
                                  {item.notes && <p className="font-medium text-sm">Notes : <span className="capitalize font-normal text-gray-500 truncate overflow-hidden">{item.notes}</span></p>}
                                </div>
                              </div>
                              <div className={`border rounded-md flex-col flex items-center ${item.notes ? 'h-20' : 'h-16'} justify-between`}>
                                <button onClick={() => incrementQty(index)} className="p-1 px-2 rounded-md hover:bg-secondary">
                                  <PlusIcon size={14} />
                                </button>
                                <p className='font-medium text-xs cursor-default'>{item.qty}</p>
                                <button onClick={() => decrementQty(index)} className="p-1 px-2 rounded-md hover:bg-secondary">
                                  {item.qty && item.qty <= 1 ? (
                                    <Trash2Icon size={14} />
                                  ) : (
                                    <MinusIcon size={14} />
                                  )}
                                </button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    <div className="lg:w-[30%] w-full flex flex-col gap-2 px-1">
                      {items.length > 0 && products.length > 0 && (
                        <>
                          <div className="flex w-full justify-between">
                            <h1 className="font-semibold text-primary text-xs">Subtotal :</h1>
                            <p className="text-gray-500 text-xs">{formattedPrice.toIDR(subtotal)}</p>
                          </div>
                          <hr />
                          <div className="flex w-full justify-between">
                            <h1 className="font-semibold text-primary text-xs">TAX :</h1>
                            <p className="text-gray-500 text-xs text-right">({taxRate * 100}%) {formattedPrice.toIDR(tax)} </p>
                          </div>

                          <div className="flex w-full justify-between">
                            <h1 className="font-semibold text-primary text-xs">Transaction fee :</h1>
                            <p className="text-gray-500 text-xs text-right">({transactionValue * 100}%) {formattedPrice.toIDR(transactionFee)} </p>
                          </div>
                          <div className="flex w-full justify-between">
                            <h1 className="font-semibold text-primary text-xs">Application fee :</h1>
                            <p className="text-gray-500 text-xs text-right">({applicationValue * 100}%) {formattedPrice.toIDR(applicationFee)} </p>
                          </div>
                          <hr />
                          <div className="flex w-full justify-between">
                            <h1 className="font-semibold text-primary text-xs">TOTAL :</h1>
                            <p className="text-primary font-bold text-sm">{formattedPrice.toIDR(total)}</p>
                          </div>
                          <div className="w-full flex flex-col gap-2 mt-5">
                            <Button size={'sm'}>Confirm</Button>
                            <Alerts btn="Delete all" desc="As a result, the cart will be empty. and you must add your items again." ok={() => {
                              setProducts([])
                              setItems([])
                              location.reload()
                            }} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 border rounded-xl pb-4 shadow flex flex-col gap-3">
                    <div className="flex w-full flex-col gap-6 items-center">
                      <div className="flex flex-col gap-0 w-full items-center">
                        <Lottie animationData={noData} className="w-1/4" />
                        <h1 className="text-center text-gray-500">
                          Unfortunately you haven't added the product to your
                          cart. <br /> Click the add product button below to add
                          the product to your cart.
                        </h1>
                      </div>
                      <Link href={"/#products"}>
                        <Button size={"sm"} className="w-fit items-center">
                          Add product
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="security" className="lg:mt-8 md:mt-6 mt-5">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 place-items-start w-full">
                <div className="w-full space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-xl pb-3 border-b font-semibold w-full">
                      Password changes
                    </h1>
                    <div className="w-full">
                      <Card className="">
                        <CardContent className="pt-3">
                          <form className="w-full flex flex-col gap-3 items-start">
                            <Input placeholder="your new password here..." />
                            <Input placeholder="confirm your new password here..." />
                            <Button type="submit" size={"sm"}>
                              Confirm
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-xl pb-2 border-b font-semibold w-full">
                      Email verification
                    </h1>
                    <div className="w-full">
                      {user.emailVerified ? (
                        <Card className="bg-primary">
                          <CardContent className="flex flex-col gap-2 items-center pt-3">
                            <Lottie
                              animationData={emailVerified}
                              className="w-1/5"
                            />
                            <h1 className="font-semibold text-primary-foreground">
                              Your email has been verified!
                            </h1>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card className="">
                          <CardContent className="pt-3">
                            <form className="w-full flex flex-col gap-3 items-start">
                              <Input placeholder="Type your email here..." />
                              <Button type="submit" size={"sm"}>
                                Confirm
                              </Button>
                            </form>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full space-y-2">
                  <div className="w-full">
                    <h1 className="text-xl pb-3 border-b font-semibold w-full">
                      Phone verification
                    </h1>
                  </div>
                  <div className="w-full gap-10">
                    <div className="w-full">
                      <Card className="">
                        <CardContent className="pt-3">
                          <form className="w-full flex flex-col gap-3 items-start">
                            <Input placeholder="Type your phone here..." />
                            <Button type="submit" size={"sm"}>
                              Confirm
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="recentOrder"
              className="w-full lg:mt-8 md:mt-6 mt-5"
            >
              <Card className="w-full pt-3">
                <CardContent>orders</CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </>
  );
};

export default ProfilePage;
