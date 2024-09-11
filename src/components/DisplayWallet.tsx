
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';

interface Wallet {
  name: string;
  address: string;
}

export function DisplayWallet() {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    const walletKeys = Object.keys(localStorage).filter(key => key.startsWith('wallet'));
    const walletData = walletKeys.map(key => {
      const wallet = JSON.parse(localStorage.getItem(key) || '{}');
      return {
        name: key,
        address: wallet.address || 'N/A'
      };
    });
    setWallets(walletData);
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Wallet Name</TableHead>
          <TableHead>Wallet Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {wallets.map((wallet) => (
          <TableRow key={wallet.name}>
            <TableCell>
                <Link href={`/${wallet.name}/login`}>{wallet.name}</Link>
            </TableCell>
            <TableCell>0x{wallet.address}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


export default DisplayWallet;