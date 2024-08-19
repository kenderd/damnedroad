import { Button, DropZone, Input, TextArea, Text } from "react-aria-components";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { uploadProduct } from "@/lib/firebase";
import { useAccount } from "wagmi";
import Spinner from "../common/Spinner";
import { RxExit } from "react-icons/rx";

export default function MyPurchased({
  setMyPurchasedPanel,
}: {
  setMyPurchasedPanel: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      onClick={() => setMyPurchasedPanel(false)}
      className="fixed top-0 left-0 w-[100svw] h-[100svh] flex items-center justify-center z-20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid grid-cols-2 bg-white border-black border-2 rounded-md p-24 gap-8 z-30"
      >
        <RxExit
          className="absolute top-12 right-12 text-black hover:text-mustard cursor-pointer"
          onClick={() => setMyPurchasedPanel(false)}
        />
        <h2 className="col-span-2 text-xl font-semibold border-b border-black pb-4">
          Sell a Product!
        </h2>
      </div>
    </div>
  );
}
