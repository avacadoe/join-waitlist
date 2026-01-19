import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { BookOpen, FileText, Menu, X, Home } from "lucide-react"

const navItems = [
  {
    href: "/docs",
    label: "Docs",
    icon: BookOpen,
  },
]

const docsNavItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
]

// Mobile-aware docs link component
function DocsLink({ children, className, onClick }: { children: React.ReactNode, className: string, onClick?: () => void }) {
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    
    const isMobile = () => {
      if (typeof window === 'undefined') return false;
      return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    if (isMobile()) {
      router.push('/docs/mobile');
    } else {
      router.push('/docs');
    }
  };

  return (
    <a href="/docs" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export function Navbar() {
  const [toastOpen, setToastOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [menuClosing, setMenuClosing] = useState(false)
  const pathname = usePathname()
  
  // Use different nav items based on current page
  const currentNavItems = (pathname === '/docs' || pathname === '/docs/mobile') ? docsNavItems : navItems

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
      className="fixed top-0 w-full z-[100] border-b border-black/10 bg-[#ECECEC] backdrop-blur-md transition-colors"
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
        <Link href="#home" className="group relative flex items-center gap-3 flex-shrink-0">
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
            label === "Docs" ? (
              <DocsLink
                key={label}
                className="group relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#3F3F3F] transition-colors duration-200 hover:text-[#FF6B6B]"
              >
                <span className="grid h-7 w-7 place-items-center rounded-[2px] border border-black/10 bg-white/70 text-[#FF6B6B]/70 transition-all duration-200 group-hover:text-[#FF6B6B] group-hover:shadow-[0_4px_12px_rgba(255,107,107,0.25)]">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span>{label}</span>
                <span className="pointer-events-none absolute bottom-[-12px] left-0 right-0 mx-auto h-[1px] w-0 bg-[#FF6B6B] transition-all duration-300 group-hover:w-full" />
              </DocsLink>
            ) : (
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
            )
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-black/10 bg-white/70 text-[#FF6B6B] transition-colors hover:bg-[#FF6B6B] hover:text-white lg:hidden flex-shrink-0 ml-auto"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            {/* Hamburger to X animation */}
            <span 
              className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
              }`}
            />
            <span 
              className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}
            />
            <span 
              className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
              }`}
            />
          </div>
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          {/* Backdrop - only covers area below navbar */}
          <div 
            className="fixed inset-x-0 bottom-0 z-40 bg-black/20"
            style={{
              top: '68px', // Start below navbar
              animation: "fadeIn 0.2s ease-out forwards"
            }}
            onClick={closeMobileMenu}
          />
          
          {/* Menu Panel */}
          <div 
            className="fixed inset-x-0 z-50 bg-[#ECECEC] shadow-lg border-b border-black/10"
            style={{
              top: '68px', // Position below navbar (mobile navbar height)
              backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
              backgroundSize: "12px 12px",
              animation: "slideDownFromNavbar 0.3s ease-out forwards"
            }}
          >
            <style jsx>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              
              @keyframes slideDownFromNavbar {
                from { 
                  transform: translateY(-100%);
                  opacity: 0;
                }
                to { 
                  transform: translateY(0);
                  opacity: 1;
                }
              }

              @keyframes slideUpToNavbar {
                from { 
                  transform: translateY(0);
                  opacity: 1;
                }
                to { 
                  transform: translateY(-100%);
                  opacity: 0;
                }
              }

              @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
              }

              .menu-closing {
                animation: slideUpToNavbar 0.3s ease-in forwards !important;
              }

              .backdrop-closing {
                animation: fadeOut 0.2s ease-in forwards !important;
              }

              @media (min-width: 1024px) {
                .mobile-menu {
                  top: 88px; /* Desktop navbar height */
                }
              }
            `}</style>

            {/* Navigation Only */}
            <nav className="px-6 py-4">
              <ul className="space-y-3">
                {currentNavItems.map(({ href, label, icon: Icon }) => (
                  <li key={label}>
                    {label === "Docs" ? (
                      <DocsLink
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 p-3 rounded-[2px] text-[#3F3F3F] hover:bg-white/70 hover:text-[#FF6B6B] transition-colors"
                      >
                        <Icon className="h-5 w-5 text-[#FF6B6B]" />
                        <span className="font-mono text-[12px] uppercase tracking-[0.18em]">
                          {label}
                        </span>
                      </DocsLink>
                    ) : (
                      <Link
                        href={href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 p-3 rounded-[2px] text-[#3F3F3F] hover:bg-white/70 hover:text-[#FF6B6B] transition-colors"
                      >
                        <Icon className="h-5 w-5 text-[#FF6B6B]" />
                        <span className="font-mono text-[12px] uppercase tracking-[0.18em]">
                          {label}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
