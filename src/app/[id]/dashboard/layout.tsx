"use client";
import React from "react";
import { useAccount } from "@/components/useAccount";
import { getBalance } from "@/lib/cripto";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DisplayWallet from "@/components/DisplayWallet";
import Link from "next/link";
function Dasnboard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { account } = useAccount();
  const params = useParams();
  const [balance, setBalance] = useState(0);
  if (!account) {
    router.push("/");
  }
    useEffect(() => {
      if (account) {
        getBalance(account.address).then((dato) => {
          setBalance(dato);
        });
      }
      router.push(`/${params.id}/dashboard/moviments`);
    }, [account, account?.address, params.id, router]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between flex-1">
        <div>
          <Badge className="p-3 text-base mt-5 mr-5 mb-5">
            {params.id} {account.address}
          </Badge>
         
        </div>
        <div>
          <DisplayWallet />
        </div>  
      </div>
      <ul className="flex mt-5 mb-5 space-x-4">
        <li>
          <Button variant="outline" className="cc-azul text-white">
            <Link href={`/${params.id}/dashboard/balance`}>Balance</Link>
          </Button>
        </li>
        <li>
          <Button variant="outline" className="cc-azul text-white">
            <Link href={`/${params.id}/dashboard/moviments`}>Movements</Link>
          </Button>
        </li>
        <li>
          <Button variant="outline" className="cc-azul text-white">
            <Link href={`/${params.id}/dashboard/deposit`}>Deposit</Link>
          </Button>
        </li>
        <li>
          <Button variant="outline" className="cc-azul text-white">
            <Link href={`/${params.id}/dashboard/withdraw`}>Withdraw</Link>
          </Button>
        </li>
        <li>
          <Button variant="outline" className="cc-azul text-white">
            <Link href={`/${params.id}/dashboard/transfer`}>Transfer</Link>
          </Button>
        </li>
      </ul>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default Dasnboard;
