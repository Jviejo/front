'use client'

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";


export default function Home() {
  const [wallets, setWallets] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    const walletKeys = Object.keys((window as any).localStorage).filter((key) =>
      key.startsWith("wallet")
    );  
    setWallets(walletKeys);
    console.log("Wallet Keys:", walletKeys);
  }, []);
  
  // async function handleSignMessage() {
  //   const signature = await signMessage("hello");
  //   const address = await verifySignature(signature, "hello");
  //   console.log(address);
  // }
  // async function handleChangeWallet() {
  //   setAccount(null);
  // }

  function getAddress(key: string) {
    const wallet = JSON.parse((window as any).localStorage.getItem(key) || "{}");
    return wallet.address;
  }
  

  return (
    <div className="container mx-auto">
      <Button onClick={() => router.push("/addWallet")}>Add</Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Wallet Name</TableHead>
            <TableHead>Wallet Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          { wallets.map((key: any) => {
              return (
                <TableRow key={key}>
                  <TableCell>
                    <Button variant="outline">
                      <Link href={`/${key}/login`}>{key}</Link>
                    </Button>
                  </TableCell>
                  <TableCell>0x{getAddress(key)}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
