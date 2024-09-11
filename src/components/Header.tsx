import React from "react";
import Link from "next/link";
function Header() {
  return (
    <div className="cc-azul flex justify-between items-center  text-white py-4 text-center">
      <Link className="text-xl font-bold p-3" href="/">
        Codecrypto Challenges
      </Link>
      <Link href="/">
         SEPTIEMPRE 2024
      </Link>
      <Link className="text-xl font-bold p-3" href="/">
         OpenBank
      </Link>
    </div>
  );
}

export default Header;
