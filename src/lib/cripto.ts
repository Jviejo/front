"use server"
import { ethers } from "ethers";

export async function verifySignature(signature: string, message: string) {
    const address = ethers.verifyMessage(message, signature);
    return address;
}
export async function getBalance(address: string) {
    try {
        const response = await fetch(`http://localhost:5551/balance/${address}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("data", data)
        return data.balance;
    } catch (error) {
        console.error('Error fetching balance:', error);
        return 0; // Return 0 or handle the error as appropriate for your application
    }
}

export async function deposit(address: string, amount: number) {
    try {
        const response = await fetch('http://localhost:5551/deposit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accountId: address,
                amount: amount,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Deposit response:", data);
        return data.message === 'Deposit successful';
    } catch (error) {
        console.error('Error making deposit:', error);
        return false;
    }
}
export async function withdraw(address: string, amount: number) {
    try {
        const response = await fetch('http://localhost:5551/withdraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accountId: address,
                amount: amount,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Withdraw response:", data);
        return data.message === 'Withdrawal successful';
    } catch (error) {
        console.error('Error making withdrawal:', error);
        return false;
    }
}


export async function transfer(sender: string, recipient: string, amount: number) {
    // Add logic here to transfer 'amount' from 'sender' to 'recipient'
    try {
        const response = await fetch('http://localhost:5551/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fromAccountId: sender,
                toAccountId: recipient,
                amount: amount,
                
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Transfer response:", data);
        return data.message === 'Transfer successful';
    } catch (error) {
        console.error('Error making transfer:', error);
        return false;
    }

}

export async function getAccountMovements(accountId: string) {
    console.log("url", `http://localhost:5551/account/${accountId}/movements?timestamp=`)
    try {
        const response = await fetch(`http://localhost:5551/account/${accountId}/movements?timestamp=`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache:  'no-store' 
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Account movements:", data);
        return data;
    } catch (error) {
        console.error('Error fetching account movements:', error);
        return null;
    }
}

