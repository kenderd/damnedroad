"use client";

import { useState } from "react";
import {
  Button,
  Input,
  SearchField,
} from "react-aria-components";
import { RxMagnifyingGlass } from "react-icons/rx";
import Image from "next/image";
export default function Navbar() {
  const [currentSearch, setCurrentSearch] = useState<string | undefined>();

  return (
    <nav className="w-full flex items-center">
      <div className="flex gap-8 items-center">
        <div className="relative">
          <h1 className="text-4xl logotext  h-fit ">damnedRoad</h1>
          <Image
            src={"/damnedRoad-logo.svg"}
            width={40}
            height={40}
            alt="damnedRoad Graphic Logo"
            className="absolute -top-2  -left-4 w-5 h-5 -rotate-[20deg] -z-10"
          />
        </div>
        <SearchField
          className={`flex items-center border-2 rounded-md h-fit px-2`}
        >
          <Input
            onChange={(e) => setCurrentSearch(e.target.value)}
            placeholder="Search a product..."
            className={"outline-none placeholder:text-black/40 appearance-none"}
          />
          {
            <Button>
              <RxMagnifyingGlass />
            </Button>
          }
        </SearchField>
      </div>
    </nav>
  );
}
