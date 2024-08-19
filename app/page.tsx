"use client";
import Navbar from "@/components/common/Navbar";
import { ABI } from "@/lib/ABI";
import { Bytecode } from "@/lib/Bytecode";
import { getProducts } from "@/lib/firebase";
import AccountProvider, {
  AccountContext,
} from "@/lib/providers/AccountProvider";
import { searchContext } from "@/lib/providers/SearchProvider";
import { product } from "@/types";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Button, Input, SearchField, Text } from "react-aria-components";
import { createWalletClient, custom, encodeAbiParameters, parseEther, toHex } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
export default function Home() {
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const [products, setProducts] = useState<product[] | undefined>();
  const { currentSearch } = useContext(searchContext);
  const { publicClient, walletClient } = useContext(AccountContext);
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const buyProduct = async (price:number,productId: number, url: string,fileName:string) => {
    if (publicClient && walletClient && address) {
   
      const hasBought = (await publicClient.readContract({
        address: "0xb392d6D37D93962cEED4c4eF35Af93e8C0Cd7dcD",
        abi: ABI,
        functionName: "hasUserPaidForProduct",
        args: [address, productId],
      })) as unknown as boolean;
      if (hasBought) {
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        try {


          await walletClient.writeContract({
            address: "0xb392d6D37D93962cEED4c4eF35Af93e8C0Cd7dcD",
            chain: sepolia,
            abi: ABI,
            functionName: "purchaseProduct",
            account: address,
            args: [productId],
            value: parseEther(price.toString()),
          });

          // await walletClient.writeContract(request);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  return (
    <div className=" w-full flex flex-col gap-12">
      <header className="flex items-center justify-center w-full bg-black rounded-md h-28">
        <p className="text-white font-extralight">
          Buy whatever you want. Just be careful. This is Web3
        </p>
      </header>
      <main className=" max-h-[90svh] overflow-y-scroll flex w-full sm:border-2 border-black rounded-md min-h-[100svh] sm:grid lg:grid-cols-3 sm:grid-cols-2 p-12 gap-12">
        {products &&
          products
            .filter((product) =>
              currentSearch
                ? product.name.toLowerCase().includes(currentSearch)
                : product
            )
            .map((product) => (
              <div
                key={product.name}
                className="w-full h-fit flex flex-col gap-4 border-2 border-mustard rounded-md p-6"
              >
                <Image
                  src={product.preview_image}
                  width={500}
                  height={500}
                  alt="Product Name"
                  className="w-full max-h-52 object-cover rounded-md text-mustard"
                />
                <h3 className="text-mustard h-24 font-semibold text-lg  flex items-center">
                  {product.name.length < 100
                    ? product.name
                    : product.name.slice(0, 100) + "..."}
                </h3>
                <div className="w-full flex items-center justify-between">
                  <p className="text-black text-lg">{product.price} ETH</p>
                  <Button
                    onPress={() =>
                      !address
                        ? open?.()
                        : buyProduct(
                            product.price,
                            product.contract_product_id,
                            product.product,
                            product.product_file_name,
                          )
                    }
                    className={`bg-black  text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition outline-none`}
                  >
                    Get
                  </Button>
                </div>
              </div>
            ))}
      </main>
    </div>
  );
}
