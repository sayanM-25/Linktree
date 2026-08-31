"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigationItems = ["Products", "Templates", "Marketplace", "Learn", "Pricing"];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const showNavbar = ["/", "/generate"].includes(pathname);

  if (!showNavbar) return null;

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-3 z-50 mx-auto mt-3 flex w-[calc(100%-1.5rem)] max-w-6xl items-center justify-between rounded-full bg-white p-3 shadow-[0_8px_24px_rgba(37,79,28,0.12)] sm:top-4 sm:mt-4 sm:w-[calc(100%-3rem)] sm:px-6">
      <Link href="/" onClick={closeMenu} className="shrink-0">
        <img
          className="h-6"
          loading="eager"
          src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg"
          alt="Linktree"
        />
      </Link>

      <ul className="hidden items-center gap-6 text-sm font-semibold text-[#254f1c] lg:flex">
        {navigationItems.map((item) => (
          <li key={item}>
            <Link href="/">{item}</Link>
          </li>
        ))}
      </ul>

      <div className="hidden items-center gap-2 lg:flex">
        <button type="button" className="rounded-xl bg-[#edf1eb] px-4 py-3 text-sm font-bold text-[#254f1c]">
          Login
        </button>
        <Link
          href="/generate"
          className="rounded-full bg-[#254f1c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#173d10]"
        >
          Sign up
        </Link>
      </div>

      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf1eb] text-[#254f1c] lg:hidden"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
          {menuOpen ? (
            <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
          ) : (
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 right-0 top-[calc(100%+0.75rem)] rounded-3xl bg-white p-5 shadow-[0_14px_40px_rgba(37,79,28,0.18)] lg:hidden"
        >
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item}>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#254f1c] hover:bg-[#edf1eb]"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#dce5d3] pt-4">
            <button type="button" className="rounded-xl bg-[#edf1eb] px-4 py-3 text-sm font-bold text-[#254f1c]">
              Login
            </button>
            <Link
              href="/generate"
              onClick={closeMenu}
              className="rounded-full bg-[#254f1c] px-4 py-3 text-center text-sm font-bold text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
