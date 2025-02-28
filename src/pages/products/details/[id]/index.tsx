import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, } from "@/components/ui/card";
import { ProductDataType } from "@/types/productDataTypes";
import { MinusIcon, Pencil2Icon, PlusIcon, StarIcon, } from "@radix-ui/react-icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { TabsContent } from "@radix-ui/react-tabs";
import Gallery from "@/components/ui/galery";
import Head from "next/head";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, PenBoxIcon, Star, StarsIcon, Trash2Icon } from "lucide-react";
import { ItemDataType } from "@/types/itemsDataTypes";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import formattedPrice from "@/utils/formattedPrice";

const ModalCheckout = dynamic(() => import("@/components/ui/modals/checkout"), { //mengimpor dua komponen secra dinamis
  ssr: false,
});
const ModalAddReview = dynamic(
  () => import("@/components/ui/modals/addReview"),
  { ssr: false } //opsi ssr = komponen hanya dimuat disisi klien, mencegah potensi masalah saat ssr
);

const Details = ({ //komponen menerima 2 properti
  items, // array yang menyimpan daftar item dalam keranjang
  setItems, // fungsi untuk memperbarui daftar item dalam keranjang
}: {
  items: ItemDataType[];
  setItems: Dispatch<SetStateAction<ItemDataType[]>>; //menggunakan tipe data TypeScript
}) => {
  const { id } = useRouter().query; //deklarasi state, mengambil parameter id dari url menggunakan userouter untuk menentukan produk yg sedang dilihat
  const { data: session, status }: any = useSession(); //mengambil data sesi pengguna (login)
  const [product, setProduct] = useState<ProductDataType>({} as ProductDataType); //menyimpan data produk dari api
  const [variant, setVariant] = useState(""); //menyimpan varian produk yang dipilih
  const [qty, setQty] = useState(1); //mengelola jumlah produk yg ingin ditambahkan ke keranjang, default 1
  const [isReply, setIsReply] = useState(false); //status untuk menampilkan/menghilangkan balasan
  const replyRefs = useRef<HTMLFormElement>(null); //referensi dom untuk elemen form balasan
  const [load, setLoad] = useState(false); //loading data
  const hasReviews = product?.reviews && product.reviews.length > 0; 
  const hasDiscuss = product?.discusses && product.discusses.length > 0; 
  const [notesView, setNotesView] = useState(false); //status untuk buka/tutup modal catatan
  const [notes, setNotes] = useState(""); //menyimpan catatan yg ditambahkan pengguna
  const [notesDone, setNotesDone] = useState(false); //menandai apakah catatan telah diisi
  const notesRef = useRef<HTMLTextAreaElement>(null); //referensi dom untuk elemen teks area catetan
  const [discussView, setDiscussView] = useState(false); //mirip dengan catatan tapi untuk diskusi
  const [discuss, setDiscuss] = useState("");
  const [discussDone, setDiscussDone] = useState(false);
  const discussRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast(); //untuk menampilkan notifikasi kepada pengguna
  const [updated, setUpdated] = useState(false); //menandai perubahan sehingga dapat memicu pengambilan ulang data

  const handleQtyPlus = () => {
    setQty(qty + 1); //meningkatkan atau mengurangi jumlah produk
  };
  const handleQtyMinus = () => {
    setQty(qty - 1); //memastikan kuantitas tidak kurang dari 1
    if (qty <= 1) {
      setQty(1);
    }
  };

  const handleViewReply = () => {
    setIsReply(!isReply);
    setTimeout(() => {
      if (replyRefs.current) {
        replyRefs.current.scrollIntoView();
      }
    }, 10); //buka/tutup form balsan
  };

  const handleViewNotes = () => {
    setNotesView(true); //membuka modal catatan
  };
  const handleCloseNotes = () => {
    setNotesView(false); //menutup modal
  };
  const handleDoneNotes = () => {
    setNotesView(false);
    if (notesRef.current) {
      setNotes(notesRef.current.value);
      notesRef.current.value = notes;
    } //menyimpan catatan yang ditulis
  };

  useEffect(() => {
    if (notes === "") {
      setNotesDone(false);
    } else {
      setNotesDone(true);
    }
  }, [notes]); //memastikan status notesdone diperbarui berdasarkan isi catetan

  const handleViewDiscuss = () => {
    setDiscussView(!discussView);
  }; //buka/tutup tampilan diskusi

  const getData = async () => {
    setLoad(true);
    if (id) {
      try {
        const resp = await axios(`/api/product/get?code=${String(id)}`); //menggunakan axios untuk mengambil data produk berdasarkan id 
        setProduct(resp.data);
        console.log(resp)
        setLoad(false); //status setload digunakan untuk menandai data yang sedang diambil
      } catch (error) {
        setLoad(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [id, updated]); //memanggil fungsi getdata setiap kali id atau updated berubah

  useEffect(() => {
    if (product.variants) {
      setVariant(product?.variants?.[0]);
    }
  }, [product.variants]); //menyimpan varian pertama produk saat data produk sudah diambil

  const calculateSubtotal = (price: number) => {
    return price * qty; //menghitung subtotal harga berdasarkan harga per unit dikalikan jumlah produk
  };

  const handlePushItems = () => {
    if (status === "authenticated" && session.user.role === "user") {
      setItems((prevItems) => {
        const itemExists = prevItems.some(
          (item) => item.code_product === String(id)
        );

        if (itemExists) {
          toast({
            title: "Ouch!",
            description:
              "You have added into cart 😒! If you wanna update quantity, please update it on cart icon in the top right😁",
            variant: "destructive",
          }); //jika produk sdh berada di keranjang, akan ditampilkan notifikasi menggunkan toast ini
          return prevItems;
        } else {
          toast({
            title: "Thank you 😁",
            description:
              'The product has been added in your cart. Click "Cart icon" on top right to view your recent cart 😊',
            variant: "default",
          }); // menmabhakan produk ke keranjang jika pengguna sudah login
          return [
            ...prevItems,
            { code_product: String(id), qty, variant, notes },
          ];
        }
      });
    } else {
      toast({
        className: cn(
          "flex fixed md:max-w-[420px] md:top-4 md:right-4 top-0 right-0"
        ),
        title: "Uh Oh! 😒",
        variant: "destructive",
        description:
          "You're not logged in 😑. Please login first to product into cart!",
      }); //jika belum login, pengguna dieri peringatan untuk login menggunakan toast ini
    }
  }; 

  return (
    <>
      <Head>
        <title>DBI - Item Details</title>
      </Head>
      {product && (
        <div className="flex w-full justify-between lg:flex-row flex-col gap-10">
          <div className="lg:w-[70%] w-full">
            <div className="flex flex-col gap-10 w-full">
              <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-8">
                <div className="w-full">
                  <div className="w-full sticky top-24">
                    <Gallery image={product.image && product.image} />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  {load ? (
                    <Skeleton className="w-1/2 h-3" />
                  ) : (
                    <h1 className="text-2xl font-bold capitalize">
                      {product.name}
                    </h1>
                  )}
                  <div className="flex flex-col gap-2">
                    {load ? (
                      <div className="flex flex-col gap-3 w-full">
                        <Skeleton className="w-full h-2" />
                        <Skeleton className="w-full h-2" />
                        <Skeleton className="w-full h-2" />
                        <Skeleton className="w-full h-2" />
                      </div>
                    ) : (
                      <div
                        className="text-sm text-gray-500 font-medium"
                        dangerouslySetInnerHTML={{ __html: product.desc }}
                      />
                    )}
                    <div className="flex justify-between flex-wrap w-fit gap-3 items-center">
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-medium">
                          Sold {product.sold}
                        </p>
                      </div>
                      <div className="w-1 h-1 bg-zinc-900 rounded-full"></div>
                      <div className="flex items-center gap-1">
                        <StarIcon color="orange" />
                        <p className="text-sm font-medium">{product.rate}</p>
                      </div>
                      <div className="w-1 h-1 bg-zinc-900 rounded-full"></div>
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-medium">
                          Discuss ({product.discusses?.length})
                        </p>
                      </div>
                    </div>
                  </div>
                  {load ? (
                    <Skeleton className="w-3/4 h-5" />
                  ) : (
                    <h1 className="text-3xl font-bold">
                      {formattedPrice.toIDR(product.price)}
                    </h1>
                  )}
                  <hr />
                  <div className="flex flex-col gap-3">
                    <h1 className="font-semibold">Choose Variants :</h1>
                    <div className="flex items-center gap-3">
                      {load ? (
                        <Skeleton className="w-1/4 h-5" />
                      ) : (
                        product.variants?.map((item, index) => (
                          <Button
                            key={index}
                            onClick={() => setVariant(item)}
                            size={"sm"}
                            variant={variant === item ? "default" : "outline"}
                            className="capitalize"
                          >
                            {item}
                          </Button>
                        ))
                      )}
                    </div>
                    <div></div>
                  </div>
                  <hr />
                  <Tabs
                    defaultValue="details"
                    className="w-full flex flex-col gap-5 items-start"
                  >
                    <TabsList className="w-full h-fulll">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="specification">
                        Specification
                      </TabsTrigger>
                      <TabsTrigger value="information">Information</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="w-full">
                      <div className="flex flex-col w-full gap-1">
                        <p className="font-semibold text-gray-500 text-sm">
                          Min. Order:{" "}
                          <span className="text-black">{product.minOrder}</span>
                        </p>
                        <p className="font-semibold text-gray-500 text-sm">
                          Category:{" "}
                          <span className="text-black capitalize">
                            {product.category}
                          </span>
                        </p>
                        {load ? (
                          <div className="flex flex-col gap-2 mt-3">
                            <Skeleton className="w-full h-2" />
                            <Skeleton className="w-full h-2" />
                            <Skeleton className="w-full h-2" />
                            <Skeleton className="w-full h-2" />
                            <Skeleton className="w-full h-2" />
                          </div>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: String(product.details),
                            }}
                            className="text-sm text-gray-500 mt-3"
                          />
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="specification" className="w-full">
                      {load ? (
                        <div className="flex flex-col gap-2 mt-3">
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: String(product.spec),
                          }}
                          className="text-sm text-gray-500"
                        />
                      )}
                    </TabsContent>
                    <TabsContent value="information" className="w-full">
                      {load ? (
                        <div className="flex flex-col gap-2 mt-3">
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                          <Skeleton className="w-full h-2" />
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: String(product.information),
                          }}
                          className="text-sm text-gray-500"
                        />
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              
              <div className="flex flex-col gap-5 w-full">
                <h1 className="text-4xl font-semibold">Discussion</h1>
                <hr />
                <Button onClick={handleViewDiscuss} size={"sm"} className="mt-2">Add discussion</Button>
              </div>
            </div>
          </div>

{/* <div className="flex flex-col gap-5 w-full">
                <h1 className="text-4xl font-semibold">Reviews</h1>
                <hr />
                {load ? (
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col gap-1 w-full">
                        <div className="items-center flex gap-2">
                          <Skeleton className="w-5 h-5 rounded-full" />
                          <Skeleton className=" w-1/3 h-2" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                      <Skeleton className=" w-full h-2" />
                      <Skeleton className=" w-full h-2" />
                      <Skeleton className=" w-full h-2" />
                      <Skeleton className=" w-full h-2" />
                      <Skeleton className=" w-full h-2" />
                      <Skeleton className=" w-full h-2" />
                      <Skeleton className=" w-full h-2" />
                    </CardContent>
                  </Card>
                ) : hasReviews && !load ? (
                  product.reviews?.map((item, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex flex-col gap-1 w-full rounded-md bg-muted p-3">
                          <div className="items-center flex gap-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-8 h-8 object-cover rounded-full"
                            />
                            <div className="space-y-0">
                              <p className="font-semibold">{item.name}</p>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="text-xs ">
                                  {relativeTime.fromNow(item.createdAt)}
                                </span>
                                <span className="font-bold">-</span>
                                <span className="items-center text-xs flex gap-0">
                                  {item.rate}
                                  <Star size={12} />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: String(item.context),
                          }}
                        />
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col gap-0 w-full items-center">
                    <div className="w-1/4">
                      <Lottie animationData={notfoundData} />
                    </div>
                    <h1 className="text-gray-500 text-center">
                      Unfortunately, our product has no reviews. <br /> Click
                      "Add review" button below to add review into our product
                      😊
                    </h1>
                    <ModalAddReview updated={updated} setUpdated={setUpdated} />
                  </div>
                )}
              </div> */}
          <div className="lg:w-[30%] w-full sticky top-24 h-full">
            <div className="w-full">
              <Card className="flex flex-col">
                <CardHeader className="font-bold text-lg">
                  Set Amount and Notes
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <p className="text-gray-500">
                    Variant:{" "}
                    <span className="font-medium text-black capitalize">
                      {variant}
                    </span>
                  </p>
                  <hr />
                  <div className="flex items-center gap-2">
                    <div className="border rounded-md flex justify-between items-center gap-1">
                      <Button
                        disabled={items.some(
                          (item) => item.code_product === String(id)
                        )}
                        onClick={handleQtyMinus}
                        variant={"ghost"}
                        size={"icon"}
                      >
                        <MinusIcon />
                      </Button>
                      <p
                        className={`font-medium ${items.some((item) => item.code_product === String(id))
                          ? "text-muted-foreground"
                          : ""
                          }`}
                      >
                        {qty}
                      </p>
                      <Button
                        disabled={items.some(
                          (item) => item.code_product === String(id)
                        )}
                        onClick={handleQtyPlus}
                        variant={"ghost"}
                        size={"icon"}
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                    <p className="font-medium capitalize flex items-center gap-1 justify-center ">
                      remaining stock :{" "}
                      <span
                        className={`${product.stock && product.stock >= 99
                          ? "underline"
                          : ""
                          }`}
                      >
                        {product.stock && product?.stock >= 99
                          ? "Unlimited"
                          : product.stock}
                      </span>{" "}
                    </p>
                  </div>
                  {notesView ? (
                    <div className="flex flex-col gap-3 w-full items-end mb-3">
                      <Textarea
                        className="h-20 text-sm"
                        placeholder="Type a notes here..."
                        ref={notesRef}
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                      />
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={handleCloseNotes}
                          size={"sm"}
                          variant={"destructive"}
                        >
                          Cancel
                        </Button>
                        <Button size={"sm"} onClick={handleDoneNotes}>
                          Done
                        </Button>
                      </div>
                    </div>
                  ) : notesDone && notes !== "" ? (
                    <div className="text-sm text-gray-500 p-2 border rounded-md w-full flex relative">
                      <div className="flex flex-col gap-1 w-full">
                        <p className="text-sm font-medium text-zinc-950">
                          Notes :
                        </p>
                        <span className="text-wrap overflow-hidden">
                          {notes}
                        </span>
                      </div>
                      <div className="flex items-center w-fit gap-2 right-2 justify-between absolute">
                        <button
                          onClick={() => {
                            setNotesDone(false);
                            setNotes("");
                          }}
                          className="hover:opacity-100 opacity-50"
                        >
                          <Trash2Icon color="#000000" size={16} />
                        </button>
                        <button
                          onClick={() => setNotesView(true)}
                          className="hover:opacity-100 opacity-50"
                        >
                          <PenBoxIcon size={16} color="#000000" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      disabled={items.some(
                        (item) => item.code_product === String(id)
                      )}
                      onClick={handleViewNotes}
                      variant={"outline"}
                      className="flex text-sm items-center justify-start gap-2"
                    >
                      <Pencil2Icon />
                      Add Notes
                    </Button>
                  )}
                  <div className="flex justify-between">
                    <h1 className="text-gray-500 font-medium">Subtotal</h1>
                    <h1 className="font-medium">
                      {formattedPrice.toIDR(calculateSubtotal(product.price))}
                    </h1>
                  </div>
                  <div className="mt-5 w-full flex flex-col gap-3">
                    <Button
                      disabled={items.some(
                        (item) => item.code_product === String(id)
                      )}
                      variant={"outline"}
                      onClick={handlePushItems}
                    >
                      Add to cart
                    </Button>
                    {load ? (
                      ''
                    ) : (
                      <ModalCheckout
                        data={product}
                      />
                    )}
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
