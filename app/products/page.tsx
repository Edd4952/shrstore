import { products } from "./products";
import StoreHeader from "../components/StoreHeader";
import AddToCartButton from "../components/AddToCartButton";

const formatMoney = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export default function Products() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto w-full max-w-5xl px-6 py-16">
        <StoreHeader />

        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.id} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="text-lg font-medium">{p.name}</div>
              <div className="mt-1 text-sm text-white/70">{p.description}</div>
              <div className="mt-4 text-xl font-semibold">{formatMoney(p.priceCents)}</div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags?.map((t) => (
                  <span key={t} className="rounded-full border border-white/15 px-2 py-1 text-xs text-white/80">
                    {t}
                  </span>
                ))}
              </div>

              <AddToCartButton
                productId={p.id}
                disabled={typeof p.amountInStock === "number" && p.amountInStock <= 0}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}