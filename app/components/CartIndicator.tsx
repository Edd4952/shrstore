"use client";

import Link from "next/link";
import React from "react";
import { useCart } from "@/app/cart/cart-context";

export default function CartIndicator() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="link-accent relative">
      Cart
      {totalItems > 0 ? (
        <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-xs text-white">
          {totalItems}
        </span>
      ) : null}
    </Link>
  );
}
