"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Lenis from "lenis";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FeatureCard } from "@/components/feature-card";
import { Navbar } from "@/components/navbar";
import { SectionHeader } from "@/components/section-header";
import { WaitlistForm } from "@/components/waitlist-form";
import { WaitlistCounter } from "@/components/waitlist-counter";
import { SakuraParticles } from "@/components/sakura-particles";
import {
  TextReveal,
  ScrollTextFill,
  SlideIn,
  FadeIn,
  FadeInScale,
  StaggerContainer,
  staggerItemVariants,
  Parallax,
  ScrollProgressLine,
} from "@/components/scroll-animations";
import "./pixel-section.css";
import "./animated-lines-enhanced.css";

// Custom cubic-bezier easing similar to AVAX/Polygon
const customEase = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const [showOverlay, setShowOverlay] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <ScrollProgressLine />
      <Navbar />
      <SakuraParticles />
      <main
        className="min-h-screen"
        style={{
          backgroundColor: "#ECECEC",
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      >
        {/* Hero - Bento Grid Layout */}
        <section
          className="relative min-h-screen overflow-hidden"
          style={{
            backgroundColor: "#ECECEC",
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        >
          {/* Main Grid Container - Desktop Only */}
          <div className="hidden lg:grid relative z-[1] min-h-screen grid-cols-[320px_1fr_280px]">
            {/* Left Panel */}
            <div className="flex flex-col border-r border-black/10">
              {/* Top Text Section */}
              <div className="p-8 pt-24">
                <SlideIn direction="left" delay={0.1}>
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{
                      color: "#3A3A3A",
                      fontFamily: "Inter, -apple-system, sans-serif",
                    }}
                  >
                    Avacado powers a new era of private crypto transactions. Zero-knowledge proofs. Regulatory compliant. All coming together to form one unified privacy layer.
                  </p>
                </SlideIn>
              </div>

              {/* Card Section - Moved Up */}
              <div className="border-t border-black/10">
                <SlideIn direction="up" delay={0.3}>
                  <div
                    className="relative h-[220px] overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <Image
                        src="/avocado.png"
                        alt=""
                        width={200}
                        height={200}
                        className="object-contain"
                      />
                    </div>
                    <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                      <p
                        className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-2"
                        style={{ color: "rgba(255,255,255,0.8)" }}
                      >
                        PRIVACY FIRST
                      </p>
                      <p
                        className="text-[14px] leading-relaxed"
                        style={{ color: "#FFFFFF" }}
                      >
                        The future of crypto privacy starts here—built for institutions and individuals alike.
                      </p>
                      <a
                        href="#waitlist"
                        className="inline-flex items-center gap-2 mt-4 text-[13px] font-medium text-white hover:gap-3 transition-all"
                      >
                        Learn more <span>→</span>
                      </a>
                    </div>
                  </div>
                </SlideIn>
              </div>

              {/* Spacer to push content up */}
              <div className="flex-1" />
            </div>

            {/* Center Panel - Main Visual */}
            <div className="relative flex items-center justify-center p-8 pt-20 lg:pt-8">
              {/* Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[15%] w-32 h-32 border border-black/10 rounded-sm" />
                <div className="absolute top-[25%] right-[12%] w-20 h-20 border border-black/10 rounded-sm" />
                <div className="absolute bottom-[25%] left-[10%] w-24 h-16 border border-black/10 rounded-sm" />
                <div className="absolute bottom-[30%] left-[15%] w-16 h-24 border border-black/10 rounded-sm" />
              </div>

              {/* Main Avocado Image */}
              <FadeInScale delay={0.2}>
                <div className="relative">
                  <Image
                    src="/avocado.png"
                    alt=" do - Privacy Wallet"
                    width={500}
                    height={500}
                    priority
                    className="h-[45vh] md:h-[55vh] lg:h-[65vh] w-auto object-contain drop-shadow-2xl"
                    style={{
                      filter: "contrast(1.05) saturate(0.9)",
                    }}
                  />
                </div>
              </FadeInScale>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 right-8 text-right">
                <FadeIn delay={0.8}>
                  <p
                    className="text-[12px] font-semibold tracking-wide"
                    style={{ color: "#666" }}
                  >
                    SCROLL
                  </p>
                  <p
                    className="text-[11px]"
                    style={{ color: "#999" }}
                  >
                    to explore page
                  </p>
                  <div className="mt-2 w-[1px] h-8 bg-black/20 ml-auto" />
                </FadeIn>
              </div>
            </div>

            {/* Right Panel */}
            <div className="flex flex-col border-l border-black/10">
              {/* Logo/Brand Section */}
              <div className="p-8 pt-24">
                <FadeIn delay={0.2}>
                  <div
                    className="text-[32px] font-bold"
                    style={{ color: "#FF6B6B" }}
                  >
                    🥑
                  </div>
                </FadeIn>
              </div>

              {/* Time Display */}
              <div className="p-8">
                <FadeIn delay={0.4}>
                  <p
                    className="text-[36px] font-light"
                    style={{
                      color: "#3A3A3A",
                      fontFamily: "Inter, -apple-system, sans-serif",
                    }}
                  >
                    {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </p>
                  <p
                    className="text-[13px] mt-1"
                    style={{ color: "#888" }}
                  >
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </FadeIn>
              </div>

              {/* Tagline */}
              <div className="p-8">
                <FadeIn delay={0.6}>
                  <h1
                    className="text-[28px] leading-tight"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 500,
                      color: "#2A2A2A",
                    }}
                  >
                    The <em style={{ fontStyle: "italic" }}>Privacy Wallet</em>
                    <br />
                    For Your Crypto
                  </h1>
                </FadeIn>
              </div>

              {/* Spacer */}
              <div className="flex-1" />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden relative z-[1] min-h-screen flex flex-col">
            {/* Mobile Header Spacer */}
            <div className="h-20" />

            {/* Mobile Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
              {/* Tagline */}
              <FadeIn delay={0.2}>
                <h1
                  className="text-center text-[28px] sm:text-[36px] md:text-[42px] leading-tight mb-6"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 500,
                    color: "#2A2A2A",
                  }}
                >
                  The <em style={{ fontStyle: "italic" }}>Privacy Wallet</em>
                  <br />
                  For Your Crypto
                </h1>
              </FadeIn>

              {/* Avocado Image */}
              <FadeInScale delay={0.3}>
                <Image
                  src="/avocado.png"
                  alt="Avacado - Privacy Wallet"
                  width={400}
                  height={400}
                  priority
                  className="h-[35vh] sm:h-[40vh] w-auto object-contain my-6"
                  style={{
                    filter: "contrast(1.05) saturate(0.9)",
                  }}
                />
              </FadeInScale>

              {/* CTA Button */}
              <FadeIn delay={0.5}>
                <a
                  href="#waitlist"
                  className="inline-flex h-12 items-center justify-center rounded-md border px-8 text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: "#FF6B6B",
                    borderColor: "#FF6B6B",
                    color: "#FFFFFF",
                  }}
                >
                  Join Waitlist →
                </a>
              </FadeIn>

              {/* Mobile Description */}
              <FadeIn delay={0.6}>
                <p
                  className="text-center text-[13px] sm:text-[14px] leading-relaxed mt-8 max-w-[320px]"
                  style={{
                    color: "#666",
                    fontFamily: "Inter, -apple-system, sans-serif",
                  }}
                >
                  Zero-knowledge proofs. Regulatory compliant. One unified privacy layer.
                </p>
              </FadeIn>
            </div>

            {/* Mobile Scroll Indicator */}
            <div className="pb-8 text-center">
              <FadeIn delay={0.8}>
                <p className="text-[11px] tracking-wide" style={{ color: "#999" }}>
                  SCROLL TO EXPLORE
                </p>
                <div className="mt-2 w-[1px] h-6 bg-black/20 mx-auto" />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Mid-page intro text - Polygon-style scroll text fill */}
        <section
          className="relative overflow-hidden mx-auto mt-8 max-w-full px-6"
          aria-labelledby="mid-intro-text"
        >
          <div className="relative z-[1] flex mt-[40px] mb-[40px] items-center justify-center">
            <div className="w-full text-center">
              <ScrollTextFill
                className="mx-auto max-w-[920px] text-[15px] md:text-[17px] lg:text-[22px] leading-relaxed font-medium"
                baseColor="rgba(58, 58, 58, 0.25)"
                fillColor="#3A3A3A"
              >
                Avacado provides cryptographic transaction unlinking, enabling institutions to transact with complete confidentiality while maintaining regulatory transparency. Our selective disclosure protocol ensures financial privacy through advanced encryption, revealing transaction details only to authorized compliance frameworks when required.
              </ScrollTextFill>
            </div>
          </div>
        </section>

        {/* Why Avacado Section - Stacked Cards */}
        <section
          className="relative py-20 lg:py-32"
          style={{
            backgroundColor: "#ECECEC",
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        >
          {/* Large Title */}
          <div className="px-6 lg:px-16 mb-12 lg:mb-20">
            <FadeIn delay={0.1}>
              <h2
                className="text-[48px] sm:text-[72px] md:text-[96px] lg:text-[140px] leading-[0.9] tracking-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                <span style={{ color: "#2A2A2A" }}>WHY </span>
                <span style={{ color: "#FF6B6B" }}>AVACADO</span>
              </h2>
            </FadeIn>
          </div>

          {/* Stacked Cards Container */}
          <div className="relative px-6 lg:px-16">
            {/* Card 1 - Blue */}
            <div className="sticky top-[70px] lg:top-[90px] z-10 mb-4">
              <div
                className="relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                style={{
                  backgroundColor: "#3B82F6",
                  clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 40px 100%, 0 calc(100% - 40px))",
                }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-[40px] h-[40px] border-l border-b border-white/20" style={{ transform: "translate(0, 0) rotate(0)" }} />
                <div className="absolute bottom-0 left-0 w-[40px] h-[40px] border-t border-r border-white/20" />
                {/* Inner border effect */}
                <div className="absolute inset-[1px] border border-white/10 pointer-events-none" style={{ clipPath: "polygon(0 0, calc(100% - 39px) 0, 100% 39px, 100% 100%, 39px 100%, 0 calc(100% - 39px))" }} />
                {/* Header */}
                <div className="flex items-center gap-4 px-6 lg:px-8 h-[56px] border-b border-white/10">
                  <span
                    className="text-[11px] font-mono tracking-wider"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    01
                  </span>
                  <h3
                    className="text-[16px] sm:text-[20px] lg:text-[24px] font-semibold tracking-tight"
                    style={{
                      color: "#FFFFFF",
                      fontFamily: "Inter, -apple-system, sans-serif",
                      fontStyle: "italic",
                    }}
                  >
                    PRIVATE. COMPLIANT. SECURE.
                  </h3>
                </div>
                {/* Content */}
                <div className="px-6 lg:px-8 pb-10 pt-6 min-h-[280px]">
                  <p
                    className="text-[14px] lg:text-[15px] leading-[1.7] max-w-[520px]"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    Zero-knowledge proofs power a network of private, efficient transactions that finalize instantly. Accompanied by a best-in-class compliance framework, Avacado is the platform of choice for institutions and users ready for true financial privacy.
                  </p>
                </div>
                {/* Decorative corner element */}
                <div className="absolute bottom-4 right-4 w-8 h-8 border border-white/20 rounded-full" />
              </div>
            </div>

            {/* Card 2 - Light Blue */}
            <div className="sticky top-[128px] lg:top-[148px] z-20 mb-4">
              <div
                className="relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                style={{
                  backgroundColor: "#60A5FA",
                  clipPath: "polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)",
                }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-[40px] h-[40px] border-r border-b border-white/20" />
                <div className="absolute bottom-0 right-0 w-[40px] h-[40px] border-t border-l border-white/20" />
                {/* Inner border effect */}
                <div className="absolute inset-[1px] border border-white/10 pointer-events-none" style={{ clipPath: "polygon(39px 0, 100% 0, 100% calc(100% - 39px), calc(100% - 39px) 100%, 0 100%, 0 39px)" }} />
                {/* Header */}
                <div className="flex items-center gap-4 px-6 lg:px-8 h-[56px] border-b border-white/10">
                  <span
                    className="text-[11px] font-mono tracking-wider"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    02
                  </span>
                  <h3
                    className="text-[16px] sm:text-[20px] lg:text-[24px] font-semibold tracking-tight"
                    style={{
                      color: "#FFFFFF",
                      fontFamily: "Inter, -apple-system, sans-serif",
                      fontStyle: "italic",
                    }}
                  >
                    INFINITELY SCALABLE
                  </h3>
                </div>
                {/* Content */}
                <div className="px-6 lg:px-8 pb-10 pt-6 min-h-[280px]">
                  <p
                    className="text-[14px] lg:text-[15px] leading-[1.7] max-w-[520px]"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    Avacado is where Web3's big ideas scale with confidence. Whether it's a single transaction or launching enterprise-grade privacy solutions, Avacado makes it easy to scale up — or across — in an interconnected ecosystem.
                  </p>
                </div>
                {/* Decorative element */}
                <div className="absolute bottom-4 right-4 w-12 h-[2px] bg-white/20" />
                <div className="absolute bottom-6 right-4 w-8 h-[2px] bg-white/20" />
              </div>
            </div>

            {/* Card 3 - Coral/Red */}
            <div className="sticky top-[186px] lg:top-[206px] z-30 mb-4">
              <div
                className="relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                style={{
                  backgroundColor: "#FF6B6B",
                  clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 40px 100%, 0 calc(100% - 40px))",
                }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-[40px] h-[40px] border-l border-b border-white/20" />
                <div className="absolute bottom-0 left-0 w-[40px] h-[40px] border-t border-r border-white/20" />
                {/* Inner border effect */}
                <div className="absolute inset-[1px] border border-white/10 pointer-events-none" style={{ clipPath: "polygon(0 0, calc(100% - 39px) 0, 100% 39px, 100% 100%, 39px 100%, 0 calc(100% - 39px))" }} />
                {/* Header */}
                <div className="flex items-center gap-4 px-6 lg:px-8 h-[56px] border-b border-white/10">
                  <span
                    className="text-[11px] font-mono tracking-wider"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    03
                  </span>
                  <h3
                    className="text-[16px] sm:text-[20px] lg:text-[24px] font-semibold tracking-tight"
                    style={{
                      color: "#FFFFFF",
                      fontFamily: "Inter, -apple-system, sans-serif",
                      fontStyle: "italic",
                    }}
                  >
                    ENCRYPTED TOKENS
                  </h3>
                </div>
                {/* Content */}
                <div className="px-6 lg:px-8 pb-10 pt-6 min-h-[280px]">
                  <p
                    className="text-[14px] lg:text-[15px] leading-[1.7] max-w-[520px]"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    Whatever your use-case, Avacado makes private transactions economically feasible, simpler to execute, and quicker to settle. The protocol is anchored by cutting-edge encrypted ERC20 standards, enabling any token to become private seamlessly.
                  </p>
                </div>
                {/* Decorative element */}
                <div className="absolute bottom-4 right-4">
                  <div className="w-6 h-6 border-2 border-white/20 rotate-45" />
                </div>
              </div>
            </div>

            {/* Card 4 - Salmon */}
            <div className="sticky top-[244px] lg:top-[264px] z-40">
              <div
                className="relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                style={{
                  backgroundColor: "#F87171",
                  clipPath: "polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)",
                }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-[40px] h-[40px] border-r border-b border-white/20" />
                <div className="absolute bottom-0 right-0 w-[40px] h-[40px] border-t border-l border-white/20" />
                {/* Inner border effect */}
                <div className="absolute inset-[1px] border border-white/10 pointer-events-none" style={{ clipPath: "polygon(39px 0, 100% 0, 100% calc(100% - 39px), calc(100% - 39px) 100%, 0 100%, 0 39px)" }} />
                {/* Header */}
                <div className="flex items-center gap-4 px-6 lg:px-8 h-[56px] border-b border-white/10">
                  <span
                    className="text-[11px] font-mono tracking-wider"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    04
                  </span>
                  <h3
                    className="text-[16px] sm:text-[20px] lg:text-[24px] font-semibold tracking-tight"
                    style={{
                      color: "#FFFFFF",
                      fontFamily: "Inter, -apple-system, sans-serif",
                      fontStyle: "italic",
                    }}
                  >
                    GLOBAL COMMUNITY
                  </h3>
                </div>
                {/* Content */}
                <div className="px-6 lg:px-8 pb-10 pt-6 min-h-[280px]">
                  <p
                    className="text-[14px] lg:text-[15px] leading-[1.7] max-w-[520px]"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    Avacado is more than just a privacy protocol. It's a global community of builders, creators, and collaborators, all together on a mission to bring financial privacy to Web3. An open ecosystem where knowledge and resources are shared freely.
                  </p>
                </div>
                {/* Decorative element */}
                <div className="absolute bottom-4 right-4 flex gap-1">
                  <div className="w-2 h-2 bg-white/20 rounded-full" />
                  <div className="w-2 h-2 bg-white/30 rounded-full" />
                  <div className="w-2 h-2 bg-white/40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Powered by section */}
        <section
          className="mx-auto mt-20 max-w-[1080px] px-4 md:px-6 lg:px-8"
          aria-labelledby="powered-by-title"
        >
          <div className="flex items-center justify-center">
            <span
              id="powered-by-title"
              className="text-xs font-semibold uppercase"
              style={{
                fontFamily: "JetBrains Mono, Monaco, 'Courier New', monospace",
                letterSpacing: "0.4em",
                color: "#FF8A8A",
              }}
            >
              BUILT ON
            </span>
          </div>
          <div className="relative mt-8">
            <div className="grid grid-cols-1 overflow-hidden rounded-[4px] border border-black/15 bg-[#F5F5F5]">
              <div className="flex h-24 items-center justify-center border-r border-black/15 bg-[#F0F0F0] md:h-36">
                <Image
                  src="/avax.png"
                  alt="Avalanche logo"
                  width={160}
                  height={80}
                  className="h-8 w-auto object-contain md:h-10"
                  style={{
                    filter: "grayscale(1) brightness(1.1)",
                    opacity: 0.75,
                  }}
                />
              </div>
              {/*
              <div className="flex h-24 items-center justify-center border-r border-black/15 bg-[#F0F0F0] md:h-36">
                <Image
                  src="/1inch.png"
                  alt="1inch logo"
                  width={160}
                  height={80}
                  className="h-10 w-auto object-contain md:h-12"
                  style={{
                    filter: "grayscale(1) brightness(1.1)",
                    opacity: 0.75,
                  }}
                />
              </div>
              */}
              {/*
              <div className="flex h-24 items-center justify-center bg-[#F0F0F0] md:h-36">
                <Image
                  src="/self.png"
                  alt="Self logo"
                  width={160}
                  height={80}
                  className="h-10 w-auto object-contain md:h-12"
                  style={{
                    filter: "grayscale(1) brightness(1.1)",
                    opacity: 0.75,
                  }}
                />
              </div>
              */}
            </div>
          </div>
        </section>

        <section
          id="waitlist"
          className="mt-24 px-6 pb-24 md:px-10"
          aria-labelledby="waitlist-title"
        >
          <div className="mx-auto flex w-full max-w-[980px] flex-col items-center gap-10 md:flex-row md:items-center md:justify-center">
            {/* Form - slide from left */}
            <SlideIn direction="left" className="w-full md:w-1/2">
              <div className="h-full rounded-[12px] border border-black/10 bg-white/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                <div className="mb-6 text-left">
                  <h2
                    id="waitlist-title"
                    className="text-[28px] font-semibold tracking-tight text-[#1F1F1F]"
                    style={{
                      fontFamily:
                        "'Scto Grotesk A', Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    <TextReveal>Secure your spot for Avacado</TextReveal>
                    <div className="mt-6">
                      <WaitlistCounter />
                    </div>
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We'll reach out once the privacy wallet is ready.
                  </p>
                </div>
                <WaitlistForm />
              </div>
            </SlideIn>

            {/* Image - slide from right with parallax */}
            <Parallax speed={0.15} className="flex w-full justify-center md:w-1/2">
              <FadeInScale delay={0.2}>
                <Image
                  src="/wait.png"
                  alt="Illustration of a person waiting to join the Avacado waitlist"
                  width={420}
                  height={420}
                  className="h-auto w-full max-w-[360px] origin-center scale-115 object-contain opacity-95 drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-300 md:max-w-[420px] md:scale-160"
                  priority
                />
              </FadeInScale>
            </Parallax>
          </div>
        </section>

        <footer
          className="relative mt-32 overflow-hidden border-t border-black/10"
          aria-labelledby="footer-title"
          style={{
            backgroundColor: "#ECECEC",
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <div
              className="absolute left-1/2 top-12 h-[260px] w-[260px] -translate-x-1/2 rounded-full md:h-[360px] md:w-[360px] lg:h-[420px] lg:w-[420px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,107,107,0.18) 0%, rgba(255,107,107,0) 65%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black/10" />
            <div className="absolute inset-x-0 top-0 h-[1px] bg-black/10" />
          </div>

          <div className="relative z-[1] mx-auto max-w-[1200px] px-6 py-12 md:py-16 lg:px-16 lg:py-24">
            <div className="grid gap-10 md:gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
              <div>
                <SlideIn direction="up" delay={0}>
                  <p
                    className="mb-6 text-[10px] uppercase md:text-xs"
                    style={{
                      color: "#FF6B6B",
                      fontFamily:
                        "JetBrains Mono, Monaco, 'Courier New', monospace",
                      letterSpacing: "0.4em",
                    }}
                  >
                    Privacy-first wallet
                  </p>
                </SlideIn>
                <SlideIn direction="up" delay={0.1}>
                  <h2
                    id="footer-title"
                    style={{
                      fontFamily:
                        "'Scto Grotesk A', Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                      fontSize: "clamp(64px, 18vw, 200px)",
                      fontWeight: 700,
                      lineHeight: 0.88,
                      letterSpacing: "-0.08em",
                      textTransform: "uppercase",
                      color: "#FF6B6B",
                      textShadow: "0 24px 60px rgba(255, 107, 107, 0.35)",
                    }}
                  >
                    Avacado
                  </h2>
                </SlideIn>
                <SlideIn direction="up" delay={0.2}>
                  <p
                    className="mt-6 max-w-[560px] text-xs leading-relaxed md:text-sm"
                    style={{
                      color: "#555555",
                      fontFamily:
                        "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    Built for teams that expect complete privacy, zero-knowledge
                    compliance, and lightning-fast execution across chains.
                  </p>
                </SlideIn>
              </div>

              {/* <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
                <div className="space-y-3 sm:space-y-4">
                  <h3
                    className="text-[11px] font-semibold uppercase md:text-xs"
                    style={{
                      fontFamily: "JetBrains Mono, Monaco, 'Courier New', monospace",
                      color: "#8A8A8A",
                      letterSpacing: "0.25em",
                    }}
                  >
                    Product
                  </h3>
                  <ul
                    className="space-y-1 text-xs md:space-y-2 md:text-sm"
                    style={{
                      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                      color: "#1F1F1F",
                    }}
                  >
                    <li>Waitlist</li>
                    <li>Security Playbook</li>
                    <li>Docs &amp; SDK</li>
                    <li>Roadmap</li>
                  </ul>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <h3
                    className="text-[11px] font-semibold uppercase md:text-xs"
                    style={{
                      fontFamily: "JetBrains Mono, Monaco, 'Courier New', monospace",
                      color: "#8A8A8A",
                      letterSpacing: "0.25em",
                    }}
                  >
                    Company
                  </h3>
                  <ul
                    className="space-y-1 text-xs md:space-y-2 md:text-sm"
                    style={{
                      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                      color: "#1F1F1F",
                    }}
                  >
                    <li>About</li>
                    <li>Careers</li>
                    <li>Press Kit</li>
                    <li>Legal</li>
                  </ul>
                </div>
              </div> */}
            </div>

            <div className="mt-12 flex flex-col gap-4 border-t border-black/10 pt-6 text-[10px] md:mt-16 md:flex-row md:items-center md:justify-between md:text-xs">
              <p
                className="uppercase"
                style={{
                  fontFamily:
                    "JetBrains Mono, Monaco, 'Courier New', monospace",
                  color: "#7A7A7A",
                  letterSpacing: "0.32em",
                }}
              >
                © {currentYear} avacado.app. All rights reserved.
              </p>
              <div
                className="flex flex-wrap items-center gap-3 uppercase md:gap-6"
                style={{
                  fontFamily:
                    "JetBrains Mono, Monaco, 'Courier New', monospace",
                  color: "#7A7A7A",
                  letterSpacing: "0.28em",
                }}
              >
                <a
                  href="mailto:arkoroy302@gmail.com"
                  className="transition-opacity hover:opacity-70"
                >
                  Contact
                </a>
                <span
                  className="hidden h-[1px] w-12 bg-black/15 md:block"
                  aria-hidden="true"
                />
                <a
                  href="#waitlist"
                  className="transition-opacity hover:opacity-70"
                >
                  Join Waitlist
                </a>
                <span
                  className="hidden h-[1px] w-12 bg-black/15 md:block"
                  aria-hidden="true"
                />
                <a href="/" className="transition-opacity hover:opacity-70">
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
