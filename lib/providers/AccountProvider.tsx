"use client";

import { SIWESession } from "@web3modal/siwe";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Abi, Account, Client, createPublicClient, createWalletClient, custom, getContract, GetContractReturnType, http, PublicClient, ReadContractReturnType, WalletClient, WriteContractReturnType } from "viem";
import { sepolia } from "viem/chains";
import { ABI } from "../ABI";

interface accountContext {
  verified: boolean;
  setVerified: Dispatch<SetStateAction<boolean>>;
  address?: `0x${string}`;
  setAddress: Dispatch<SetStateAction<`0x${string}` | undefined>>;
  chainId?: number;
  setChainId: Dispatch<SetStateAction<number| undefined>>;
  publicClient?:PublicClient;
  walletClient?:WalletClient;
  contractReader?:ReadContractReturnType;
  contractWriter?:ReadContractReturnType;
}


export const AccountContext = createContext<accountContext>({
  verified: false,
  setVerified: (undefined)=>undefined,
  address: undefined,
  setAddress:(undefined)=>undefined,
  chainId:undefined,
  setChainId:(undefined)=>undefined,
  publicClient:undefined,
  walletClient:undefined,
  contractReader:undefined,
  contractWriter:undefined

});



export default function AccountProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [verified,setVerified] = useState<boolean>(false);
  const [address,setAddress] = useState<`0x${string}`>();
  const [chainId,setChainId]= useState<number | undefined>();
  const [publicClient,setPublicClient] = useState<PublicClient|undefined>();
  const [walletClient, setWalletClient] = useState<WalletClient | undefined>();
  const [contractReader,setContractReader] =useState<ReadContractReturnType |undefined>(undefined)
   const [contractWriter, setContractWriter] = useState<
     ReadContractReturnType | undefined
   >(undefined);
  
useEffect(() => {
  if (window) {
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http(),
    });
    setPublicClient(publicClient);

    const contractReader = getContract({
      address: "0xb392d6D37D93962cEED4c4eF35Af93e8C0Cd7dcD",
      abi: ABI,
      client: publicClient,
    });
    setContractReader(contractReader)

    const walletClient = createWalletClient({
      chain: sepolia,
      transport: custom(window.ethereum!),
    });
    setWalletClient(walletClient);

    const contractWriter = getContract({
      address: "0xb392d6D37D93962cEED4c4eF35Af93e8C0Cd7dcD",
      abi: ABI,
      client: walletClient,
    });
    setContractWriter(contractWriter)
  }
}, [typeof window]);

  

  return (
    <AccountContext.Provider value={{verified,setVerified,address,setAddress,chainId,setChainId,publicClient,walletClient,contractReader,contractWriter}}>
      {children}
    </AccountContext.Provider>
  );
}
