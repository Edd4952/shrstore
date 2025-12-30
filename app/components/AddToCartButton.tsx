"use client";

import React from "react";
import { useCart } from "@/app/cart/cart-context";

export default function AddToCartButton({
  productId,
  disabled,
}: {
  productId: string;
  disabled?: boolean;
}) {
  const { actions } = useCart();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => actions.addItem(productId, 1)}
      className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Add to cart
    </button>
  );
}
