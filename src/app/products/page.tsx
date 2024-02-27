import Card from "@/components/card";
import { getAllShoes } from "@/lib/data";
import Filters from "./filters";

export default async function ShoesPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams?.q || "";

  const shoes = await getAllShoes(query);

  return (
    <div className="relative">
      {query.length > 0 && (
        <div>
          <p className="text-xs font-semibold">Resultado de busqueda de</p>
          <p className="text-xl">
            {query} ({shoes?.length})
          </p>
        </div>
      )}
      <h1 className="text-2xl mb-4">Zapatillas Hombre</h1>
      <section className="flex">
        <Filters />
        <div className="flex-1">
          <ul className="grid md:grid-cols-3 grid-cols-2 gap-4">
            {shoes?.map((shoe) => (
              <Card key={shoe.id} shoe={shoe} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
