import Card from "@/components/card";
import { getAllShoes } from "@/lib/data";

export default async function ShoesPage() {
  const shoes = await getAllShoes();

  return (
    <div>
      <h1 className="text-2xl mb-4">Lo más nuevo</h1>
      <ul className="grid md:grid-cols-3 grid-cols-2 gap-4">
        {shoes?.map((shoe) => (
          <Card key={shoe.id} shoe={shoe} />
        ))}
      </ul>
    </div>
  );
}
