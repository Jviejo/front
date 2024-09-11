"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useAccount } from "@/components/useAccount";
import { useRouter } from "next/navigation";
import { useState } from "react";
function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(false);
  const params = useParams();
  const { getWallet, setAccount } = useAccount();
  const onSubmit = async (data: any) => {
    try {
      const wallet = await getWallet(params.id as string, data.password);
      setAccount(wallet);
    router.push(`/${params.id}/dashboard`);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 w-1/3 space-y-4">
        <h1 className="text-2xl font-bold">Login {params.id}</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input type="password" {...register("password")} />
          <Button type="submit">Login</Button>
        </form>
        {error && <p className="text-red-500">Invalid password</p>}
      </div>
    </div>
  );
}

export default Login;
