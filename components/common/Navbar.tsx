"use client";

import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { Button, DropZone, Input, SearchField, TextArea,Text, FileDropItem, DropItem } from "react-aria-components";
import {
  RxCopy,
  RxExit,
  RxFace,
  RxHamburgerMenu,
  RxHeart,
  RxMagnifyingGlass,
  RxRocket,
} from "react-icons/rx";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import { useAccount, useBalance, useChainId, useDisconnect } from "wagmi";
import { useWeb3Modal, useWeb3ModalEvents } from "@web3modal/wagmi/react";
import { AccountContext } from "@/lib/providers/AccountProvider";
import { chainIdToChainInfo } from "@/lib/chainIdToChainInfo";
import { AnimatePresence, motion } from "framer-motion";
import { formatEther } from "viem";
import Sell from "../sidebar/Sell";
import Sidebar from "../sidebar/Sidebar";
import { searchContext } from "@/lib/providers/SearchProvider";
export default function Navbar() {

  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const { address } = useAccount();
  const {setCurrentSearch} = useContext(searchContext)

  const { open } = useWeb3Modal();
  const chainId = useChainId();

  //placeholder

  return (
    <>
      <AnimatePresence>
        {address && profileOpen && <Sidebar setProfileOpen={setProfileOpen} />}
      </AnimatePresence>
      <nav className="w-full flex flex-wrap items-center justify-between gap-12">
        <div className="relative">
          <h1 className="text-4xl logotext ">damnedRoad</h1>
          <Image
            src={"/damnedRoad-logo.svg"}
            width={40}
            height={40}
            alt="damnedRoad Graphic Logo"
            className="absolute -top-2  -left-4 w-5 h-5 -rotate-[20deg] -z-10"
          />
        </div>

        <div className="hidden sm:flex flex-wrap-reverse gap-12 items-center">
          <SearchField
            className={`flex items-center border-2 border-black rounded-md h-8 px-2  min-w-8`}
          >
            <Input
              onChange={(e) => setCurrentSearch(e.target.value.toLowerCase())}
              placeholder="Search a product..."
              className={"outline-none placeholder:text-black/40 h-full"}
              spellCheck={false}
            />
            {
              <Button>
                <RxMagnifyingGlass />
              </Button>
            }
          </SearchField>
          {address ? (
            <Button
              onPress={() => setProfileOpen(!profileOpen)}
              className={
                "flex items-center gap-1 text-sm border-2 border-mustard text-mustard p-2 rounded-md outline-none hover:shadow-lg"
              }
            >
              <Image
                src={"/moderngradient.webp"}
                alt="Profile Picture"
                width={24}
                height={24}
                className="rounded-full w-7 h-7 object-cover"
              />
              {/* <div className=" w-1.5 h-1.5 rounded-full bg-mustard"></div> */}
              <Image
                src={chainIdToChainInfo[chainId].iconLight}
                width={16}
                height={16}
                alt="chain Icon text-mustard"
                className="text-mustard max-h-5"
              />
              <p>{address.slice(0, 4) + "..." + address.slice(-4)}</p>
            </Button>
          ) : (
            <Button
              onPress={() => open?.()}
              className={
                "bg-mustard text-white px-8 py-2 rounded-md outline-none"
              }
            >
              Login
            </Button>
          )}
        </div>

        <div className="gap-2 flex sm:hidden items-center">
          <Image
            src={"/moderngradient.webp"}
            alt="Profile Picture"
            width={20}
            height={20}
            className="bg-red-500 rounded-full w-6 h-6 object-cover"
          />
          <RxHamburgerMenu className=" text-mustard text-xl" />
        </div>
      </nav>
    </>
  );
}
