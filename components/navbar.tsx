"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { BookOpen, FileText, Menu, X, Home } from "lucide-react"

const navItems = [
  {
    href: "/docs",
    label: "Docs",
    icon: BookOpen,
  },
  {
    href: "/blog",
    label: "Blog",
    icon: FileText,
  },
]

const docsNavItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/blog",
    label: "Blog",
    icon: FileText,
  },
]

export function Navbar() {
  const [toastOpen, setToastOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  // Use different nav items based on current page
  const currentNavItems = pathname === '/docs' ? docsNavItems : navItems

  // Auto-hide toast after 2.5s
  useEffect(() => {
    if (!toastOpen) return
    const id = setTimeout(() => setToastOpen(false), 2500)
    return () => clearTimeout(id)
  }, [toastOpen])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const handleConnect = (e: React.MouseEvent) => {
    e.preventDefault()
    setToastOpen(true)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-black/10 bg-[#ECECEC]/90 backdrop-blur transition-colors relative"
      style={{
        backgroundColor: "#ECECEC",
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
        backgroundSize: "12px 12px",
      }}
    >
      {/* Toast */}
      {toastOpen && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-auto absolute right-4 top-4 z-[60] w-[300px] rounded-[2px] border border-[color:var(--color-border)] bg-white/90 backdrop-blur px-4 py-3 shadow-[inset_0_0_0_1px_var(--color-border),0_14px_36px_rgba(0,0,0,0.14)]"
          style={{ color: "#1F1F1F" }}
        >
          <div className="mb-1 flex items-center justify-between">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "#FF6B6B" }}
            >
              [ NOTICE ]
            </span>
            <span
              aria-hidden
              className="inline-flex h-4 w-4 items-center justify-center rounded-[2px]"
              style={{ backgroundColor: "#FF6B6B" }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2h6v6" stroke="white" strokeWidth="1" />
                <path d="M8 2L2 8" stroke="white" strokeWidth="1" />
              </svg>
            </span>
          </div>
          <p className="text-[12px] leading-[1.45]">slow down there buckaroo, we launch soon</p>
          <div className="mt-2 h-[3px] w-full overflow-hidden rounded-[1px] bg-black/10">
            <div className="h-full w-full origin-right bg-[#FF6B6B]" style={{ animation: "toast-progress 2.5s linear forwards" }} />
          </div>
          <style jsx>{`
            @keyframes toast-progress {
              from { transform: scaleX(1); }
              to { transform: scaleX(0); }
            }
          `}</style>
        </div>
      )}
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
              avacado
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {currentNavItems.map(({ href, label, icon: Icon }) => (
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

        {/* <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={handleConnect}
            className="group inline-flex h-10 items-center justify-center rounded-[2px] border border-[#FF6B6B] bg-[#FF6B6B] px-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_30px_rgba(255,107,107,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-transparent hover:text-[#FF6B6B]"
          >
            Connect Wallet
          </button>
        </div> */}

        <button
          type="button"
          onClick={toggleMobileMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-black/10 bg-white/70 text-[#FF6B6B] transition-all duration-200 hover:border-[#FF6B6B] hover:text-[#FF6B6B] hover:bg-[#FF6B6B]/5 lg:hidden"
        >
          <div className="relative w-5 h-5">
            {/* Hamburger to X animation */}
            <span 
              className={`absolute left-0 top-1 h-0.5 w-5 bg-current transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? 'rotate-45 top-2' : 'rotate-0'
              }`}
            />
            <span 
              className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}
            />
            <span 
              className={`absolute left-0 top-3 h-0.5 w-5 bg-current transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? '-rotate-45 top-2' : 'rotate-0'
              }`}
            />
          </div>
          <span className="sr-only">
            {mobileMenuOpen ? "Close navigation" : "Open navigation"}
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={closeMobileMenu}
          />
          
          {/* Menu Panel */}
          <div 
            className="absolute left-0 right-0 top-0 mx-auto max-w-md bg-[#ECECEC] shadow-2xl border-b border-black/10 animate-in slide-in-from-top duration-300 ease-out"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between border-b border-black/10 p-6">
              <Link href="/" onClick={closeMobileMenu} className="group relative flex items-center gap-3">
                <span className="flex flex-col leading-none">
                  <span
                    className="text-[20px] font-semibold tracking-[-0.04em] text-[#FF6B6B] transition-colors duration-200 group-hover:text-[#FF5555]"
                    style={{
                      fontFamily: "'Scto Grotesk A', Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    avacado
                  </span>
                </span>
              </Link>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-black/10 bg-white/70 text-[#FF6B6B] transition-all duration-200 hover:border-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            {/* Mobile Menu Navigation */}
            <nav className="p-6">
              <ul className="space-y-2">
                {currentNavItems.map(({ href, label, icon: Icon }, index) => (
                  <li 
                    key={label}
                    className="animate-in fade-in slide-in-from-top duration-200 ease-out"
                    style={{ 
                      animationDelay: `${(index + 1) * 50}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <Link
                      href={href}
                      onClick={closeMobileMenu}
                      className="group flex items-center gap-4 rounded-[2px] border border-transparent p-4 font-mono text-[12px] uppercase tracking-[0.18em] text-[#3F3F3F] transition-all duration-200 hover:border-[#FF6B6B]/20 hover:bg-white/70 hover:text-[#FF6B6B] hover:shadow-sm"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-[2px] border border-black/10 bg-white/70 text-[#FF6B6B]/70 transition-all duration-200 group-hover:text-[#FF6B6B] group-hover:shadow-[0_4px_12px_rgba(255,107,107,0.25)] group-hover:border-[#FF6B6B]/30">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="transition-all duration-200">{label}</span>
                      <div className="ml-auto opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
                        <svg className="h-4 w-4 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Footer */}
            <div 
              className="border-t border-black/10 p-6 animate-in fade-in slide-in-from-bottom duration-300 ease-out"
              style={{ 
                animationDelay: '200ms',
                animationFillMode: 'both'
              }}
            >
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#666666]">
                Launch Soon
              </p>
              <div className="mt-2 text-center">
                <div className="inline-flex h-2 w-16 items-center justify-center">
                  <div className="h-1 w-full rounded-full bg-black/10">
                    <div className="h-full w-3/4 rounded-full bg-[#FF6B6B] animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
