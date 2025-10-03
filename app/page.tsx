"use client"

import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section
        className="relative min-h-[75vh] overflow-hidden"
        style={{
          // subtle dotted background
          backgroundColor: "#ECECEC",
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      >
        {/* Horizontal Lines */}
        <div className="absolute inset-x-0 top-16 z-0 h-[1px] w-full bg-gray-300 lg:top-24" />
        <div className="absolute inset-x-0 bottom-16 z-0 h-[1px] w-full bg-gray-300 lg:bottom-24" />

        {/* Vertical Lines */}
        <div className="absolute inset-x-0 top-17 bottom-17 z-0 mx-auto max-w-[1200px] lg:top-24 lg:bottom-24">
          <div className="absolute left-6 top-0 h-full w-[1px] bg-gray-300 lg:left-16" />
          <div className="absolute right-6 top-0 h-full w-[1px] bg-gray-300 lg:right-16" />
        </div>

        {/* Content */}
        <div className="relative z-[1] mx-auto flex h-full w-full max-w-[1200px] px-6 py-16 lg:px-16 lg:py-24">
          <div className="grid h-full w-full min-h-[70vh] gap-8 md:grid-cols-2">
            {/* Left */}
            <div className="relative top-6 flex flex-col justify-between px-2 pt-4 lg:top-10 lg:px-4">
              <div>
                <h1
                  className="text-balance font-bold leading-[1.02] text-[48px] sm:text-[64px] lg:text-[96px]"
                  style={{
                    letterSpacing: "-0.02em",
                    color: "#FF6B6B",
                    fontFamily: "'Scto Grotesk A', Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  The Privacy Wallet
                  <br />
                  For Your Crypto
                </h1>

                {/* Feature bullets */}
                <div
                  className="mt-8 space-y-2 text-[14px] font-semibold uppercase tracking-[0.08em]"
                  style={{
                    color: "#FF6B6B",
                    fontFamily: "JetBrains Mono, Monaco, 'Courier New', monospace",
                  }}
                >
                  <p>PRIVACY FIRST TRADING</p>
                  <p>100% ANONYMOUS</p>
                  <p>COMPLIANCE FRIENDLY</p>
                </div>

                {/* CTA */}
                <div className="mt-10">
                  <button
                    className="inline-flex h-10 items-center justify-center rounded-md border px-6 text-sm font-semibold transition-colors"
                    style={{
                      backgroundColor: "#FF6B6B",
                      borderColor: "#FF6B6B",
                      color: "#FFFFFF",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.backgroundColor = "transparent"
                      el.style.color = "#FF6B6B"
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.backgroundColor = "#FF6B6B"
                      el.style.color = "#FFFFFF"
                    }}
                  >
                    Join Waitlist →
                  </button>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="relative flex min-h-[70vh] items-center justify-center">
              <div className="relative h-full w-full">
                <Image
                  src="/avocado.png"
                  alt="Large grayscale avocado illustration on the right"
                  width={1200}
                  height={1200}
                  priority
                  className="h-[70vh] w-full object-contain"
                  style={{
                    // approximate halftone look with grayscale + contrast and a touch of desaturation
                    filter: "sharpness(1.15) contrast(1.15) saturate(0.75)",
                    transform: "scale(2.9) translateY(24px)", // push it large like the screenshot and nudge further downward
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom banner */}
        <div className="absolute bottom-0 left-0 right-0 z-[1] border-t border-black/10 bg-white/90 py-4">
          <div className="mx-auto max-w-[1200px] px-6">
            <p
              className="text-center"
              style={{
                fontFamily: "JetBrains Mono, Monaco, Courier New, monospace",
                color: "#333333",
                fontSize: "13px",
                marginBottom: "12px",
              }}
            >
              1000+ SOFTWARE TEAMS USE GREPTILE TO SHIP FASTER.{" "}
              <span style={{ color: "#00A667" }}>SEE WHY TEAMS ❤ GREPTILE →</span>
            </p>
            <div className="flex items-center justify-center gap-12">
              <span
                className="font-semibold"
                style={{
                  color: "#AAAAAA",
                  fontSize: "20px",
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                Brex
              </span>
              <span
                className="font-normal"
                style={{
                  color: "#AAAAAA",
                  fontSize: "20px",
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                substack
              </span>
              <span
                className="font-bold"
                style={{
                  color: "#AAAAAA",
                  fontSize: "20px",
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                BILT
              </span>
              <span
                className="font-semibold"
                style={{
                  color: "#AAAAAA",
                  fontSize: "20px",
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                Podium
              </span>
              <span
                className="font-medium"
                style={{
                  color: "#AAAAAA",
                  fontSize: "20px",
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                PostHog
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
