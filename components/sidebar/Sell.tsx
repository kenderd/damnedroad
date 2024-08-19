import { Button, DropZone, Input, TextArea,Text } from "react-aria-components";
import Image from "next/image"
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { uploadProduct } from "@/lib/firebase";
import { useAccount } from "wagmi";
import Spinner from "../common/Spinner";
import { RxExit } from "react-icons/rx";
import { AccountContext } from "@/lib/providers/AccountProvider";


export default function SellProduct({
  setSellAProductPanel,
}: {
  setSellAProductPanel: Dispatch<SetStateAction<boolean>>;
}) {
  const [dropped, setDropped] = useState<File | undefined>();
  const [digitalProduct, setDigitalProduct] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [name,setName] = useState<string|undefined>();
   const [description, setDescription] = useState<string | undefined>();
    const [price, setPrice] = useState<number | undefined>();
    const [isUploading,setIsUploading] = useState<boolean>(false);
    const {walletClient,publicClient} = useContext(AccountContext)
  const {address}=useAccount()
  function imageToPreview(file: File) {
    {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImagePreview(String(e?.target?.result));
      };

      reader.readAsDataURL(file);
    }
  }

  const addProduct = async()=>{
    if(name && description && price && address && dropped && digitalProduct && publicClient && walletClient){
      setIsUploading(true)
      await uploadProduct({
        name,
        description,
        price,
        creator:address,
        image:dropped,
        product:digitalProduct,
        publicClient,
        walletClient
      });
      setIsUploading(false);
      setSellAProductPanel(false);
    }
  }
  return (
    <div
      onClick={() => setSellAProductPanel(false)}
      className="fixed top-0 left-0 w-[100svw] h-[100svh] flex items-center justify-center z-20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid grid-cols-2 bg-white border-black border-2 rounded-md p-24 gap-8 z-30"
      >
        <RxExit
          className="absolute top-12 right-12 text-black hover:text-mustard cursor-pointer"
          onClick={() => setSellAProductPanel(false)}
        />
        <h2 className="col-span-2 text-xl font-semibold border-b border-black pb-4">
          Sell a Product!
        </h2>
        <div className="flex flex-col w-72">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 w-full">
              <h2>Preview Image:</h2>
              <DropZone
                onDrop={async (e) => {
                  let items = await Promise.all(
                    e.items
                      .filter(
                        (item) =>
                          item.kind == "file" &&
                          [
                            "image/jpeg",
                            "image/jpg",
                            "image/gif",
                            "image/webp",
                            "image/png",
                          ].includes(item.type)
                      )
                      .map((fil) => fil)
                  );
                  if (items[0].kind == "file") {
                    const file = await items[0].getFile();
                    imageToPreview(file);
                    setDropped(file);
                  }
                }}
                className={
                  "flex justify-center items-center rounded-md border-2 border-black w-full h-40 aspect-video "
                }
              >
                {!imagePreview ? (
                  <Text slot="label">{"Drop your Image here."}</Text>
                ) : (
                  <Image
                    src={imagePreview}
                    width={200}
                    height={200}
                    alt="Preview Image"
                    className="w-full h-full object-cover"
                  />
                )}
              </DropZone>
            </div>
            <div className="flex flex-col w-full gap-1">
              <h2>Digital Product:</h2>
              <DropZone
                onDrop={async (e) => {
                  let items = await Promise.all(
                    e.items
                      .filter(
                        (item) =>
                          item.kind == "file" &&
                          item.type == "application/x-zip-compressed"
                      )
                      .map((fil) => fil)
                  );
                  if (items[0].kind == "file") {
                    const file = await items[0].getFile();
                    setDigitalProduct(file);
                  }
                }}
                className={
                  "flex justify-center items-center rounded-md border-2 border-black h-12 w-full overflow-hidden px-2"
                }
              >
                <Text slot="label" className="overflow-hidden">
                  {digitalProduct
                    ? digitalProduct.name
                    : "Drop your .zip file here."}
                </Text>
              </DropZone>
            </div>
          </div>
          <div></div>
        </div>
        <div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p>Name:</p>
              <Input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="rounded-md border border-black outline-none p-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p>Description:</p>
              <TextArea
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-md border border-black outline-none p-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p>Price:</p>
              <Input
                onChange={(e) => setPrice(parseFloat(String(e.target.value)))}
                type="number"
                className="rounded-md border border-black outline-none p-2"
              />
            </div>
          </div>
        </div>
        {isUploading ? (
          <div className="col-span-2 w-full flex justify-center">
            <Spinner color="dark" />
          </div>
        ) : (
          <Button
            onPress={() => addProduct()}
            className={`col-span-2  rounded-md px-4 py-2 w-fit text-white self-center place-self-center cursor outline-none ${
              dropped && digitalProduct && name && description && price
                ? "bg-mustard cursor-pointer"
                : "cursor-not-allowed bg-black/40"
            }`}
          >
            Done!
          </Button>
        )}
      </div>
    </div>
  );
}

