import Link from "next/link";
import CartIndicator from "./CartIndicator";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
];

export default function StoreHeader() {
  return (
    <header className="w-full">
      <nav
        aria-label="Primary"
        className="flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl border bg-[var(--surface-card)] border-[var(--color-red-50)] px-6 py-4 text-sm font-medium sm:text-base"
      >
        <span className="text-strong">ShrStore</span>
        <div className="flex flex-wrap items-center gap-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="link-accent">
              {link.label}
            </Link>
          ))}

          <CartIndicator />
        </div>
      </nav>
    </header>
  );
}