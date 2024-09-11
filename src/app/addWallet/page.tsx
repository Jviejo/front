'use client'

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAccount } from "@/components/useAccount";
import Link from "next/link";
import { useRouter } from "next/navigation";
function AddWallet() {
  const { generateWallet } = useAccount();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    await generateWallet(data.walletName, data.password);
    // Import the useRouter hook from Next.js
    

    // After generating the wallet, redirect to the home page
    router.push('/');
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 w-1/3 space-y-4">
        <Button variant="outline" className="w-1/3">
          <Link href="/">Lista</Link>
        </Button>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("walletName", { required: true })}
            placeholder="Wallet Name"
          />
          <Input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
          />
          <Button type="submit">Add Wallet</Button>
        </form>
      </div>
    </div>
  );
}

export default AddWallet;
