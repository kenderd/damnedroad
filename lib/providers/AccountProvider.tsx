"use client";

import { SIWESession } from "@web3modal/siwe";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface accountContext {
  verified: boolean;
  setVerified: Dispatch<SetStateAction<boolean>>;
  address?: `0x${string}`;
  setAddress: Dispatch<SetStateAction<`0x${string}` | undefined>>;
  chainId?: number;
  setChainId: Dispatch<SetStateAction<number| undefined>>;
}


export const AccountContext = createContext<accountContext>({
  verified: false,
  setVerified: (undefined)=>undefined,
  address: undefined,
  setAddress:(undefined)=>undefined,
  chainId:undefined,
  setChainId:(undefined)=>undefined,
});



export default function AccountProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [verified,setVerified] = useState<boolean>(false);
  const [address,setAddress] = useState<`0x${string}`>();
  const [chainId,setChainId]= useState<number | undefined>();
  

  return (
    <AccountContext.Provider value={{verified,setVerified,address,setAddress,chainId,setChainId}}>
      {children}
    </AccountContext.Provider>
  );
}
