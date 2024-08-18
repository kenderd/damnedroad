"use client"
import Navbar from "@/components/common/Navbar";
import { getProducts } from "@/lib/firebase";
import { product } from "@/types";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Input, SearchField, Text } from "react-aria-components";
import { useAccount } from "wagmi";

export default function Home() {
  const {address}= useAccount()
  const {open} = useWeb3Modal();
  const [products,setProducts] = useState<product[] | undefined>()
  const sampleText = "The quick brown fox jumps over the lazy fucking dog HAHAH Shet ass my mum is sitting on the front porch hahaha hamberjin"


  useEffect(()=>{
  const fetchProducts = async()=>{
    const products =await getProducts();
    setProducts(products);
  }
  fetchProducts()
  },[])

  
  return (
    <div className=" w-full flex flex-col gap-12">
      <header className="flex items-center justify-center w-full bg-black rounded-md h-36">
        <p className="text-white font-extralight">
          Buy whatever you want. Just be careful. This is Web3
        </p>
      </header>
      <main className=" max-h-[90svh] overflow-y-scroll flex w-full sm:border-2 border-black rounded-md min-h-[100svh] sm:grid lg:grid-cols-3 sm:grid-cols-2 p-12 gap-12">
        <div className="w-full h-fit flex flex-col gap-4 bg-mustard rounded-md p-6">
          <Image
            src={"/moderngradient.webp"}
            width={500}
            height={500}
            alt="Product Name"
            className="w-full max-h-52 object-cover rounded-md"
          />
          <h3 className="text-white h-24 font-semibold text-lg  flex items-center">
            {sampleText.length < 100
              ? sampleText
              : sampleText.slice(0, 100) + "..."}
          </h3>
          <div className="w-full flex items-center justify-between">
            <p className="text-white text-lg">${100}</p>
            
            <Button
              onPress={() => {if(!address) {return} else{open?.()}}}
              className={`bg-black  text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition outline-none`}
            >
              Get
            </Button>
          </div>
        </div>
        {products &&
          products.map((product) => (
            <div className="w-full h-fit flex flex-col gap-4 bg-mustard rounded-md p-6">
              <Image
                src={product.preview_image}
                width={500}
                height={500}
                alt="Product Name"
                className="w-full max-h-52 object-cover rounded-md"
              />
              <h3 className="text-white h-24 font-semibold text-lg  flex items-center">
                {product.name.length < 100
                  ? product.name
                  : product.name.slice(0, 100) + "..."}
              </h3>
              <div className="w-full flex items-center justify-between">
                <p className="text-white text-lg">{product.price} ETH</p>
                <Button
                  className={`bg-black  text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition outline-none`}
                >
                  Get
                </Button>
              </div>
            </div>
          ))}

        <div className="w-full h-fit flex flex-col gap-4 bg-mustard rounded-md p-6">
          <Image
            src={"/moderngradient.webp"}
            width={500}
            height={500}
            alt="Product Name"
            className="w-full max-h-52 object-cover rounded-md"
          />
          <h3 className="text-white h-24 font-semibold text-lg  flex items-center">
            {sampleText.length < 100
              ? sampleText
              : sampleText.slice(0, 100) + "..."}
          </h3>
          <div className="w-full flex items-center justify-between">
            <p className="text-white text-lg">${100}</p>
            <Button
              className={`bg-black  text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition outline-none`}
            >
              Get
            </Button>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-4 bg-mustard rounded-md p-6">
          <Image
            src={"/moderngradient.webp"}
            width={500}
            height={500}
            alt="Product Name"
            className="w-full max-h-52 object-cover rounded-md"
          />
          <h3 className="text-white h-24 font-semibold text-lg  flex items-center">
            {sampleText.length < 100
              ? sampleText
              : sampleText.slice(0, 100) + "..."}
          </h3>
          <div className="w-full flex items-center justify-between">
            <p className="text-white text-lg">${100}</p>
            <Button
              className={`bg-black  text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition outline-none`}
            >
              Get
            </Button>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-4 bg-mustard rounded-md p-6">
          <Image
            src={"/moderngradient.webp"}
            width={500}
            height={500}
            alt="Product Name"
            className="w-full max-h-52 object-cover rounded-md"
          />
          <h3 className="text-white h-24 font-semibold text-lg  flex items-center">
            {sampleText.length < 100
              ? sampleText
              : sampleText.slice(0, 100) + "..."}
          </h3>
          <div className="w-full flex items-center justify-between">
            <p className="text-white text-lg">${100}</p>
            <Button
              className={`bg-black  text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition outline-none`}
            >
              Get
            </Button>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-4 bg-mustard rounded-md p-6">
          <Image
            src={"/moderngradient.webp"}
            width={500}
            height={500}
            alt="Product Name"
            className="w-full max-h-52 object-cover rounded-md"
          />
          <h3 className="text-white h-24 font-semibold text-lg  flex items-center">
            {sampleText.length < 100
              ? sampleText
              : sampleText.slice(0, 100) + "..."}
          </h3>
          <div className="w-full flex items-center justify-between">
            <p className="text-white text-lg">${100}</p>
            <Button
              className={`bg-black  text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition outline-none`}
            >
              Get
            </Button>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-4 bg-mustard rounded-md p-6">
          <Image
            src={"/moderngradient.webp"}
            width={500}
            height={500}
            alt="Product Name"
            className="w-full max-h-52 object-cover rounded-md"
          />
          <h3 className="text-white h-24 font-semibold text-lg  flex items-center">
            {sampleText.length < 100
              ? sampleText
              : sampleText.slice(0, 100) + "..."}
          </h3>
          <div className="w-full flex items-center justify-between">
            <p className="text-white text-lg">${100}</p>
            <Button
              className={`bg-black  text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition outline-none`}
            >
              Get
            </Button>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-4 bg-mustard rounded-md p-6">
          <Image
            src={"/moderngradient.webp"}
            width={500}
            height={500}
            alt="Product Name"
            className="w-full max-h-52 object-cover rounded-md"
          />
          <h3 className="text-white h-24 font-semibold text-lg  flex items-center">
            {sampleText.length < 100
              ? sampleText
              : sampleText.slice(0, 100) + "..."}
          </h3>
          <div className="w-full flex items-center justify-between">
            <p className="text-white text-lg">${100}</p>
            <Button
              className={`bg-black  text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition outline-none`}
            >
              Get
            </Button>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-4 bg-mustard rounded-md p-6">
          <Image
            src={"/moderngradient.webp"}
            width={500}
            height={500}
            alt="Product Name"
            className="w-full max-h-52 object-cover rounded-md"
          />
          <h3 className="text-white h-24 font-semibold text-lg  flex items-center">
            {sampleText.length < 100
              ? sampleText
              : sampleText.slice(0, 100) + "..."}
          </h3>
          <div className="w-full flex items-center justify-between">
            <p className="text-white text-lg">${100}</p>
            <Button
              className={`bg-black  text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition outline-none`}
            >
              Get
            </Button>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-4 bg-mustard rounded-md p-6">
          <Image
            src={"/moderngradient.webp"}
            width={500}
            height={500}
            alt="Product Name"
            className="w-full max-h-52 object-cover rounded-md"
          />
          <h3 className="text-white h-24 font-semibold text-lg  flex items-center">
            {sampleText.length < 100
              ? sampleText
              : sampleText.slice(0, 100) + "..."}
          </h3>
          <div className="w-full flex items-center justify-between">
            <p className="text-white text-lg">${100}</p>
            <Button
              className={`bg-black  text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition outline-none`}
            >
              Get
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
