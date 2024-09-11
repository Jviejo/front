"use client"
import React from 'react'
import { useAccount } from '@/components/useAccount';
import { useEffect , useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getBalance } from "@/lib/cripto"
function Balance() {
  const { account } = useAccount();
  const router = useRouter();
  const params = useParams();
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (account) {
      getBalance(account.address).then((dato: any) => {
        setBalance(dato);
      });
    }
    
  }, [account, account?.address, params.id, router]);

  return (
    <div>

      <div>
      <h1 className="text-2xl font-bold">Balance</h1>
        <p className="text-xl">El balance de la wallet es: {balance}</p>
      </div>
    </div>
  )
}

export default Balance;