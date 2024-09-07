'use client'
import { createContext, useState } from "react";

export const AccountContext = createContext<any>(null);

export const WrapperAcountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [account, setAccount] = useState<any>(null);
  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};