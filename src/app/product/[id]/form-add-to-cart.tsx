"use client";

import CheckCircle from "@/components/icons/check-circle";
import XMark from "@/components/icons/x-mark";
import { Shoe } from "@/lib/definitions";
import { useCartStore } from "@/store/cart";
import useStore from "@/store/use-store";
import Link from "next/link";
import { useState } from "react";

export default function FormAddToCart({ shoe }: { shoe: Shoe }) {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState<number>();
  const cartStore = useStore(useCartStore, (state) => state);

  if (!cartStore) return <div></div>; // cartStore -> {cart[]}
  const { add: addToCart, count } = cartStore;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const size = e.target.size.value;

    addToCart(shoe, +size);
    setIsOpen(true);
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h4>Selecciona la talla:</h4>
        <div className="grid grid-cols-4">
          {shoe.sizes.map((s, i) => (
            <label key={i} className="flex gap-2">
              <input
                type="radio"
                name="size"
                value={s}
                onChange={(e) => setSize(+e.target.value)}
                required
              />
              {s}
            </label>
          ))}
        </div>

        <button className="bg-black text-white py-4 px-8 rounded-full">
          Añadir a la cesta
        </button>
      </form>
      {isOpen ? (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-30"
            onClick={() => setIsOpen(false)}
          ></div>
          <article className="fixed md:top-16 md:right-8 top-0 right-0 z-50 bg-white md:w-96 w-full p-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="text-green-700">
                  <CheckCircle />
                </div>
                <h4>Añadido la cesta</h4>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <XMark />
              </button>
            </div>
            <div className="flex gap-4 py-4">
              <div className="aspect-square h-20 w-20">
                <img
                  className="w-full h-full object-cover"
                  src={shoe.images[0]}
                  alt={shoe.name}
                />
              </div>
              <div>
                <h5>{shoe.name}</h5>
                <div className="text-neutral-500">
                  <p>
                    {shoe.category} - {shoe.gender}
                  </p>
                  <p>Talla {size}</p>
                  <div className="flex gap-2">
                    {shoe.discount ? (
                      <>
                        <p>{shoe.discountedPrice} €</p>
                        <p className="text-neutral-400 line-through">
                          {shoe.price} €
                        </p>
                      </>
                    ) : (
                      <p>{shoe.discountedPrice} €</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                className="py-3 px-6 w-full text-center rounded-full bg-black text-white"
                href={"/cart"}
              >
                Ver cesta ({count()})
              </Link>
              <Link
                className="py-3 px-6 w-full text-center rounded-full border"
                href={"/cart"}
              >
                Pasar por caja
              </Link>
            </div>
          </article>
        </>
      ) : null}
    </>
  );
}
