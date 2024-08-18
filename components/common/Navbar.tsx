"use client";

import { useContext, useEffect, useRef, useState } from "react";
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
export default function Navbar() {
  const [currentSearch, setCurrentSearch] = useState<string | undefined>();
  const [openAccountHovered, setOpenAccountHovered] = useState<boolean>(false);
  const [sellAProductPanel, setSellAProductPanel] = useState<boolean>(false);
  const [dropped, setDropped] = useState<File|undefined>();
  const [digitalProduct,setDigitalProduct] = useState<File|undefined>();
  const [imagePreview,setImagePreview]=useState<string|undefined>();

  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);
  const { disconnect } = useDisconnect();

  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const { address } = useAccount();
  const balance = useBalance({ address: address });
  const { open } = useWeb3Modal();
  const chainId = useChainId();

  //placeholder
  const sampleWithdraw = 1.4206156;

  function imageToPreview(file:File){
    {
      const reader = new FileReader();

      reader.onload = function (e) {
      
        setImagePreview(String(e?.target?.result))
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <AnimatePresence>
        {sellAProductPanel && (
          <div
            onClick={() => setSellAProductPanel(false)}
            className="fixed top-0 left-0 w-[100svw] h-[100svh] flex items-center justify-center z-20"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="grid grid-cols-2 bg-white border-black border-2 rounded-md p-24 gap-8 z-30"
            >
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
                      type="text"
                      className="rounded-md border border-black outline-none p-2"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Description:</p>
                    <TextArea className="rounded-md border border-black outline-none p-2" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Price:</p>
                    <Input
                      type="number"
                      className="rounded-md border border-black outline-none p-2"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>
                      File <span>{"(.zip files only!)"}</span>:
                    </p>
                    <Input
                      type="number"
                      className="rounded-md border border-black outline-none p-2"
                    />
                  </div>
                </div>
              </div>
              <Button
                className={
                  "col-span-2 bg-mustard rounded-md px-4 py-2 w-fit text-white self-center place-self-center"
                }
              >
                Done!
              </Button>
            </div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {address && profileOpen && (
          <motion.div
            initial={{ left: "25%" }}
            animate={{ left: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ left: "100%" }}
            onClick={() =>
              setTimeout(() => {
                setProfileOpen(false);
              }, 500)
            }
            className="fixed flex justify-end top-0 p-6 left-0 h-[100svh] w-[100svw] "
          >
            <section
              onClick={(e) => e.stopPropagation()}
              className=" flex flex-col p-8 gap-8 bg-mustard border-black border-2 h-full rounded-md lg:w-1/4 w-full"
            >
              <div className="w-full flex justify-end">
                <Button
                  onPress={() => setProfileOpen(false)}
                  className={"h-fit w-fit outline-none"}
                >
                  <RxExit className="text-white" />
                </Button>
              </div>
              <div className="flex gap-4 w-full items-center">
                <div
                  onMouseEnter={() => setOpenAccountHovered(true)}
                  onMouseLeave={() => setOpenAccountHovered(false)}
                >
                  <AnimatePresence>
                    {openAccountHovered && (
                      <motion.div
                        onClick={() => open?.()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        exit={{ opacity: 0 }}
                        className="absolute w-20 h-20 bg-black/40 rounded-full flex items-center justify-center cursor-pointer text-white border border-black"
                      >
                        <p className="text-center text-sm">
                          {" "}
                          Open
                          <br />
                          Wallet
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Image
                    src={"/moderngradient.webp"}
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="rounded-full w-20 h-20 object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 text-white text-sm">
                  <p
                    ref={tooltipRef}
                    onClick={() => {
                      setShowTooltip(true);
                      setTimeout(() => setShowTooltip(false), 1000);
                    }}
                    className="relative flex gap-1 items-center cursor-pointer"
                  >
                    <Image
                      src={chainIdToChainInfo[chainId].iconDark}
                      width={50}
                      height={50}
                      alt="Network Logo"
                      className="max-h-5 w-fit object-contain"
                    />
                    {address.slice(0, 4) + "..." + address.slice(-4)} <RxCopy />
                    <AnimatePresence>
                      {showTooltip && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.1 }}
                          className="flex justify-end absolute right-12  w-12  bottom-full text-[0.5rem]  text-white   rounded-md"
                        >
                          <p>Copied!</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </p>

                  <p>
                    Balance:{" "}
                    {balance?.data?.value &&
                      parseFloat(
                        parseFloat(formatEther(balance.data.value)).toFixed(4)
                      )}{" "}
                    {balance.data?.symbol}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full border-b bg-white rounded-md text-black  py-4 gap-2 text-sm">
                <div
                  onClick={() => setSellAProductPanel(true)}
                  className="border-b border-black px-2 flex gap-1 items-center cursor-pointer hover:text-mustard"
                >
                  <RxHeart className="text-base" /> Sell a Digital Product
                </div>
                <div className="border-b border-black px-2 flex gap-1 items-center cursor-pointer hover:text-mustard">
                  <RxFace className="text-base" /> My For Sale Items
                </div>
                <div className="border-b border-black px-2 flex gap-1 items-center cursor-pointer hover:text-mustard">
                  <RxRocket className="text-base" /> My Purchased Items
                </div>
              </div>
              <div className="flex flex-col w-full border-b bg-white rounded-md text-black  py-4 px-2 text-sm">
                Withdrawable: {parseFloat(sampleWithdraw.toFixed(4))} ETH
              </div>
              <div className="w-full flex justify-center">
                <Button
                  onPress={() => disconnect?.()}
                  className={"bg-black rounded-md text-white py-2 px-4"}
                >
                  Disconnect
                </Button>
              </div>
            </section>
          </motion.div>
        )}
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
              onChange={(e) => setCurrentSearch(e.target.value)}
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
