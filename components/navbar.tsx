"use client"

import Link from "next/link"
import { BookOpen, FileText, Menu } from "lucide-react"

const navItems = [
  {
    href: "#blog",
    label: "Blog",
    icon: FileText,
  },
  {
    href: "#docs",
    label: "Docs",
    icon: BookOpen,
  },
]

export function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-black/10 bg-[#ECECEC]/90 backdrop-blur transition-colors relative"
      style={{
        backgroundColor: "#ECECEC",
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
        backgroundSize: "12px 12px",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black/5" />
        <div className="absolute inset-y-0 left-0 right-0 mx-auto hidden max-w-[1200px] lg:block">
          <span className="absolute left-6 top-0 bottom-0 w-px bg-black/10 lg:left-16" />
          <span className="absolute right-6 top-0 bottom-0 w-px bg-black/10 lg:right-16" />
        </div>
      </div>

      <div className="relative z-[1] mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between px-6 lg:h-[88px] lg:px-16">
        <Link href="#home" className="group relative flex items-center gap-3">
          <span className="flex flex-col leading-none">
            <span
              className="text-[24px] font-semibold tracking-[-0.04em] text-[#FF6B6B]"
              style={{
                fontFamily: "'Scto Grotesk A', Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              avacado.xyz
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="group relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#3F3F3F] transition-colors duration-200 hover:text-[#FF6B6B]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-[2px] border border-black/10 bg-white/70 text-[#FF6B6B]/70 transition-all duration-200 group-hover:text-[#FF6B6B] group-hover:shadow-[0_4px_12px_rgba(255,107,107,0.25)]">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span>{label}</span>
              <span className="pointer-events-none absolute bottom-[-12px] left-0 right-0 mx-auto h-[1px] w-0 bg-[#FF6B6B] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="#start"
            className="group inline-flex h-10 items-center justify-center rounded-[2px] border border-[#FF6B6B] bg-[#FF6B6B] px-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_30px_rgba(255,107,107,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-transparent hover:text-[#FF6B6B]"
          >
            Connect Wallet
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-black/10 bg-white/70 text-[#FF6B6B] transition-all duration-200 hover:border-[#FF6B6B] hover:text-[#FF6B6B] lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Open navigation</span>
        </button>
      </div>
    </header>
  )
}
