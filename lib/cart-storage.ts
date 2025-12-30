import type { CartState } from "@/app/cart/cart-context";

const STORAGE_KEY = "store.cart.v1";

type JsonObject = Record<string, unknown>;

export function loadCartState(): CartState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;

    const items = (parsed as JsonObject)["items"];
    if (!Array.isArray(items)) return { items: [] };

    const sanitized = items
      .filter((x) => x && typeof x === "object")
      .map((x) => {
        const obj = x as JsonObject;

        const productIdValue = obj["productId"];
        const quantityValue = obj["quantity"];

        return {
          productId:
            typeof productIdValue === "string" || typeof productIdValue === "number"
              ? String(productIdValue)
              : "",
          quantity:
            typeof quantityValue === "number"
              ? quantityValue
              : typeof quantityValue === "string"
                ? Number(quantityValue)
                : 0,
        };
      })
      .filter((x) => x.productId.length > 0 && Number.isFinite(x.quantity) && x.quantity > 0);

    return { items: sanitized };
  } catch {
    return null;
  }
}

export function saveCartState(state: CartState): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore write errors (private mode, quota, etc)
  }
}
