"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {Button } from "@/components/ui/button"
import {Input } from "@/components/ui/input"
import { Form } from "@/components/ui/form"
import { deposit } from "@/lib/cripto"
import { useAccount } from "@/components/useAccount"
function Deposit() {
    const { register, handleSubmit } = useForm();
    const [amount, setAmount] = useState(0);
    const { account } = useAccount();
    const onSubmit = async (data: any) => {
        console.log(data);
        await deposit(account.address, data.amount);
        // Call server action named 'deposit' with the amount
    };
  return (
    <div>
        <h1 className='text-2xl font-bold'>Deposit</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='my-3 space-y-8'>
            <Input type="number" {...register("amount")} />
            <Button type="submit">Deposit</Button>
        </form>
    </div>
  )
}

export default Deposit