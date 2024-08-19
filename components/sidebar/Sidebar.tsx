import { AnimatePresence, motion } from "framer-motion";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "react-aria-components";
import { RxCopy, RxExit, RxFace, RxHeart, RxRocket } from "react-icons/rx";
import { useAccount, useBalance, useChainId, useDisconnect } from "wagmi";
import Image from "next/image";
import { chainIdToChainInfo } from "@/lib/chainIdToChainInfo";
import { formatEther } from "viem";
import Sell from "./Sell";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import MyForSale from "./MyForSale";
import MyPurchased from "./MyPurchased";
import { AccountContext } from "@/lib/providers/AccountProvider";
import { ABI } from "@/lib/ABI";
export default function Sidebar({
  setProfileOpen,
}: {
  setProfileOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { publicClient, walletClient } = useContext(AccountContext);
  const balance = useBalance({ address: address });
  const [openAccountHovered, setOpenAccountHovered] = useState<boolean>(false);
  const [sellAProductPanel, setSellAProductPanel] = useState<boolean>(false);
  const [myForSalePanel, setMyForSalePanel] = useState<boolean>(false);
  const [myPurchasedPanel, setMyPurchasedPanel] = useState<boolean>(false);
  const [withdrawable, setWithdrawable] = useState<number | undefined>();
  const chainId = useChainId();

  useEffect(() => {
    if (publicClient && !withdrawable) {
      const fetchWithdrawable = async () => {
        if (address == "0xabd4FcDA9854A2E95CD090AA4BE089FA518A9fA6") {
          const withdrawable = (await publicClient.readContract({
            address: "0xb392d6D37D93962cEED4c4eF35Af93e8C0Cd7dcD",
            abi: ABI,
            functionName: "totalRoyalties",
          })) as unknown as bigint;
          setWithdrawable(
            parseFloat(parseFloat(formatEther(withdrawable)).toFixed(4))
          );
        } else {
          {
            const withdrawable = (await publicClient.readContract({
              address: "0xb392d6D37D93962cEED4c4eF35Af93e8C0Cd7dcD",
              abi: ABI,
              functionName: "sellerEarnings",
              args: [address],
            })) as unknown as bigint;
            setWithdrawable(
              parseFloat(parseFloat(formatEther(withdrawable)).toFixed(4))
            );
          }
        }
      };
      fetchWithdrawable();
    }
  }, [publicClient, withdrawable]);

  const goWithdraw = async () => {
    if (publicClient && walletClient) {
      const withdrawNow = async () => {
        if (address == "0xabd4FcDA9854A2E95CD090AA4BE089FA518A9fA6") {
          try {
            const { request } = await publicClient.simulateContract({
              address: "0xb392d6D37D93962cEED4c4eF35Af93e8C0Cd7dcD",
              abi: ABI,
              functionName: "withdrawRoyalties",
              account: address,
            });

            await walletClient.writeContract(request);
          } catch (e) {
            console.error(e);
          }
        } else {
            try {
              const { request } = await publicClient.simulateContract({
                address: "0xb392d6D37D93962cEED4c4eF35Af93e8C0Cd7dcD",
                abi: ABI,
                functionName: "withdrawEarnings",
                account: address,
              });

              await walletClient.writeContract(request);
            } catch (e) {
              console.error(e);
            }
        }
      };
      withdrawNow();
    }
  };

  const { open } = useWeb3Modal();
  

  return (
    <>
      <AnimatePresence>
        {sellAProductPanel && (
          <Sell setSellAProductPanel={setSellAProductPanel} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {myForSalePanel && <MyForSale setMyForSalePanel={setMyForSalePanel} />}
      </AnimatePresence>
      <AnimatePresence>
        {myPurchasedPanel && (
          <MyPurchased setMyPurchasedPanel={setMyPurchasedPanel} />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ left: "25%" }}
        animate={{ left: 0 }}
        transition={{ duration: 0.3 }}
        exit={{ left: "100%" }}
        onClick={() =>
          setTimeout(() => {
            setProfileOpen(false);
          }, 300)
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
                {address?.slice(0, 4) + "..." + address?.slice(-4)} <RxCopy />
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
            <div
              onClick={() => setMyForSalePanel(true)}
              className="border-b border-black px-2 flex gap-1 items-center cursor-pointer hover:text-mustard"
            >
              <RxFace className="text-base" /> My For Sale Items
            </div>
            <div className="border-b border-black px-2 flex gap-1 items-center cursor-pointer hover:text-mustard">
              <RxRocket className="text-base" /> My Purchased Items
            </div>
          </div>
          <div className="flex justify-between w-full border-b bg-white rounded-md text-black  py-4 px-2 text-sm">
            <p> Withdrawable: {withdrawable} ETH</p>
            <Button
              onPress={() => goWithdraw()}
              className={"bg-black rounded-md text-white py-1 px-2"}
            >
              Withdraw
            </Button>
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
    </>
  );
}
