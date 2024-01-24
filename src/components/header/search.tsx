"use client";

import { useState } from "react";
import MagnifyingGlass from "../icons/magnifying-glass";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../icons/logo";

export default function Search() {
  const [active, setActive] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const term = e.target.term.value;

    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
      setActive(true);
    } else {
      params.delete("q");
      setActive(false);
    }

    router.replace(`/products/?${params.toString()}`);
  };

  const handleChange = (e: any) => {
    const term = e.target.value;
    if (term) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  return (
    <div>
      <article
        className={`${
          active &&
          "bg-white absolute z-20 w-full left-0 top-0 py-2 md:px-8 px-4"
        }`}
      >
        <div className="flex items-center justify-between">
          {active && (
            <Link className="md:block hidden" href={"/"}>
              <Logo />
            </Link>
          )}
          {!active && (
            <button
              className="md:hidden hover:bg-neutral-200 p-3 rounded-full"
              onClick={() => setActive(true)}
            >
              <MagnifyingGlass />
            </button>
          )}
          <form
            className="hidden md:flex flex-1 max-w-xl bg-neutral-100 hover:bg-neutral-200 rounded-full"
            onSubmit={handleSubmit}
          >
            <button className="hover:bg-neutral-300 p-3 rounded-full">
              <MagnifyingGlass />
            </button>
            <input
              className="bg-transparent w-full outline-none px-2"
              type="search"
              name="term"
              placeholder="Buscar"
              onChange={handleChange}
              defaultValue={searchParams.get("q")?.toString()}
            />
          </form>
          {active && (
            <form
              className="md:hidden flex flex-1 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-all"
              onSubmit={handleSubmit}
            >
              <button className="hover:bg-neutral-300 p-3 rounded-full">
                <MagnifyingGlass />
              </button>
              <input
                className="bg-transparent w-full outline-none px-2"
                type="search"
                name="term"
                placeholder="Buscar"
                onChange={handleChange}
                defaultValue={searchParams.get("q")?.toString()}
              />
            </form>
          )}
          {active && (
            <button className="p-3" onClick={() => setActive(false)}>
              Cancelar
            </button>
          )}
        </div>
      </article>
    </div>
  );
}
