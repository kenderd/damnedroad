"use client";

import { SIWESession } from "@web3modal/siwe";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface searchContext {
  currentSearch?: string;
  setCurrentSearch: Dispatch<SetStateAction<string | undefined>>;
}

export const searchContext = createContext<searchContext>({
  currentSearch:undefined,
  setCurrentSearch:(undefined)=>undefined
});

export default function SearchProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentSearch, setCurrentSearch] = useState<string | undefined>();

  return (
    <searchContext.Provider
      value={{
        currentSearch,
        setCurrentSearch
      }}
    >
      {children}
    </searchContext.Provider>
  );
}
