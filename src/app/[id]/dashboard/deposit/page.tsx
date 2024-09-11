"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {Button } from "@/components/ui/button"
import {Input } from "@/components/ui/input"
import { deposit } from "@/lib/cripto"
import { useAccount } from "@/components/useAccount"
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
function Deposit() {
  const router = useRouter();
  const params = useParams();
    const { register, handleSubmit } = useForm();
    const { account, signMessage } = useAccount();
    const onSubmit = async (data: any) => {
        const signature = await signMessage({
          amount: data.amount,
          address: account.address.toLowerCase()
        });
        console.log("signature", signature);
        await deposit(account.address, data.amount, signature);
        router.push(`/${params.id}/dashboard/moviments`);
    };
  return (
    <div>
        <h1 className='text-2xl font-bold'>Deposit (enlazaria con pasarela de pago)</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='my-3 space-y-8'>
            <Input type="number" {...register("amount")} />
            <Button type="submit">Deposit</Button>
        </form>
    </div>
  )
}

export default Deposit