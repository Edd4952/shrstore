"use client";

import React, { useMemo } from "react";
import Link from "next/link";

import StoreHeader from "../components/StoreHeader";
import { useCart } from "./cart-context";
import { products } from "../products/products";

const formatMoney = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export default function CartPage() {
  const { state, actions, totalItems } = useCart();

  const byId = useMemo(() => {
    const map = new Map(products.map((p) => [p.id, p] as const));
    return map;
  }, []);

  const rows = useMemo(() => {
    return state.items.map((item) => {
      const product = byId.get(item.productId);
      const unitPriceCents = product?.priceCents ?? 0;
      const lineTotalCents = unitPriceCents * item.quantity;
      const maxStock = product?.amountInStock;

      return { item, product, unitPriceCents, lineTotalCents, maxStock };
    });
  }, [state.items, byId]);

  const subtotalCents = useMemo(
    () => rows.reduce((sum, r) => sum + r.lineTotalCents, 0),
    [rows]
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto w-full max-w-5xl px-6 py-16">
        <StoreHeader />

        <div className="mt-8 flex items-baseline justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">Cart</h1>
          <Link
            href="/products"
            className="text-sm text-white/80 hover:text-white underline"
          >
            Continue shopping
          </Link>
        </div>

        {rows.length === 0 ? (
          <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-white/80">Your cart is empty.</p>
            <Link
              href="/products"
              className="mt-4 inline-flex rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-10 space-y-4">
              {rows.map((r) => (
                <li
                  key={r.item.productId}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="text-lg font-medium">
                        {r.product?.name ?? "Unknown product"}
                      </div>
                      {r.product?.description ? (
                        <div className="mt-1 text-sm text-white/70">
                          {r.product.description}
                        </div>
                      ) : null}
                      <div className="mt-3 text-sm text-white/80">
                        Unit: {formatMoney(r.unitPriceCents)}
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      <div className="text-base font-semibold">
                        {formatMoney(r.lineTotalCents)}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            actions.setQuantity(r.item.productId, r.item.quantity - 1)
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white hover:bg-white/15"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <input
                          inputMode="numeric"
                          value={r.item.quantity}
                          onChange={(e) =>
                            actions.setQuantity(
                              r.item.productId,
                              Number(e.target.value || 0)
                            )
                          }
                          className="h-9 w-16 rounded-md border border-white/15 bg-black/30 px-2 text-center text-white"
                          aria-label="Quantity"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            actions.setQuantity(r.item.productId, r.item.quantity + 1)
                          }
                          disabled={
                            typeof r.maxStock === "number" &&
                            r.maxStock > 0 &&
                            r.item.quantity >= r.maxStock
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => actions.removeItem(r.item.productId)}
                        className="text-sm text-white/70 underline hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Items</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-white/80">Subtotal</span>
                <span className="text-lg font-semibold">
                  {formatMoney(subtotalCents)}
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => actions.clear()}
                  className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
                >
                  Clear cart
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
                >
                  Checkout (placeholder)
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
