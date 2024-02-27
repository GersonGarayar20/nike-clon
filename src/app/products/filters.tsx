"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Filters() {
  const [active, setActive] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (query: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    const result = params.get(query);

    if (!result) {
      params.set(query, value);
    } else {
      if (!result.split(",").includes(value)) {
        params.set(query, `${result},${value}`);
      } else {
        const updatedResult = result
          .split(",")
          .filter((item) => item !== value)
          .join(",");
        if (updatedResult) {
          params.set(query, updatedResult);
        } else {
          params.delete(query);
        }
      }
    }

    router.replace(`/products/?${params.toString()}`);
  };

  return (
    <div className="hidden md:block">
      <button
        className="absolute py-2 px-4 rounded top-0 right-0 flex gap-2"
        onClick={() => setActive(!active)}
      >
        {active ? "Ocultar Filtros" : "Mostrar Filtros"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>
      {/* desktop */}
      <aside className={`${active ? "w-60" : "w-0"} transition-all`}>
        <section
          className={`${
            active ? "" : "-translate-x-full opacity-0"
          } w-60 transition-all`}
        >
          <article>
            <h4 className="text-lg mb-2">Sexo</h4>
            <div className="flex flex-col gap-1">
              <BtnFilter
                query="sexo"
                value="hombre"
                seachParams={searchParams}
                handleClick={handleClick}
              >
                Hombre
              </BtnFilter>
              <BtnFilter
                query="sexo"
                value="mujer"
                seachParams={searchParams}
                handleClick={handleClick}
              >
                Mujer
              </BtnFilter>
              <BtnFilter
                query="sexo"
                value="unisex"
                seachParams={searchParams}
                handleClick={handleClick}
              >
                Unisex
              </BtnFilter>
            </div>
          </article>
        </section>
      </aside>
    </div>
  );
}

interface BtnFilterProps {
  query: string;
  value: string;
  handleClick: (query: string, value: string) => void;
  seachParams: URLSearchParams;
  children: React.ReactNode;
}

const BtnFilter = ({
  query,
  value,
  handleClick,
  seachParams,
  children,
}: BtnFilterProps) => (
  <button
    className="flex items-center gap-2"
    onClick={() => handleClick(query, value)}
  >
    {seachParams.get(query)?.includes(value) ? (
      <div className="bg-black size-5 flex justify-center items-center rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="size-4 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>
    ) : (
      <div className="border border-neutral-400 size-5 rounded"></div>
    )}
    {children}
  </button>
);
