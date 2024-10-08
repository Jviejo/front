"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "@/components/useAccount";
import { getAccountMovements } from "@/lib/cripto";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Movients() {
  const { account } = useAccount();
  const [movements, setMovements] = useState([]);
  useEffect(() => {
    const fetchMovements = async () => {
      const movements = await getAccountMovements(account.address as string);
      setMovements(movements.sort((a: any, b: any) => b.timestamp - a.timestamp));
    };
    fetchMovements();
  }, [account.address]);
  return (
    <div className="w-full">
      <h1 className="text-xl  mb-4">Account Movements</h1>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Signature</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.map((movement: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{movement.timestamp.substring(0, 10)} {movement.timestamp.substring(11, 19)}</TableCell>
              <TableCell>{movement.type}</TableCell>
              <TableCell>{movement.fromAccount || movement.toAccount}</TableCell>
              <TableCell>{movement.amount}</TableCell>
              <TableCell>{movement.balance}</TableCell>
              <TableCell>{movement.signature}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Movients;
