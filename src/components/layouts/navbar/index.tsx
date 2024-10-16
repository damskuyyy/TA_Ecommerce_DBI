import { Button } from "@/components/ui/button";
import { ChevronDownIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ButtoNavIcon from "@/components/ui/icons/buttonnav";
import { AccordionContent, AccordionItem, AccordionTrigger, Accordion } from "@/components/ui/accordion";
import { signOut, useSession } from "next-auth/react";
import { UserDataType } from "@/types/userDataTypes";
import { LoaderCircleIcon, MinusIcon, MoonIcon, PlusIcon, ShoppingCart, Sun, Trash2Icon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import Alerts from "@/components/ui/alerts";
import { useRouter } from "next/router";
import { ItemDataType } from "@/types/itemsDataTypes";
import noData from '../../../../public/animations/nodata.json'
import Lottie from "lottie-react";
import { ProductDataType } from "@/types/productDataTypes";
import { Badge } from "@/components/ui/badge";
import { calculateSubtotal, calculateTransactionFee, calculateApplicationFee, calculateTax, calculateTotal } from "@/utils/calcutale";
import formattedPrice from "@/utils/formattedPrice";
import { useTheme } from "next-themes";

const Navbar = ({ items, setItems, products, setProducts }: { items: ItemDataType[], setItems: Dispatch<SetStateAction<ItemDataType[]>>, products: ProductDataType[], setProducts: Dispatch<SetStateAction<ProductDataType[]>> }) => {
  const [view, setView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { data: session, status }: any = useSession()
  const [load, setLoad] = useState(false)
  const { push } = useRouter()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [userData, setUserdata] = useState<UserDataType>({
    id: "",
    name: "",
    email: "",
    emailVerified: false,
    image: "",
    items: [],
    type: "",
  })
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownOpen2, setDropdownOpen2] = useState(false)
  const { setTheme } = useTheme();

  useEffect(() => {
    if (view) {
      ref.current?.classList.remove("hidden")
    } else {
      setTimeout(() => {
        ref.current?.classList.add("hidden")
      }, 300)
    }
  }, [view])

  const getUserData = async () => {
    setLoad(true)
    try {
      if (session?.user.role === 'user') {
        const resp = await axios(`/api/user/get/${session?.user.id}`)
        setUserdata(resp.data)
        setItems(resp.data.items)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoad(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      getUserData()
    }
  }, [status, session?.user?.id])





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

  const transactionValue = 0.05; // 5% transaction fee
  const applicationValue = 0.02; // 2% application fee
  const taxRate = 0.1; // 10% tax

  const subtotal = calculateSubtotal(products)
  const transactionFee = calculateTransactionFee(subtotal, transactionValue)
  const applicationFee = calculateApplicationFee(subtotal, applicationValue)
  const tax = calculateTax(subtotal, taxRate)
  const total = calculateTotal(products, transactionValue, applicationValue, taxRate)

  const updateUserItems = async () => {
    const body = { items }
    if (status === 'authenticated') {
      try {
        await axios.put(`/api/user/update/items/${session.user.id}`, body)
      } catch (error) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    updateUserItems()
  }, [session && session?.user.role === 'user' && items.length])


  return (
    <div className="w-full flex py-5 relative lg:px-0  px-6 justify-between">
      <div className="font-bold text-lg flex items-center gap-5">
        <div className="flex gap-4 lg:hidden">
          <button name="buttonnav" onClick={() => setView(!view)} className="lg:hidden block">
            {view ? <CrossCircledIcon width={20} height={20} /> : <ButtoNavIcon />}
          </button>
        </div>
        <Link href={"/"}>E-Shop DBIX</Link>
      </div>

      <div className="flex justify-center lg:w-fit">
        <div
          className={`lg:hidden flex lg:flex-row flex-col lg:items-center px-6 gap-5 absolute lg:static left-0 top-16 lg:h-full ${view ? "h-screen opacity-100" : "h-0 opacity-0"
            } transition-all duration-300 bg-white lg:w-fit w-full pt-3`}
          ref={ref}
        >
          <Link href={"/"} className="font-medium hover:opacity-80" onClick={() => setView(false)}>
            Home
          </Link>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="m-0">
              <AccordionTrigger className="font-semibold py-0 justify-start gap-3 m-0 h-full">
                Company
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3 mt-3 w-full">
                <Link href={"/aboutus"} className="hover:opacity-80 w-full" onClick={() => setView(false)}>About Us</Link>
                <Link href={"/team"} className="hover:opacity-80 w-full" onClick={() => setView(false)}>Our Team</Link>
                <Link href={"/#faqs"} className="hover:opacity-80 w-full" onClick={() => setView(false)}>Faq's</Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link href={"/#services"} className="font-medium hover:opacity-80" onClick={() => setView(false)}>
            Services
          </Link>
          <Link href={"/contact"} className="font-medium hover:opacity-80" onClick={() => setView(false)}>
            Contact
          </Link>
        </div>
        <div className="lg:flex hidden lg:flex-row items-center lg:justify-between gap-10">
          <Link href={"/"} className="hover:opacity-80 font-semibold">
            Home
          </Link>
          <DropdownMenu open={dropdownOpen2} onOpenChange={setDropdownOpen2}>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2 font-semibold">
                Company
                <ChevronDownIcon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="font-semibold w-full">
                <Link onClick={() => setDropdownOpen2(false)} className="w-full" href={"/aboutus"}>About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-semibold w-full">
                <Link onClick={() => setDropdownOpen2(false)} className="w-full" href={"/team"}>Our Team</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-semibold w-full">
                <Link onClick={() => setDropdownOpen2(false)} className="w-full" href={"/#faqs"}>Faq's</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={"/#services"} className="font-semibold hover:opacity-80">
            Services
          </Link>
          <Link href={"/contact"} className="font-semibold hover:opacity-80">
            Contact
          </Link>
        </div>
      </div>
      <div className="items-center gap-3 flex">
        {status === 'unauthenticated' && <div className="flex items-center gap-3 lg:hidden">
          <Link href={"/user/login"}>
            <Button size={"sm"} variant={"default"}>
              Login or Signup
            </Button>
          </Link>
        </div>}

        {load ? (
          <div className="flex items-center gap-3 opacity-80">
            <LoaderCircleIcon size={20} className="animate-spin" />
            <p className="text-sm font-medium">Loading user...</p>
          </div>
        ) : (
          status === 'authenticated' && session.user.role === 'user' ? (
            <div className="flex items-center gap-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger className="relative" name="shoppingcartbutton">
                  {products.length > 0 && <Badge className="absolute -top-3 -right-3 p-1 py-0.5 bg-transparent font-bold text-zinc-950 dark:text-zinc-50">{products.length}</Badge>}
                  <ShoppingCart className="dark:white" />
                </SheetTrigger>
                <SheetContent className={`flex flex-col gap-5 w-full items-start justify-between`}>
                  <div className="flex flex-col gap-5 w-full">
                    <SheetTitle>DBIX items overview</SheetTitle>
                    <hr />
                    <SheetDescription className="max-h-[65vh] overflow-y-auto w-full">
                      {items.length > 0 ? (
                        <div className="w-full flex flex-col gap-3">
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
                      ) : (
                        <div className="flex w-full flex-col gap-6 items-center">
                          <div className="flex flex-col gap-0 w-full items-center">
                            <Lottie animationData={noData} />
                            <h1 className="text-center">Unfortunately you haven't added the product to your cart. Click the add product button below to add the product to your cart.</h1>
                          </div>
                          <Link href={'/#products'} onClick={() => setSheetOpen(false)}>
                            <Button size={'sm'} className="w-fit items-center">Add product</Button>
                          </Link>
                        </div>
                      )}
                    </SheetDescription>
                  </div>

                  {items.length > 0 && (
                    <SheetDescription className="w-full flex flex-col gap-2 text-lg p-0">
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
                        <Link className="w-full" href={`/user/profile/checkout/${userData.name?.replace(' ', '-').toLowerCase()}`} onClick={() => setSheetOpen(false)}><Button size={'sm'} className="w-full">Confirm</Button></Link>
                        <Alerts btn="Delete all" desc="As a result, the cart will be empty. and you must add your items again." ok={() => {
                          setProducts([])
                          setItems([])
                          location.reload()
                        }} />
                      </div>
                    </SheetDescription>
                  )}
                </SheetContent>
              </Sheet>
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <div className="w-fit hover:opacity-70 transition-opacity">
                  <DropdownMenuTrigger className="flex items-center gap-2">
                    <img
                      src={userData.image}
                      alt={userData.name}
                      className="w-7 h-7 object-cover rounded-full border-2"
                    />
                    <p className="text-sm font-medium capitalize">{userData.name}</p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <p className="p-2 py-1 text-sm font-bold">{userData.email}</p>
                    <hr className="mb-2" />
                    <DropdownMenuItem>
                      <Link onClick={() => setDropdownOpen(false)} className="font-medium hover:opacity-80 w-full" href={'/user/profile'}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link onClick={() => setDropdownOpen(false)} className="font-medium hover:opacity-80 w-full" href={'/user/profile#cart'}>Cart</Link>
                    </DropdownMenuItem>
                    <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

                    <div className="flex justify-center items-center p-2 py-1 w-full">
                      <Alerts ok={async () => {
                        await signOut({ redirect: false })
                        setUserdata({
                          id: "",
                          email: "",
                          emailVerified: false,
                          image: "",
                          items: [],
                          name: "",
                          type: "",
                        })
                        setItems([])
                        setProducts([])
                        setTimeout(() => {
                          push('/user/login')
                        }, 500);
                      }} desc="As a result, you will be logged out from your account and your session will end." btn="Signout" />
                    </div>
                  </DropdownMenuContent>
                </div>
              </DropdownMenu>
            </div>
          ) : (
            <div className="lg:flex items-center gap-3 hidden">
              <Link href={"/user/login"}>
                <Button size={"sm"} variant={"secondary"}>
                  Login
                </Button>
              </Link>
              <Link href={"/user/signup"}>
                <Button size={"sm"}>Signup</Button>
              </Link>
            </div>
          )
        )}

      </div>
    </div>
  );
};

export default Navbar;
