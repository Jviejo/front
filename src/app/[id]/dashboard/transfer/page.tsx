"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { transfer } from "@/lib/cripto";
import { useAccount } from "@/components/useAccount";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
function Transfer() {
  const { register, handleSubmit } = useForm();
  const [amount, setAmount] = useState(0);
  const { account, signMessage } = useAccount();
  const router = useRouter();
  const params = useParams();
  const onSubmit = async (data: any) => {
    console.log(data);
    const signature = await signMessage({
      amount: data.amount,
      address: account.address.toLowerCase(),
      to: data.to.toLowerCase()
    });
    await transfer(account.address, data.to, data.amount, signature);
    router.push(`/${params.id}/dashboard/moviments`);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Tranfer</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="my-3 space-y-8">
        <div className="flex flex-col gap-2">
          <label>Amount</label>
          <Input type="number" {...register("amount")} />
        </div>
        <div className="flex flex-col gap-2">
          <label>To</label>
          <Input type="text" {...register("to")} />
        </div>
        <Button type="submit">Transfer</Button>
      </form>
    </div>
  );
}

export default Transfer;
