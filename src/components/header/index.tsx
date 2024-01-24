import Link from "next/link";
import Heart from "../icons/heart";
import ShoppingBag from "../icons/shopping-bag";
import CountCart from "./count-cart";
import Search from "./search";
import Logo from "../icons/logo";
import Menu from "./menu";
import { Suspense } from "react";

import { links } from "./links";

export default async function NavBar() {
  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-white">
      <div className="py-2 md:px-8 px-4 relative">
        <article className="flex gap-2 justify-between items-center">
          <section>
            <Link href={"/"}>
              <Logo />
            </Link>
          </section>

          <section className="hidden md:block">
            <nav className="flex gap-2 items-center">
              {links.map(({ href, name }, i) => (
                <Link key={i} className="p-3" href={href}>
                  {name}
                </Link>
              ))}
            </nav>
          </section>

          <section className="flex gap-2">
            <Suspense>
              <Search />
            </Suspense>
            <Link
              className="p-3 hover:bg-neutral-200 rounded-full"
              href={"/favorites"}
            >
              <Heart />
            </Link>
            <Link
              className="p-3 hover:bg-neutral-200 rounded-full relative"
              href={"/cart"}
            >
              <CountCart />
              <ShoppingBag />
            </Link>
            {/* <Link
              className="p-3 hover:bg-neutral-200 rounded-full"
              href={"/auth/login"}
            >
              <User />
            </Link> */}
            <Menu />
          </section>
        </article>
      </div>
    </header>
  );
}
