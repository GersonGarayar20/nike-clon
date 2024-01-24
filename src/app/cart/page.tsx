"use client";

import { CartStore, useCartStore } from "@/store/cart";
import useStore from "@/store/use-store";
import Trash from "@/components/icons/trash";
import Link from "next/link";
import Heart from "@/components/icons/heart";
import { applyDiscount } from "@/lib/utils";

export default function CartPage() {
  const cartStore = useStore<CartStore, CartStore>(
    useCartStore,
    (state: any) => state
  );

  if (!cartStore) return <div></div>; // cartStore -> {cart[]}
  const { cart, removeItem, totalPrice, setItemCount, setItemSize } = cartStore;

  return (
    <article className="flex md:flex-row flex-col gap-8">
      <section className="flex-1">
        <h1 className="text-2xl">Cesta</h1>
        <ul>
          {cart?.map(
            ({
              id,
              name,
              images,
              sizes,
              size,
              price,
              category,
              gender,
              discount,
            }) => (
              <li key={id} className="flex gap-4 py-4 border-b">
                <Link href={`/product/${id}`}>
                  <div className="h-40 aspect-square">
                    <img
                      className="h-full w-full object-cover"
                      src={images[0]}
                      alt={name}
                    />
                  </div>
                </Link>
                <div className="flex-1 flex flex-col gap-4 justify-between">
                  <div className="flex">
                    <div className="flex-1">
                      <header className="flex flex-col-reverse md:flex-row justify-between">
                        <Link href={`/product/${id}`}>
                          <h4>{name}</h4>
                        </Link>
                        <div>
                          {discount > 0 ? (
                            <div className="flex gap-2">
                              <span>{applyDiscount(price, discount)} €</span>
                              <span className="text-neutral-400 line-through">
                                {price} €
                              </span>
                            </div>
                          ) : (
                            <p>${price}</p>
                          )}
                        </div>
                      </header>
                      <div className="text-neutral-600">
                        <p>
                          {category} - {gender}
                        </p>
                        <div className="flex gap-2">
                          <label>
                            Talla:
                            <select
                              onChange={(e) => {
                                setItemSize(id, +e.target.value);
                              }}
                            >
                              {sizes.map((s, i) => (
                                <option key={i} value={s} selected={s === size}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label>
                            Cantidad:
                            <select
                              className="px-2"
                              onChange={(e) => {
                                setItemCount(id, +e.target.value);
                              }}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button>
                      <Heart />
                    </button>
                    <button onClick={() => removeItem(id)}>
                      <Trash />
                    </button>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
        {cart.length === 0 && <p>No tienes productos en tu cesta.</p>}
      </section>
      <section className="md:w-96 flex flex-col gap-4">
        <h2 className="text-2xl">Resumen</h2>
        <div className="py-4 border-y flex justify-between">
          <span>Total</span>
          {totalPrice() === 0 ? (
            <span>─</span>
          ) : (
            <span>${totalPrice().toFixed(2)}</span>
          )}
        </div>
        {totalPrice() === 0 ? (
          <button
            className="py-4 px-8 rounded-full bg-neutral-100 text-neutral-500"
            disabled
          >
            Pasar por Caja
          </button>
        ) : (
          <button className="py-4 px-8 rounded-full bg-black text-white">
            Pasar por Caja
          </button>
        )}
      </section>
    </article>
  );
}
