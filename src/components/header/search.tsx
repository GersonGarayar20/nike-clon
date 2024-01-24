"use client";

import MagnifyingGlass from "../icons/magnifying-glass";
import { useSearchParams, useRouter } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const term = e.target.term.value;

    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    router.replace(`/products/?${params.toString()}`);
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <button className="hover:bg-neutral-200 p-3 rounded-full absolute top-0 left-0">
        <MagnifyingGlass />
      </button>
      <input
        className="bg-neutral-100 w-full outline-none p-3 rounded-full pl-14 hover:bg-neutral-200"
        type="search"
        name="term"
        placeholder="Buscar"
        defaultValue={searchParams.get("q")?.toString()}
      />
    </form>
  );
}
