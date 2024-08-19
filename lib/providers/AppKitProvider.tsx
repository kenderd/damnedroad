"use client"
import React, { ReactNode, useEffect } from "react";
import { config, projectId, metadata } from "../wagmiConfig";

import { createWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { State, WagmiProvider } from "wagmi";
import { siweConfig } from "../siweConfig";
import { createPublicClient, createWalletClient, custom, getContract, http } from "viem";
import { sepolia } from "viem/chains";
import { ABI } from "../ABI";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  siweConfig,
  enableOnramp: true,
  enableSwaps: true,
  themeVariables: {
    "--w3m-border-radius-master": "0.0375rem",
    "--w3m-font-family": "Helvetica Neue:400",
    "--w3m-accent": "#C19533",
    "--w3m-color-mix":"#28282B",
    "--w3m-color-mix-strength":50
  },
});


export default function AppKitProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {

  
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
