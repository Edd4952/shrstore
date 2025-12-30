"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	useRef,
} from "react";

import { loadCartState, saveCartState } from "@/lib/cart-storage";

export type CartItem = {
	productId: string;
	quantity: number;
};

export type CartState = {
	items: CartItem[];
};

type CartActions = {
	addItem: (productId: string, quantity?: number) => void;
	removeItem: (productId: string) => void;
	setQuantity: (productId: string, quantity: number) => void;
	clear: () => void;
};

type CartContextValue = {
	state: CartState;
	totalItems: number;
	actions: CartActions;
};

type Action =
	| { type: "HYDRATE"; payload: CartState }
	| { type: "ADD"; productId: string; quantity: number }
	| { type: "REMOVE"; productId: string }
	| { type: "SET_QTY"; productId: string; quantity: number }
	| { type: "CLEAR" };

const CartContext = createContext<CartContextValue | null>(null);

const initialState: CartState = { items: [] };

function clampQty(qty: number) {
	if (!Number.isFinite(qty)) return 1;
	return Math.max(0, Math.floor(qty));
}

function reducer(state: CartState, action: Action): CartState {
	switch (action.type) {
		case "HYDRATE": {
			return action.payload;
		}
		case "ADD": {
			const addQty = clampQty(action.quantity);
			if (addQty <= 0) return state;

			const existing = state.items.find((x) => x.productId === action.productId);
			if (!existing) {
				return {
					items: [...state.items, { productId: action.productId, quantity: addQty }],
				};
			}

			return {
				items: state.items.map((x) =>
					x.productId === action.productId
						? { ...x, quantity: x.quantity + addQty }
						: x
				),
			};
		}
		case "REMOVE": {
			return { items: state.items.filter((x) => x.productId !== action.productId) };
		}
		case "SET_QTY": {
			const qty = clampQty(action.quantity);
			if (qty <= 0) {
				return { items: state.items.filter((x) => x.productId !== action.productId) };
			}
			return {
				items: state.items.map((x) =>
					x.productId === action.productId ? { ...x, quantity: qty } : x
				),
			};
		}
		case "CLEAR": {
			return { items: [] };
		}
		default:
			return state;
	}
}

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const hasHydrated = useRef(false);

	useEffect(() => {
		const loaded = loadCartState();
		if (loaded) dispatch({ type: "HYDRATE", payload: loaded });
		hasHydrated.current = true;
	}, []);

	useEffect(() => {
		if (!hasHydrated.current) return;
		saveCartState(state);
	}, [state]);

	const totalItems = useMemo(
		() => state.items.reduce((sum, item) => sum + item.quantity, 0),
		[state.items]
	);

	const actions: CartActions = useMemo(
		() => ({
			addItem: (productId, quantity = 1) =>
				dispatch({ type: "ADD", productId, quantity }),
			removeItem: (productId) => dispatch({ type: "REMOVE", productId }),
			setQuantity: (productId, quantity) =>
				dispatch({ type: "SET_QTY", productId, quantity }),
			clear: () => dispatch({ type: "CLEAR" }),
		}),
		[]
	);

	const value: CartContextValue = useMemo(
		() => ({ state, totalItems, actions }),
		[state, totalItems, actions]
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}

