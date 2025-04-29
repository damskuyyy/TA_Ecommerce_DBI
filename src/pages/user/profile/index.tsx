import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { UserDataType } from "@/types/userDataTypes";
import { Badge } from "@/components/ui/badge";
import Head from "next/head";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import {
  CheckCircleIcon,
  CircleUserRound,
  CogIcon,
  LoaderCircle,
  LockKeyholeIcon,
  MinusIcon,
  PenSquareIcon,
  PlusIcon,
  ShoppingBasketIcon,
  Trash2Icon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import noData from "../../../../public/animations/nodata.json";
import emailVerified from "../../../../public/animations/emailVerified.json";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductDataType } from "@/types/productDataTypes";
import { ItemDataType } from "@/types/itemsDataTypes";
import {
  calculateApplicationFee,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  calculateTransactionFee,
} from "@/utils/calcutale";
import Alerts from "@/components/ui/alerts";
import formattedPrice from "@/utils/formattedPrice";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import SignaturePad from "@/components/ui/signature-pad";

const ProfilePage = ({
  items,
  setItems,
  products,
  setProducts,
}: {
  items: ItemDataType[];
  setItems: Dispatch<SetStateAction<ItemDataType[]>>;
  products: ProductDataType[];
  setProducts: Dispatch<SetStateAction<ProductDataType[]>>;
}) => {
  const { data: session, status }: any = useSession();
  const [load, setLoad] = useState(false);
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditing1, setIsEditing1] = useState(false);
  const [user, setUser] = useState<UserDataType>({
    id: "",
    name: "",
    email: "",
    image: "",
    emailVerified: false,
    items: [],
    type: "",
    orders: [],
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const [updated, setUpdated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameLoad, setNameLoad] = useState(false);
  const [emailLoad, setEmailLoad] = useState(false);

  const [contractData, setContractData] = useState([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isSignature, setIsSignature] = useState<boolean>(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [selectedContract, setSelectedContract] = useState({});

  const getDataUser = async () => {
    setLoad(true);
    if (session?.user) {
      try {
        const resp = await axios(`/api/user/get/${session?.user.id}`);
        setUser(resp.data);
        setLoad(false);
      } catch (error) {
        setLoad(true);
        toast({
          title: "Uh Oh! 😒",
          description:
            "Failed to get user data. Please check your connection or contact the developer!",
          variant: "destructive",
        });
      }
    }
  };

  const getContractData = async () => {
    try {
      const resp = await axios(`/api/contract/get?userId=${user.id}`);
      setContractData(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContractData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleEditClick1 = () => {
    setIsEditing1(true);
  };

  useEffect(() => {
    getDataUser();
  }, [session?.user.id, updated]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = String(user.name);
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    if (inputRef1.current) {
      inputRef1.current.value = String(user.email);
      inputRef1.current.focus();
      inputRef1.current.select();
    }
  }, [isEditing1]);

  const handleSubmitName = async () => {
    if (session?.user) {
      setNameLoad(true);
      try {
        await axios.put(`/api/user/update/name/${String(session.user.id)}`, {
          name,
        });
        toast({
          title: "Success ✅",
          description: "The name has been updated!",
        });
        setNameLoad(false);
        setUpdated(!updated);
        setIsEditing(false);
      } catch (error) {
        setNameLoad(false);
        console.log(error);
      }
    }
  };

  const incrementQty = (index: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((item, i) =>
        i === index ? { ...item, quantity: (item.quantity ?? 1) + 1 } : item
      )
    );
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, qty: (item.qty ?? 1) + 1 } : item
      )
    );
  };

  const decrementQty = (index: number) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts
        .map((item, i) =>
          i === index ? { ...item, quantity: (item.quantity ?? 1) - 1 } : item
        )
        .filter((item) => item.quantity && item.quantity > 0);

      if (updatedProducts.length === 0) {
        setProducts([]);
        return [];
      } else {
        return updatedProducts;
      }
    });

    setItems((prevItems) => {
      const updatedItems = prevItems
        .map((item, i) =>
          i === index ? { ...item, qty: (item.qty ?? 1) - 1 } : item
        )
        .filter((item) => item.qty && item.qty > 0);

      if (updatedItems.length === 0) {
        setItems([]);
        return [];
      } else {
        return updatedItems;
      }
    });
  };

  // Handle preview PDF
  const handlePreview = (filename: string) => {
    if (!filename) return;
    const fileUrl = `http://localhost:3000/api/contract/pdf/get?filename=${filename}`;
    setPdfUrl(fileUrl);
  };

  // Handle Sign
  const handleSign = async () => {
    try {
      // Update kontrak dengan PUT request
      const response = await axios.put("/api/contract/put", {
        ...selectedContract, // Kirim data yang diperbarui
        contractId: selectedContract.id,
        status: "AWAITING_PAYMENT",
      });

      // Cek apakah response.data berisi data kontrak yang benar
      if (!response.data || !response.data.contract) {
        throw new Error("Data kontrak tidak tersedia dalam response.");
      }

      const updatedContract = response.data.contract;

      // Kirim data ke API untuk pembuatan PDF
      const pdfResponse = await axios.post(
        "/api/contract/pdf/post",
        {
          fullName: updatedContract.fullName,
          address: updatedContract.address,
          contractName: updatedContract.contractName,
          cost: updatedContract.cost,
          startDate: updatedContract.startDate,
          endDate: updatedContract.endDate,
          descriptionContract: updatedContract.descriptionContract,
          features: updatedContract.features,
          scopeOfWork: updatedContract.scopeOfWork,
          signature: updatedContract.signature,
          userSignature: signature,
        },
        {
          responseType: "arraybuffer",
        }
      );

      if (pdfResponse.status === 200) {
        // Logika setelah PDF berhasil dibuat
        const pdfBlob = new Blob([pdfResponse.data], {
          type: "application/pdf",
        });

        const formData = new FormData();
        formData.append("contractId", updatedContract.id);
        formData.append("userId", updatedContract.userID);
        formData.append(
          "pdfFile",
          new File([pdfBlob], "contract.pdf", { type: "application/pdf" })
        );

        // Upload PDF ke server
        await axios.put("/api/contract/pdf/put", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Kontrak berhasil diperbarui dan PDF telah dibuat!");
        setIsSignature(false);
        getContractData();
      } else {
        throw new Error("Gagal membuat PDF");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Terjadi kesalahan saat memperbarui kontrak atau membuat PDF.");
    }
  };

  const transactionValue = 0.05; // 5% transaction fee
  const applicationValue = 0.02; // 2% application fee
  const taxRate = 0.1; // 10% tax

  const subtotal = calculateSubtotal(products);
  const transactionFee = calculateTransactionFee(subtotal, transactionValue);
  const applicationFee = calculateApplicationFee(subtotal, applicationValue);
  const tax = calculateTax(subtotal, taxRate);
  const total = calculateTotal(
    products,
    transactionValue,
    applicationValue,
    taxRate
  );

  return (
    <>
      <Head>
        <title>DBI | User - {String(user.name)}</title>
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
            <TabsTrigger value="contract" className="flex items-center gap-2">
              <ShoppingBasketIcon size={20} />
              Contract
            </TabsTrigger>
            <TabsTrigger
              value="monitoringProgress"
              className="flex items-center gap-2"
            >
              <ShoppingBasketIcon size={20} />
              Monitoring Progress
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 group">
                        <div className="relative">
                          <img
                            src={user.image}
                            alt="userImage"
                            className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-foreground"
                          />
                          <button className="p-1 absolute"></button>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold capitalize dark:text-white">
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
                    <Table className="w-fit">
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium text-gray-500">
                            Name
                          </TableCell>
                          <TableCell className="w-[0px] text-gray-500 font-medium">
                            :
                          </TableCell>
                          <TableCell className="font-medium text-gray-500 flex items-center justify-start gap-2">
                            {isEditing ? (
                              <Input
                                className="capitalize"
                                ref={inputRef}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            ) : (
                              user.name
                            )}
                            {isEditing ? (
                              <>
                                <Button
                                  size={"sm"}
                                  onClick={handleSubmitName}
                                  disabled={nameLoad}
                                >
                                  {nameLoad ? (
                                    <LoaderCircle
                                      size={16}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    "Save"
                                  )}
                                </Button>
                                <Button
                                  size={"sm"}
                                  variant={"destructive"}
                                  onClick={() => setIsEditing(false)}
                                >
                                  Cancel
                                </Button>
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
                          <TableCell className="font-medium text-gray-500">
                            Email
                          </TableCell>
                          <TableCell className="w-[0px] text-gray-500 font-medium">
                            :
                          </TableCell>
                          <TableCell className="font-medium text-gray-500 flex items-center justify-start gap-2">
                            {isEditing1 ? (
                              <Input ref={inputRef1} />
                            ) : (
                              user.email
                            )}
                            {isEditing1 ? (
                              <>
                                <Button size={"sm"}>Save</Button>
                                <Button
                                  size={"sm"}
                                  variant={"destructive"}
                                  onClick={() => setIsEditing1(false)}
                                >
                                  Cancel
                                </Button>
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
                          <TableCell className="font-medium text-gray-500">
                            Phone
                          </TableCell>
                          <TableCell className="w-[0px] text-gray-500 font-medium">
                            :
                          </TableCell>
                          <TableCell className="font-medium text-gray-500 flex items-center justify-start gap-2">
                            {user.phone ? (
                              user.phone
                            ) : (
                              <Badge variant={"destructive"}>No data</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium text-gray-500">
                            Email verified
                          </TableCell>
                          <TableCell className="w-[0px] text-gray-500 font-medium">
                            :
                          </TableCell>
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
                          <TableCell className="font-medium text-gray-500">
                            Type login
                          </TableCell>
                          <TableCell className="w-[0px] text-gray-500 font-medium">
                            :
                          </TableCell>
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
                          <Card
                            key={index}
                            className="pt-3 w-full flex justify-center items-center"
                          >
                            <CardContent className="flex items-start justify-between w-full">
                              <div className="flex items-start gap-2">
                                <img
                                  src={item.image[0]}
                                  alt={item.name}
                                  className={`w-20 ${
                                    item.notes ? "h-20" : "h-16"
                                  } rounded-md object-cover `}
                                />
                                <div className="flex flex-col h-full items-start justify-between">
                                  <p className="font-bold first-letter:uppercase">
                                    {item.name}
                                  </p>
                                  <p className="font-medium text-sm">
                                    Variant :{" "}
                                    <span className="font-bold capitalize">
                                      {item.variant}
                                    </span>
                                  </p>
                                  <p className="font-medium text-sm">
                                    {formattedPrice.toIDR(item.price)}
                                  </p>
                                  {item.notes && (
                                    <p className="font-medium text-sm">
                                      Notes :{" "}
                                      <span className="capitalize font-normal text-gray-500 truncate overflow-hidden">
                                        {item.notes}
                                      </span>
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div
                                className={`border rounded-md flex-col flex items-center ${
                                  item.notes ? "h-20" : "h-16"
                                } justify-between`}
                              >
                                <button
                                  onClick={() => incrementQty(index)}
                                  className="p-1 px-2 rounded-md hover:bg-secondary"
                                >
                                  <PlusIcon size={14} />
                                </button>
                                <p className="font-medium text-xs cursor-default">
                                  {item.quantity}
                                </p>
                                <button
                                  onClick={() => decrementQty(index)}
                                  className="p-1 px-2 rounded-md hover:bg-secondary"
                                >
                                  {item.quantity && item.quantity <= 1 ? (
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
                            <h1 className="font-semibold text-primary text-xs">
                              Subtotal :
                            </h1>
                            <p className="text-gray-500 text-xs">
                              {formattedPrice.toIDR(subtotal)}
                            </p>
                          </div>
                          <hr />
                          <div className="flex w-full justify-between">
                            <h1 className="font-semibold text-primary text-xs">
                              TAX :
                            </h1>
                            <p className="text-gray-500 text-xs text-right">
                              ({taxRate * 100}%) {formattedPrice.toIDR(tax)}{" "}
                            </p>
                          </div>

                          <div className="flex w-full justify-between">
                            <h1 className="font-semibold text-primary text-xs">
                              Transaction fee :
                            </h1>
                            <p className="text-gray-500 text-xs text-right">
                              ({transactionValue * 100}%){" "}
                              {formattedPrice.toIDR(transactionFee)}{" "}
                            </p>
                          </div>
                          <div className="flex w-full justify-between">
                            <h1 className="font-semibold text-primary text-xs">
                              Application fee :
                            </h1>
                            <p className="text-gray-500 text-xs text-right">
                              ({applicationValue * 100}%){" "}
                              {formattedPrice.toIDR(applicationFee)}{" "}
                            </p>
                          </div>
                          <hr />
                          <div className="flex w-full justify-between">
                            <h1 className="font-semibold text-primary text-xs">
                              TOTAL :
                            </h1>
                            <p className="text-primary font-bold text-sm">
                              {formattedPrice.toIDR(total)}
                            </p>
                          </div>
                          <div className="w-full flex flex-col gap-2 mt-5">
                            <Button
                              onClick={() =>
                                (window.location.href = `/user/profile/checkout/${user.name
                                  ?.replace(" ", "-")
                                  .toLowerCase()}`)
                              }
                            >
                              Confirm
                            </Button>

                            <Alerts
                              btn="Delete all"
                              desc="As a result, the cart will be empty. and you must add your items again."
                              ok={() => {
                                setProducts([]);
                                setItems([]);
                                location.reload();
                              }}
                            />
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
              <div className="bg-white rounded-lg lg:p-2 p-1 dark:bg-black">
                <h2 className="text-xl pb-3 border-b font-semibold w-full">
                  Recent Orders
                </h2>
                <ScrollArea className="lg:pb-0 pb-4">
                  <Table className="min-w-full divide-y divide-gray-200 mt-4 dark:divide-gray-800">
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader className="bg-gray-50 dark:bg-gray-900">
                      <TableRow>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Id
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Products
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User Id
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Xendit Id
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order Date
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Users
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></TableHead>
                        {/* <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment Proof
                        </TableHead> */}
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-950 dark:divide-gray-700">
                      {[
                        {
                          id: "#25423",
                          products: [],
                          status: [],
                          userId: "#12345",
                          xenditId: "#09876",
                          orderDate: new Date(),
                          users: [],
                        },
                        {
                          id: "#25423",
                          products: [],
                          status: [],
                          userId: "#12345",
                          xenditId: "#09876",
                          orderDate: new Date(),
                          users: [],
                        },
                        {
                          id: "#25423",
                          products: [],
                          status: [],
                          userId: "#12345",
                          xenditId: "#09876",
                          orderDate: new Date(),
                          users: [],
                        },
                        {
                          id: "#25423",
                          products: [],
                          status: [],
                          userId: "#12345",
                          xenditId: "#09876",
                          orderDate: new Date(),
                          users: [],
                        },
                        {
                          id: "#25423",
                          products: [],
                          status: [],
                          userId: "#12345",
                          xenditId: "#09876",
                          orderDate: new Date(),
                          users: [],
                        },
                      ].map((order, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="px-6 py-4 whitespace-nowrap">
                            {order.id}
                          </TableCell>
                          <TableCell className="px-6 py-4 whitespace-nowrap">
                            {order.products}
                          </TableCell>
                          <TableCell className="px-6 py-4 whitespace-nowrap">
                            {order.status}
                          </TableCell>
                          <TableCell className="px-6 py-4 whitespace-nowrap">
                            {order.userId}
                          </TableCell>
                          <TableCell className="px-6 py-4 whitespace-nowrap">
                            {order.xenditId}
                          </TableCell>
                          {/* <TableCell className="px-6 py-4 whitespace-nowrap"></TableCell>
                          <TableCell className="px-6 py-4 whitespace-nowrap"></TableCell> */}
                          <TableCell className="px-6 py-4 whitespace-nowrap">
                            {/* <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-red-100 text-red-800"
                              }`}
                            > */}
                            {order.status}
                          </TableCell>
                          {/* <TableCell>
                            <ZoomImage
                              src="https://www.doku.com/blog/wp-content/uploads/2023/02/produk-digital.jpeg"
                              alt="Payment Proof"
                            />
                          </TableCell> */}
                          <TableCell className="px-6 py-4 whitespace-nowrap"></TableCell>
                          <TableCell className="px-6 py-4 whitespace-nowrap"></TableCell>
                          <TableCell className="px-6 py-4 whitespace-nowrap">
                            <Link href="/user/invoice">
                              <button className="ml-2 text-gray-500 hover:text-gray-700">
                                <SquareArrowOutUpRightIcon className="w-4 h-4" />
                              </button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <div className="overflow-x-auto shadow-md"></div>
              </div>
            </TabsContent>
            <TabsContent
              value="contract"
              className="w-full lg:mt-8 md:mt-6 mt-5"
            >
              <div className="bg-white rounded-lg lg:p-2 p-1 dark:bg-black">
                <h2 className="text-xl pb-3 border-b font-semibold w-full">
                  Contract
                </h2>
                <ScrollArea className="lg:pb-0 pb-4">
                  <Table className="min-w-full divide-y divide-gray-200 mt-4 dark:divide-gray-800">
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader className="bg-gray-50 dark:bg-gray-900">
                      <TableRow>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Id Contract
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Products
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contract
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-950 dark:divide-gray-700">
                      {contractData && contractData.length > 0 ? (
                        contractData.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                              {item.id}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                              {item.product.name}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                              {item.cost ? item.cost : "-"}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                              {item.status}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                              {item.filename ? (
                                <Button
                                  onClick={() => handlePreview(item.filename)}
                                  className="bg-gray-400 text-black px-2 py-2 rounded-md"
                                >
                                  Preview
                                </Button>
                              ) : (
                                "-"
                              )}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                              {item.status == "AWAITING_CLIENT_SIGNATURE" && (
                                <Button
                                  onClick={() => {
                                    setIsSignature(true);
                                    setSelectedContract(item);
                                  }}
                                >
                                  Sign
                                </Button>
                              )}
                              {item.status == "AWAITING_PAYMENT" && (
                                <Button
                                  onClick={() => {
                                    console.log("payment");
                                  }}
                                >
                                  Pay
                                </Button>
                              )}
                              <Button className="bg-gray-50 text-black px-2 py-2 rounded-md w-fit">
                                Cancel
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <p>No Contract</p>
                      )}
                    </TableBody>
                  </Table>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <div className="overflow-x-auto shadow-md"></div>
              </div>
            </TabsContent>
            <TabsContent
              value="monitoringProgress"
              className="w-full lg:mt-8 md:mt-6 mt-5"
            >
              <div className="bg-white rounded-lg lg:p-2 p-1 dark:bg-black">
                <h2 className="text-xl pb-3 border-b font-semibold w-full">
                  Monitoring Progress
                </h2>
                <ScrollArea className="lg:pb-0 pb-4">
                  <Table className="min-w-full divide-y divide-gray-200 mt-4 dark:divide-gray-800">
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader className="bg-gray-50 dark:bg-gray-900">
                      <TableRow>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Id Contract
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Products
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contract
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-950 dark:divide-gray-700">
                      {[].map((item, idx) => (
                        <TableRow key={idx}></TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <div className="overflow-x-auto shadow-md"></div>
              </div>
            </TabsContent>
            {isSignature && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
                  <SignaturePad onSave={(sign) => setSignature(sign)} />
                  <div className="flex justify-end items-center mt-4 gap-4">
                    <Button
                      variant="ghost"
                      onClick={() => setIsSignature(false)}
                    >
                      Close
                    </Button>
                    <Button onClick={handleSign}>
                      Confirm and Accept Contract
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {pdfUrl && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] h-[90%] flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Preview Contract</h2>
                    <Button
                      onClick={() => setPdfUrl(null)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Close
                    </Button>
                  </div>
                  <iframe src={pdfUrl} className="w-full flex-grow" />
                </div>
              </div>
            )}
          </>
        )}
      </Tabs>
    </>
  );
};

export default ProfilePage;
