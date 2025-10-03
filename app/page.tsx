"use client"

import { useState } from "react"
import Image from "next/image"
import { FeatureCard } from "@/components/feature-card"
import { Navbar } from "@/components/navbar"
import { SectionHeader } from "@/components/section-header"
import "./pixel-section.css"

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(false)

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen"
        style={{
          backgroundColor: "#ECECEC",
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      >
        {/* Hero */}
        <section
          className="relative min-h-[75vh] overflow-hidden"
          style={{
            // subtle dotted background
            backgroundColor: "#ECECEC",
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        >
          {/* Horizontal Lines */}
          <div className="absolute inset-x-0 top-16 z-0 h-[1px] w-full bg-black/20 lg:top-24" />
          <div className="absolute inset-x-0 bottom-16 z-0 h-[1px] w-full bg-black/20 lg:bottom-24" />

          {/* Vertical Lines */}
          <div className="absolute inset-x-0 top-17 bottom-17 z-0 mx-auto max-w-[1200px] lg:top-24 lg:bottom-24">
            <div className="absolute left-6 top-0 h-full w-[1px] bg-black/20 lg:left-16" />
            <div className="absolute right-6 top-0 h-full w-[1px] bg-black/20 lg:right-16" />
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
                  <div>
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
                      transform: "scale(2.57) translateY(24px)", // push it large like the screenshot and nudge further downward
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom banner */}
          <div
            className="absolute left-0 right-0 z-[1] border-t border-black/10 py-4"
            style={{
              bottom: "-48px",
              backgroundColor: "#ECECEC",
              backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }}
          >
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
                1000+ TEAMS USE AVACADO TO TRADE PRIVACY FIRST.{" "}
                <span style={{ color: "#00A667" }}>SEE WHY AVACADO IS A GAME CHANGER→</span>
              </p>
              <div className="mb-4 flex justify-center">
                <Image
                  src="/avax.png"
                  alt="Avalanche logo"
                  width={140}
                  height={140}
                  style={{
                    filter: "grayscale(1) brightness(1.1)",
                    opacity: 0.6,
                  }}
                />
              </div>
            </div>
            <div className="h-px w-full bg-black/10" />
            <div className="mx-auto max-w-[1200px] px-6 pt-4">
              <div className="flex items-center justify-center gap-12">
                <span
                  className="font-semibold"
                  style={{
                    color: "#AAAAAA",
                    fontSize: "20px",
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  base
                </span>
                <span
                  className="font-normal"
                  style={{
                    color: "#AAAAAA",
                    fontSize: "20px",
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  avalanche
                </span>
                <span
                  className="font-bold"
                  style={{
                    color: "#AAAAAA",
                    fontSize: "20px",
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  eth
                </span>
                <span
                  className="font-semibold"
                  style={{
                    color: "#AAAAAA",
                    fontSize: "20px",
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  1inch
                </span>
                <span
                  className="font-medium"
                  style={{
                    color: "#AAAAAA",
                    fontSize: "20px",
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  hedera
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature section */}
        <section
          className="section-paper section-frame mx-auto mt-28 max-w-[860px] md:max-w-[980px] lg:max-w-[1080px] px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12 relative"
          aria-labelledby="greptile-section-title"
          style={{
            backgroundColor: "#ECECEC",
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        >
          {/* Overlay toggle for pixel matching */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowOverlay((v) => !v)}
              className="rounded-[2px] border border-[color:var(--color-border)] bg-card px-2.5 py-1.5 text-[11px] font-mono tracking-wide text-foreground"
              aria-pressed={showOverlay}
            >
              {showOverlay ? "Hide" : "Show"} reference overlay
            </button>
            <span className="sr-only">Toggles an overlay of the provided screenshot for alignment.</span>
          </div>

          <SectionHeader />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
            <FeatureCard
              accent="green"
              tag="IN-LINE COMMENTS & SUGGESTION"
              title="Context‑aware comments on your PRs"
              description="In‑line comments to identify bugs, antipatterns, and merge up to 80% faster."
              imageSrc="/context-aware-code-snippet.jpg"
              imageAlt="Example in-line code comments"
            />
            <FeatureCard
              accent="orange"
              tag="CUSTOM CONTEXT"
              title="Intelligent suggestions that align with your team's coding standards"
              description="Click‑to‑accept suggestions to fix minor issues in your PR."
              imageSrc="/suggestion-diff-preview.jpg"
              imageAlt="Suggestion diff preview"
            />
            <FeatureCard
              accent="yellow"
              tag="PR SUMMARIES"
              title="Ship with confidence using intelligent PR analysis"
              description="Mermaid diagrams, file‑by‑file breakdowns, and confidence scores for every PR."
              imageSrc="/summary-diagram.jpg"
              imageAlt="PR summary diagram"
            />
            <FeatureCard
              accent="orange"
              tag="LEARNING"
              title="Greptile learns as you use it and creates custom context"
              description="As you interact with Greptile, it learns your team’s standards and applies them to your PRs."
              imageSrc="/custom-context-form.jpg"
              imageAlt="Custom context form"
            />
          </div>

          {showOverlay && <div className="ref-overlay" aria-hidden="true" />}
        </section>
      </main>
    </>
  )
}
