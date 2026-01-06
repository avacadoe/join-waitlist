"use client";

import { useState, useEffect } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { ScrollProgressLine } from "@/components/scroll-animations";
import { BookOpen, Calendar, Users, Zap } from "lucide-react";

export default function BlogPage() {
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

  return (
    <>
      <ScrollProgressLine />
      <Navbar />
      <main
        className="min-h-screen"
        style={{
          backgroundColor: "#ECECEC",
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      >
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-block mb-6">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF6B6B]"
                >
                  [ BLOG ]
                </span>
              </div>

              {/* Main Title */}
              <h1
                className="text-[64px] lg:text-[96px] font-bold tracking-[-0.04em] text-[#1F1F1F] leading-[1.1] mb-8"
                style={{
                  fontFamily: "'Scto Grotesk A', Inter, -apple-system, sans-serif",
                }}
              >
                Coming Soon
              </h1>

              {/* Description */}
              <p className="text-[18px] lg:text-[20px] text-[#3A3A3A] max-w-[680px] mx-auto leading-relaxed mb-12">
                We're crafting insightful content about privacy, blockchain technology, and the future of decentralized finance. 
                Stay tuned for deep dives into zero-knowledge proofs, regulatory compliance, and crypto privacy.
              </p>

              {/* Coming Soon Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto mt-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white border border-black/10 rounded-[2px] p-6 text-left"
                >
                  <div className="w-10 h-10 bg-[#FF6B6B]/10 rounded-[2px] flex items-center justify-center text-[#FF6B6B] mb-4">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#1F1F1F] mb-2">
                    Technical Guides
                  </h3>
                  <p className="text-[14px] text-[#3A3A3A] leading-relaxed">
                    In-depth tutorials on implementing privacy protocols and zero-knowledge proofs
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white border border-black/10 rounded-[2px] p-6 text-left"
                >
                  <div className="w-10 h-10 bg-[#FF6B6B]/10 rounded-[2px] flex items-center justify-center text-[#FF6B6B] mb-4">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#1F1F1F] mb-2">
                    Industry Updates
                  </h3>
                  <p className="text-[14px] text-[#3A3A3A] leading-relaxed">
                    Latest developments in crypto privacy, regulatory changes, and market insights
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white border border-black/10 rounded-[2px] p-6 text-left"
                >
                  <div className="w-10 h-10 bg-[#FF6B6B]/10 rounded-[2px] flex items-center justify-center text-[#FF6B6B] mb-4">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#1F1F1F] mb-2">
                    Product Updates
                  </h3>
                  <p className="text-[14px] text-[#3A3A3A] leading-relaxed">
                    Behind-the-scenes looks at Avocado development and feature announcements
                  </p>
                </motion.div>
              </div>

              {/* Call to Action */}
              <div className="mt-16 p-8 bg-[#FFF5E1] border border-[#FF6B6B]/20 rounded-[2px] max-w-[600px] mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-[#FF6B6B]" />
                  <h3 className="text-[18px] font-semibold text-[#1F1F1F]">
                    Be the First to Know
                  </h3>
                </div>
                <p className="text-[14px] text-[#3A3A3A] mb-6 leading-relaxed">
                  Join our waitlist to get notified when we publish our first blog posts. 
                  You'll also be among the first to access Avocado when it launches.
                </p>
                <a
                  href="/#waitlist"
                  className="inline-flex h-10 items-center justify-center rounded-[2px] border px-6 text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: "#FF6B6B",
                    borderColor: "#FF6B6B",
                    color: "#FFFFFF",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = "transparent";
                    el.style.color = "#FF6B6B";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = "#FF6B6B";
                    el.style.color = "#FFFFFF";
                  }}
                >
                  Join Waitlist →
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}