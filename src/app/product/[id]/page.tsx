import { getShoeById } from "@/lib/data";
import { applyDiscount } from "@/lib/utils";
import FormAddToCart from "./form-add-to-cart";

export default async function ShoePage({ params }: { params: { id: string } }) {
  const id = params.id;

  const shoe = await getShoeById(+id);

  if (!shoe) return <div></div>;

  return (
    <article className="flex md:flex-row flex-col gap-8">
      <section className="flex-1 aspect-square">
        <img
          className="w-full h-full object-contain"
          src={shoe.images[0]}
          alt={shoe.name}
        />
      </section>
      <section className="md:w-96 flex flex-col gap-4">
        <header>
          <h1 className="text-2xl">{shoe.name}</h1>
          <p>{shoe.category}</p>
          <div className="py-2">
            {shoe.discount > 0 ? (
              <div className="flex gap-2">
                <span>{applyDiscount(shoe.price, shoe.discount)} €</span>
                <span className="text-neutral-400 line-through">
                  {shoe.price} €
                </span>
                <span className="text-green-700">
                  {shoe.discount} % de descuento
                </span>
              </div>
            ) : (
              <p>{shoe.price} €</p>
            )}
          </div>
        </header>
        <FormAddToCart shoe={shoe} />
        <p>{shoe.description}</p>
      </section>
    </article>
  );
}
