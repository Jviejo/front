import React from "react";
import Link from "next/link";
function Header() {
  return (
    <div className="text-center my-4">
      <Link href="/">
        <h1 className="text-2xl font-bold">OpenBank</h1>
      </Link>
    </div>
  );
}

export default Header;
