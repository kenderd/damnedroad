import Navbar from "@/components/common/Navbar";
import Image from "next/image";
import { Input, SearchField, Text } from "react-aria-components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar/>
    </main>
  );
}
