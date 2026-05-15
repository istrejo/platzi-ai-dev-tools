"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-platzi-blue">
              Platzi <span className="text-platzi-green">FC</span>
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          <Link
            href="/partidos"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-platzi-green transition-colors"
          >
            Partidos
          </Link>
          <Link
            href="/equipo"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-platzi-green transition-colors"
          >
            Equipo
          </Link>
          <Link
            href="/noticias"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-platzi-green transition-colors"
          >
            Noticias
          </Link>
          <Link
            href="/media"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-platzi-green transition-colors"
          >
            Media
          </Link>
          <Link
            href="/entradas"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-platzi-green transition-colors"
          >
            Entradas
          </Link>
          <Link
            href="/tienda"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-platzi-green transition-colors"
          >
            Tienda
          </Link>
          <Link
            href="/club"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-platzi-green transition-colors"
          >
            Club
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button size="sm">Hazte Socio</Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-2 px-4 pb-3 pt-2">
            <Link
              href="/partidos"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Partidos
            </Link>
            <Link
              href="/equipo"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Equipo
            </Link>
            <Link
              href="/noticias"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Noticias
            </Link>
            <Link
              href="/media"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Media
            </Link>
            <Link
              href="/entradas"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Entradas
            </Link>
            <Link
              href="/tienda"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tienda
            </Link>
            <Link
              href="/club"
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Club
            </Link>
            <div className="pt-4">
              <Button className="w-full">Hazte Socio</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
