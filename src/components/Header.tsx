'use client';

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-black/10 bg-[color:var(--paper)]/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-baseline justify-between gap-8">
          <div className="min-w-0">
            <Link href="/" className="font-serif text-2xl tracking-tight leading-none">
              Alkis Lorantos
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 text-xs tracking-widest uppercase text-black/60">
            <Link className="hover:text-black transition-colors duration-200" href="/articles">
              Articles
            </Link>
            <Link className="hover:text-black transition-colors duration-200" href="/notes">
              Notes
            </Link>
            <Link className="hover:text-black transition-colors duration-200" href="/tags">
              Tags
            </Link>
            <Link className="hover:text-black transition-colors duration-200" href="/about">
              About
            </Link>
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-black/60 hover:text-black transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-6 pt-6 border-t border-black/10 flex flex-col gap-4 text-sm uppercase tracking-widest text-black/60">
            <Link
              className="hover:text-black transition-colors duration-200"
              href="/articles"
              onClick={() => setMobileMenuOpen(false)}
            >
              Articles
            </Link>
            <Link
              className="hover:text-black transition-colors duration-200"
              href="/notes"
              onClick={() => setMobileMenuOpen(false)}
            >
              Notes
            </Link>
            <Link
              className="hover:text-black transition-colors duration-200"
              href="/tags"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tags
            </Link>
            <Link
              className="hover:text-black transition-colors duration-200"
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}