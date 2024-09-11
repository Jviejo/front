'use client'
import { ethers } from "ethers";
import { AccountContext } from "@/components/context";
import { useContext } from "react";


export const useAccount = () => {
  const { account, setAccount } = useContext(AccountContext);
  
  async function generateWallet(nombre: string, password: string) {
    const wallet = ethers.Wallet.createRandom();
    const encryptedWallet = await wallet.encrypt(password);
    console.log("enc", encryptedWallet);

    const walletObject = JSON.parse(encryptedWallet)

    console.log("antes de grabar en localstorage", walletObject);
    (window as any).localStorage.setItem("wallet-" + nombre, JSON.stringify(walletObject));

    // setAccount({ wallet: JSON.parse(encryptedWallet) });
  }

  async function signMessage(message: {}) {
    console.log("account", account);
    if (!account) {
      throw new Error("No account or wallet available");
    }
    const wallet = new ethers.Wallet(account.privateKey);
    const signedMessage = await wallet.signMessage(JSON.stringify(message));
    return signedMessage; 
  }

  async function getWallet(nombre: string, password: string) {
    const data = (window as any).localStorage.getItem(nombre);
    console.log("data", data);
    const wallet = ethers.Wallet.fromEncryptedJsonSync(
        data as string,
        password
      );
    return wallet;
  }

  return { account, setAccount, generateWallet, getWallet, signMessage };
};
