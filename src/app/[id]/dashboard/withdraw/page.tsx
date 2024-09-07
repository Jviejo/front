"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {Button } from "@/components/ui/button"
import {Input } from "@/components/ui/input"
import { Form } from "@/components/ui/form"
import { withdraw } from "@/lib/cripto"
import { useAccount } from "@/components/useAccount"

function Withdraw() {
    const { register, handleSubmit } = useForm();
    const [amount, setAmount] = useState(0);
    const { account } = useAccount();
    const onSubmit = async (data: any) => {
        console.log(data);
        await withdraw(account.address, data.amount);
    };
  return (
    <div>
        <h1 className='text-2xl font-bold'>Withdraw</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='my-3 space-y-8'>
            <Input type="number" {...register("amount")} />
            <Button type="submit">Withdraw</Button>
        </form>
    </div>
  )
}

export default Withdraw