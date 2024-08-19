import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-between w-full bg-black text-white text-sm px-1">
      <p>
        {" "}
        Developed by <strong>Kenderd</strong> for{" "}
        <Link href={"https://walletconnect.com"} target="_blank">
          <strong>WalletConnect</strong>
        </Link>
        &apos;s{" "}
        <Link
          href="https://build-the-new-internet.devfolio.co/overview"
          target="_blank"
        >
          <strong>Build The New Internet Hackathon.</strong>
        </Link>
      </p>
      <p>All Rights Reserved. 2024</p>
    </div>
  );
}
