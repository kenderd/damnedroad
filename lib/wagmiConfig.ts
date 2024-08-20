import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import {
  createPublicClient,
  createWalletClient,
  custom,
  getContract,
  http,
} from "viem";

import { cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { ABI } from "./ABI";

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "damnedRoad",
  description: "damnedRoad - A Web3-powered digital product place.",
  url: process.env.NODE_ENV == "production" ? "" : "http://localhost:3000", // origin must match your domain & subdomain
  icons: ["/damnedRoad-logo.svg"],
};


// Create wagmiConfig
const chains = [sepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  auth: {
    email: true, // default to true
    socials: [
      "google",
      "x",
      "github",
      "discord",
      "apple",
      "facebook",
      "farcaster",
    ],
    showWallets: true, // default to true
    walletFeatures: true, // default to true
  },
});

