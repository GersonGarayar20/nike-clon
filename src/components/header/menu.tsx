"use client";

import { useState } from "react";
import Bars from "../icons/bars";
import XMark from "../icons/x-mark";
import Link from "next/link";
import ChevronRight from "../icons/chevron-right";

import { links } from "./links";

export default function Menu() {
  const [active, setActive] = useState(false);

  return (
    <div className="md:hidden block">
      <button
        className="p-3 hover:bg-neutral-200 rounded-full"
        onClick={() => setActive(true)}
      >
        <Bars />
      </button>
      {/* fondo */}
      {active && (
        <div
          className="md:hidden fixed bg-black/40 backdrop-blur inset-0 z-40 flex justify-end"
          style={{ animation: "fade .4s" }}
          onClick={() => setActive(false)}
        ></div>
      )}
      {/* menu */}
      <aside
        className={`${
          !active && "translate-x-full"
        } md:hidden fixed right-0 inset-y-0 z-50 w-80 bg-white h-full py-2 px-4 transition-transform`}
      >
        <div className="h-full flex flex-col gap-4">
          <header className="flex justify-end">
            <button
              className="p-3 hover:bg-neutral-200 rounded-full"
              onClick={() => setActive(false)}
            >
              <XMark />
            </button>
          </header>
          <section className="flex-1">
            <nav>
              {links.map(({ href, name }, i) => (
                <Link
                  key={i}
                  className="p-3 flex justify-between"
                  href={href}
                  onClick={() => setActive(false)}
                >
                  {name}
                  <ChevronRight />
                </Link>
              ))}
            </nav>
          </section>
          <footer className="py-8">
            {/* <button className="border py-2 px-4 rounded-full">
              Iniciar sesion
            </button> */}
          </footer>
        </div>
      </aside>
    </div>
  );
}
