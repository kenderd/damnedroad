import AccountProvider from "@/lib/providers/AccountProvider";
import AppKitProvider from "@/lib/providers/AppKitProvider";
import SearchProvider from "@/lib/providers/SearchProvider";
import { config } from "@/lib/wagmiConfig";
import { SessionProvider } from "next-auth/react";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

export default async function MyProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <AppKitProvider initialState={initialState}>
      <AccountProvider>
        <SearchProvider>{children}</SearchProvider>
      </AccountProvider>
    </AppKitProvider>
  );
}
