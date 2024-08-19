import { Button, DropZone, Input, TextArea, Text } from "react-aria-components";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getForSales, uploadProduct } from "@/lib/firebase";
import { useAccount } from "wagmi";
import Spinner from "../common/Spinner";
import { RxExit } from "react-icons/rx";
import { product } from "@/types";

export default function MyForSale({
  setMyForSalePanel,
}: {
  setMyForSalePanel: Dispatch<SetStateAction<boolean>>;
}) {
  const { address } = useAccount();
  const [forSales, setForSales] = useState<product[] | undefined>();
  useEffect(() => {
    if (address && !forSales) {
      const fetchForSales = async () => {
        const forSales = await getForSales(address);
        setForSales(forSales);
      };
      fetchForSales();
    }
  }, [address]);
  return (
    <div
      onClick={() => setMyForSalePanel(false)}
      className="fixed top-0 left-0 w-[100svw] h-[100svh] flex items-center justify-center z-20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid grid-cols-2 bg-white border-black border-2 rounded-md p-24 gap-8 z-30 min-w-72"
      >
        <RxExit
          className="absolute top-12 right-12 text-black hover:text-mustard cursor-pointer"
          onClick={() => setMyForSalePanel(false)}
        />
        <h2 className="col-span-2 text-xl font-semibold border-b border-black pb-4">
          My For Sale Items
        </h2>
        <div className="col-span-2 grid grid-cols-3 gap-2">
          {forSales &&
            forSales.map((item) => (
              <div  key={item.name} className="flex-col rounded-md border border-black p-4 gap-4 w-full max-w-72">
                <Image
                  src={item.preview_image}
                  alt="Product Image"
                  width={100}
                  height={100}
                  className="w-36 h-20 object-cover"
                />
                <p className="font-semibold">{item.name.length>60 ? item.name.slice(0,56) + "...": item.name}</p>
                <p><span className="font-semibold">Price:</span> {parseFloat(item.price.toFixed(4))} ETH</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
