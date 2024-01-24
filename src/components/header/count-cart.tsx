"use client";

import { useCartStore } from "@/store/cart";
import useStore from "@/store/use-store";

export default function CountProductCart() {
  const cartStore = useStore(useCartStore, (state) => state);

  if (!cartStore) return <div></div>; // cartStore -> {cart[]}
  const { count } = cartStore;

  const num = count() > 9 ? "9+" : count();

  return (
    <span
      className="absolute inset-0 flex justify-center items-center pt-2 text-[0.5rem]"
      title={`Productos de la cesta: ${count()}`}
    >
      {num === 0 ? "" : num}
    </span>
  );
}
