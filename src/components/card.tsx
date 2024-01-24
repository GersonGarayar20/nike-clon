import { Shoe } from "@/lib/definitions";
import { applyDiscount } from "@/lib/utils";
import Link from "next/link";

export default function Card({ shoe }: { shoe: Shoe }) {
  return (
    <Link href={`/product/${shoe.id}`}>
      <li>
        <div className="aspect-square">
          <img
            className="w-full h-full object-cover"
            src={shoe.images[0]}
            alt={shoe.name}
          />
        </div>
        <div className="py-2">
          {shoe.isNewArrival && <p className="text-amber-700">Lo último</p>}
          <h4>{shoe.name}</h4>
          <p className="text-neutral-600">{shoe.category}</p>
          {shoe.discount > 0 ? (
            <div>
              <div className="flex gap-2">
                <span>{applyDiscount(shoe.price, shoe.discount)} €</span>
                <span className="text-neutral-400 line-through">
                  {shoe.price} €
                </span>
              </div>
              <p className="text-green-700">{shoe.discount} % de descuento</p>
            </div>
          ) : (
            <p>{shoe.price} €</p>
          )}
        </div>
      </li>
    </Link>
  );
}
