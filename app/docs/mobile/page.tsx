"use client";

import { useState, useEffect } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { ScrollProgressLine } from "@/components/scroll-animations";
import { ChevronRight, Shield, Lock, Eye, Users, Clock, Layers } from "lucide-react";

export default function MobileDocsPage() {
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

  const [activeSection, setActiveSection] = useState<string>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Desktop detection and redirect
  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window !== 'undefined' && window.innerWidth > 768) {
        window.location.href = '/docs';
      }
    };

    // Check on mount
    checkScreenSize();

    // Check on resize
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Scroll spy effect
  useEffect(() => {
    const sections = [
      "overview",
      "goal",
      "eerc",
      "features",
      "batching",
      "nullifiers",
      "auditor",
      "withdrawal",
      "progress",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -60% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "goal", label: "Our Goal", icon: Shield },
    { id: "eerc", label: "EERC System", icon: Lock },
    { id: "features", label: "Key Features", icon: Layers },
    { id: "batching", label: "Batching", icon: Users },
    { id: "nullifiers", label: "Nullifiers", icon: Shield },
    { id: "auditor", label: "Auditor System", icon: Eye },
    { id: "withdrawal", label: "Two-Phase Withdrawal", icon: Clock },
    { id: "progress", label: "Development Roadmap", icon: ChevronRight },
  ];

  return (
    <>
      <ScrollProgressLine />
      <Navbar />
      <main
        className="min-h-screen overflow-x-hidden pt-16"
        style={{
          backgroundColor: "#ECECEC",
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      >
        {/* Header */}
        <section className="border-b border-black/10 pt-8 pb-16">
          <div className="mx-auto max-w-[95vw] px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-4">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF6B6B]"
                >
                  [ DOCUMENTATION ]
                </span>
              </div>
              <h1
                className="text-[32px] sm:text-[40px] font-bold tracking-[-0.04em] text-[#1F1F1F] leading-[1.1] mb-6"
                style={{
                  fontFamily: "'Scto Grotesk A', Inter, -apple-system, sans-serif",
                }}
              >
                Avocado Protocol
              </h1>
              <p className="text-[16px] text-[#3A3A3A] leading-relaxed">
                Our vision for a privacy-preserving token system that will balance user confidentiality with regulatory compliance through zero-knowledge proofs and auditor oversight.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-[2px] bg-[#FFF5E1] border border-[#FF6B6B]/20">
                <span className="text-[12px] font-mono text-[#FF6B6B]">⚠</span>
                <span className="text-[13px] text-[#3A3A3A]">
                  Conceptual Design — Not yet implemented.
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Slide-out Navigation Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Slide-out Menu */}
            <div className="fixed top-16 left-0 bottom-0 w-[min(280px,80vw)] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out">
              <div className="p-6 pt-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[18px] font-semibold text-[#1F1F1F]">Contents</h3>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-[#3A3A3A] hover:bg-black/5 rounded-[2px]"
                  >
                    ✕
                  </button>
                </div>
                <nav className="space-y-1">
                  {navigationItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        setTimeout(() => {
                          const element = document.getElementById(item.id);
                          if (element) {
                            const offset = 120;
                            const bodyRect = document.body.getBoundingClientRect().top;
                            const elementRect = element.getBoundingClientRect().top;
                            const elementPosition = elementRect - bodyRect;
                            const offsetPosition = elementPosition - offset;
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                        }, 300);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 text-[14px] rounded-[2px] transition-all cursor-pointer ${
                        activeSection === item.id
                          ? "bg-[#FF6B6B] text-white"
                          : "text-[#3A3A3A] hover:bg-black/5"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </>
        )}

        {/* Floating Contents Button - Bottom Left */}
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-14 h-14 bg-[#FF6B6B] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#FF5555] transition-colors"
          >
            <Layers className="w-6 h-6" />
          </button>
        </div>

        {/* Main Content */}
        <section className="py-8">
          <div className="mx-auto max-w-[95vw] px-6">
            <div className="prose prose-neutral max-w-none overflow-x-hidden">
              
              {/* Overview */}
              <div id="overview" className="mb-16 scroll-mt-24">
                <h2 className="text-[24px] font-bold text-[#1F1F1F] mb-6 pb-4 border-b border-black/10">Overview</h2>
                <p className="text-[16px] text-[#3A3A3A] leading-relaxed mb-6">
                  Avocado is a proposed privacy-preserving token system to be built on encrypted ERC (EERC) technology. 
                  The system will enable private transactions while maintaining regulatory compliance through an innovative auditor system.
                </p>
                <div className="p-5 bg-[#FFF5E1] border border-[#FF6B6B]/20 rounded-[2px]">
                  <h4 className="text-[14px] font-semibold mb-3 text-[#1F1F1F]">Project Status</h4>
                  <p className="text-[14px] mb-2 text-[#3A3A3A]"><strong>Current Stage:</strong> Conceptual Design & Planning</p>
                  <p className="text-[14px] text-[#3A3A3A]">
                    This documentation presents our vision and technical approach. Implementation is planned for future development.
                  </p>
                </div>
              </div>

              {/* Our Goal */}
              <div id="goal" className="mb-16 scroll-mt-24">
                <h2 className="text-[24px] font-bold text-[#1F1F1F] mb-6 pb-4 border-b border-black/10">Our Goal</h2>
                <p className="text-[16px] text-[#3A3A3A] leading-relaxed">
                  We operate on the principle that <strong>privacy does not equate to secrecy</strong>. 
                  Our objective is to empower users with control over their financial data while facilitating legitimate oversight.
                </p>
              </div>

              {/* EERC System */}
              <div id="eerc" className="mb-16 scroll-mt-24">
                <h2 className="text-[24px] font-bold text-[#1F1F1F] mb-6 pb-4 border-b border-black/10">The Encrypted ERC (EERC) System</h2>
                <p className="text-[16px] text-[#3A3A3A] leading-relaxed mb-6">
                  Our proposed EERC system will preserve privacy in token transactions by encrypting balances on-chain using elliptic curve encryption. 
                  Users will be able to demonstrate sufficient balance through zero-knowledge proofs without disclosing exact amounts.
                </p>
                
                <h3 className="text-[18px] font-semibold text-[#1F1F1F] mb-3">Existing System Limitations</h3>
                <p className="text-[16px] text-[#3A3A3A] leading-relaxed mb-6">
                  While existing EERC implementations support private transfers between registered users, deposit and withdrawal 
                  amounts remain visible on-chain.
                </p>

                <h3 className="text-[18px] font-semibold text-[#1F1F1F] mb-3">Our Proposed Enhancement</h3>
                <p className="text-[16px] text-[#3A3A3A] leading-relaxed mb-4">
                  Our comprehensive implementation will achieve end-to-end transaction privacy, ensuring that no amounts 
                  are visible at any stage, including during transfers and withdrawals.
                </p>

                <p className="text-[16px] text-[#3A3A3A] leading-relaxed">
                  For compliance purposes, authorized auditors will be able to decrypt balances using their private key, ensuring 
                  regulatory requirements are met without compromising user privacy.
                </p>
              </div>

              {/* Key Features */}
              <div id="features" className="mb-16 scroll-mt-24">
                <h2 className="text-[24px] font-bold text-[#1F1F1F] mb-6 pb-4 border-b border-black/10">Proposed Key Features</h2>
                
                <div className="space-y-6">
                  <div className="p-6 bg-white border border-black/10 rounded-[2px]">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#FF6B6B]/10 rounded-[2px] flex items-center justify-center text-[#FF6B6B]">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[18px] font-semibold text-[#1F1F1F] mb-2">Private Withdrawals</h3>
                        <p className="text-[15px] text-[#3A3A3A]">
                          Our system will enable private withdrawals to any external address outside the EERC ecosystem, 
                          effectively decoupling encrypted balances from their final destinations. Unlike traditional 
                          privacy systems confined to their own ecosystems, our solution will facilitate private off-ramping.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white border border-black/10 rounded-[2px]">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#FF6B6B]/10 rounded-[2px] flex items-center justify-center text-[#FF6B6B]">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[18px] font-semibold text-[#1F1F1F] mb-2">Unified Entry Point</h3>
                        <p className="text-[15px] text-[#3A3A3A]">
                          A unified entry point will obfuscate user intent on-chain. All operations will be channeled through a 
                          single function that intelligently routes to the appropriate handler based on encrypted intent data, 
                          preventing observers from discerning the specific operation performed by a user.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white border border-black/10 rounded-[2px]">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#FF6B6B]/10 rounded-[2px] flex items-center justify-center text-[#FF6B6B]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[18px] font-semibold text-[#1F1F1F] mb-2">Two-Phase System</h3>
                        <p className="text-[15px] text-[#3A3A3A]">
                          Withdrawals will be processed via a two-phase system: intent submission (Phase 1) followed by execution 
                          after a delay (Phase 2). This 24-hour delay will mitigate front-running and allow for batch execution, 
                          where multiple users' withdrawals are processed collectively, enhancing privacy through anonymity sets.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Batching */}
              <div id="batching" className="mb-16 scroll-mt-24">
                <h2 className="text-[24px] font-bold text-[#1F1F1F] mb-6 pb-4 border-b border-black/10">Batching for Enhanced Privacy</h2>
                <p className="text-[16px] text-[#3A3A3A] leading-relaxed mb-6">
                  Our system will aggregate and execute multiple withdrawal intents in a single batch transaction. 
                  Batching will enhance privacy by creating anonymity sets.
                </p>

                <div className="p-5 bg-[#FFF5E1] border border-[#FF6B6B]/20 rounded-[2px] mb-6">
                  <h4 className="text-[14px] font-semibold mb-3 text-[#1F1F1F]">Example</h4>
                  <p className="text-[14px] text-[#3A3A3A]">
                    With 50 intents in a single batch, the linkability between any individual withdrawal and its origin 
                    is significantly minimized. Observers can see the withdrawals but cannot determine which user initiated which transaction.
                  </p>
                </div>

                <h3 className="text-[18px] font-semibold text-[#1F1F1F] mb-4">Expected Benefits</h3>
                <ul className="space-y-2 text-[16px] text-[#3A3A3A]">
                  <li>
                    <strong>Enhanced Privacy:</strong> The 24-hour delay will naturally facilitate the accumulation of intents from multiple users
                  </li>
                  <li>
                    <strong>Cost Efficiency:</strong> Batch execution will reduce gas costs per withdrawal
                  </li>
                  <li>
                    <strong>Anonymity Sets:</strong> More participants = stronger privacy guarantees for all
                  </li>
                </ul>
              </div>

              {/* Nullifiers */}
              <div id="nullifiers" className="mb-16 scroll-mt-24">
                <h2 className="text-[24px] font-bold text-[#1F1F1F] mb-6 pb-4 border-b border-black/10">Proposed Advanced Nullifier System</h2>
                <p className="text-[16px] text-[#3A3A3A] leading-relaxed mb-8">
                  We plan to implement an advanced nullifier system that will prove commitment ownership without 
                  exposing critical details, all while maintaining auditor oversight.
                </p>

                <div className="space-y-6">
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white font-mono text-[14px] font-semibold">
                      1
                    </div>
                    <h4 className="text-[18px] font-semibold text-[#1F1F1F] mb-3">Phase 1: Commitment</h4>
                    <div className="space-y-4 text-[15px] text-[#3A3A3A]">
                      <p>
                        A user generates a random secret and creates a commitment, which is a hash of the amount, 
                        destination, tokenId, nonce, and secret. This commitment, along with encrypted audit data, is submitted.
                      </p>
                      <pre className="p-4 bg-[#1F1F1F] text-[#E0E0E0] rounded-[2px] overflow-x-auto font-mono text-[13px]">
                        <code>commitment = hash(amount, destination, tokenId, nonce, secret)</code>
                      </pre>
                      <p className="text-[14px]">
                        The encrypted audit data allows auditors to decrypt the user's secret and associated amount.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white font-mono text-[14px] font-semibold">
                      2
                    </div>
                    <h4 className="text-[18px] font-semibold text-[#1F1F1F] mb-3">Phase 2: Nullifier Reveal</h4>
                    <div className="space-y-4 text-[15px] text-[#3A3A3A]">
                      <p>
                        After 24 hours, the user reveals the nullifier (a hash of the commitment and secret), 
                        along with the amount and destination, supported by a zero-knowledge proof.
                      </p>
                      <pre className="p-4 bg-[#1F1F1F] text-[#E0E0E0] rounded-[2px] overflow-x-auto font-mono text-[13px]">
                        <code>nullifier = hash(commitment, secret)</code>
                      </pre>
                      <p className="text-[14px]">
                        The public cannot link the nullifier back to the original commitment without the secret.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-[18px] font-semibold text-[#1F1F1F] mt-12 mb-4">Privacy Guarantees</h3>
                
                <div className="grid gap-4 mt-6">
                  <div className="p-5 bg-white border border-black/10 rounded-[2px]">
                    <h4 className="text-[16px] font-semibold text-[#FF6B6B] mb-2">Privacy</h4>
                    <p className="text-[14px] text-[#3A3A3A]">The public observes unlinked commitments and nullifiers (e.g., 50 within a batch). Auditors can decrypt both phases to link all relevant information (user → commitment → nullifier → amount).</p>
                  </div>
                  <div className="p-5 bg-white border border-black/10 rounded-[2px]">
                    <h4 className="text-[16px] font-semibold text-[#FF6B6B] mb-2">Security</h4>
                    <p className="text-[14px] text-[#3A3A3A]">Zero-knowledge proofs prevent fraudulent claims. A nullifier registry prevents double-spending, and the secret serves as a salt, privacy key, and proof of ownership.</p>
                  </div>
                  <div className="p-5 bg-white border border-black/10 rounded-[2px]">
                    <h4 className="text-[16px] font-semibold text-[#FF6B6B] mb-2">Result</h4>
                    <p className="text-[14px] text-[#3A3A3A]">This system delivers privacy for the public and compliance capabilities for auditors, offering an optimal balance.</p>
                  </div>
                </div>
              </div>

              {/* Auditor System */}
              <div id="auditor" className="mb-16 scroll-mt-24">
                <h2 className="text-[24px] font-bold text-[#1F1F1F] mb-6 pb-4 border-b border-black/10">Proposed Auditor System</h2>
                <p className="text-[16px] text-[#3A3A3A] leading-relaxed mb-6">
                  In our design, auditors will possess the capability to decrypt all encrypted balance data and audit trails using their 
                  private key. This will ensure full compliance with regulatory requirements while preserving privacy from 
                  public observation.
                </p>

                <h3 className="text-[18px] font-semibold text-[#1F1F1F] mb-4">Planned Enhancement</h3>
                <div className="p-5 bg-[#FFF5E1] border border-[#FF6B6B]/20 rounded-[2px] mb-6">
                  <h4 className="text-[14px] font-semibold mb-3 text-[#1F1F1F]">7-of-9 Threshold Encryption</h4>
                  <p className="text-[14px] text-[#3A3A3A]">
                    Our design includes a 7-of-9 threshold encryption scheme, which will require the cooperation 
                    of seven out of nine auditors for decryption. This will prevent any single entity from having 
                    unilateral access to user data.
                  </p>
                </div>

                <h3 className="text-[18px] font-semibold text-[#1F1F1F] mb-4">DEX Compliance Vision</h3>
                <p className="text-[16px] text-[#3A3A3A] leading-relaxed">
                  This system will assist users in avoiding DEX blocking, where decentralized exchanges may freeze funds 
                  from privacy protocols based on transaction history. Our auditor system will be able to verify the legitimacy 
                  of funds and ensure regulatory compliance.
                </p>
              </div>

              {/* Two-Phase Withdrawal */}
              <div id="withdrawal" className="mb-16 scroll-mt-24">
                <h2 className="text-[24px] font-bold text-[#1F1F1F] mb-6 pb-4 border-b border-black/10">Proposed Two-Phase Private Withdrawal System</h2>
                <p className="text-[16px] text-[#3A3A3A] leading-relaxed mb-8">
                  The two-phase withdrawal system will be the cornerstone of Avocado's privacy guarantees. 
                  It will separate intent from execution, creating anonymity sets through batching.
                </p>

                <div className="space-y-6">
                  <div className="border-2 border-[#FF6B6B] rounded-[2px] overflow-hidden">
                    <div className="px-6 py-4 bg-[#FF6B6B]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-mono text-[16px] font-bold text-[#FF6B6B]">
                          1
                        </div>
                        <h3 className="text-[20px] font-semibold text-white">Submit Intent (Private)</h3>
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <p className="mb-4 text-[16px] text-[#3A3A3A]">Function call:</p>
                      <pre className="p-4 bg-[#1F1F1F] text-[#E0E0E0] rounded-[2px] overflow-x-auto font-mono text-[13px] mb-6">
                        <code>submitWithdrawIntent(tokenId, proof, balancePCT, metadata)</code>
                      </pre>
                      
                      <div className="space-y-4">
                        <div>
                          <strong className="text-[14px]">Creates:</strong>
                          <pre className="p-4 bg-[#1F1F1F] text-[#E0E0E0] rounded-[2px] overflow-x-auto font-mono text-[13px] mt-2">
                            <code>intentHash = poseidon(amount, destination, tokenId, nonce)</code>
                          </pre>
                        </div>
                        <div>
                          <strong className="text-[14px]">Stores:</strong>
                          <p className="text-[14px] mt-1 text-[#3A3A3A]">Only the hash (not the actual values)</p>
                        </div>
                        <div>
                          <strong className="text-[14px]">Privacy:</strong>
                          <p className="text-[14px] mt-1 text-[#3A3A3A]">Amount and destination are concealed within the hash</p>
                        </div>
                      </div>

                      <div className="p-5 bg-white border border-black/10 rounded-[2px] mt-6">
                        <h4 className="text-[14px] font-semibold mb-3 text-[#1F1F1F]">On-Chain Public Data</h4>
                        <ul className="text-[13px] space-y-1 text-[#3A3A3A]">
                          <li>• Your address</li>
                          <li>• Intent hash (cryptographic commitment)</li>
                          <li>• Encrypted balance</li>
                          <li>• ZK proof (~764 bytes)</li>
                        </ul>
                      </div>

                      <div className="p-5 bg-[#FFF5E1] border border-[#FF6B6B]/20 rounded-[2px] mt-4">
                        <h4 className="text-[14px] font-semibold mb-3 text-[#1F1F1F]">Private Data</h4>
                        <ul className="text-[13px] space-y-1 text-[#3A3A3A]">
                          <li>• Withdrawal amount</li>
                          <li>• Destination address</li>
                          <li>• Nonce</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-[#4CAF50] rounded-[2px] overflow-hidden">
                    <div className="px-6 py-4 bg-[#4CAF50]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-mono text-[16px] font-bold text-[#4CAF50]">
                          2
                        </div>
                        <h3 className="text-[20px] font-semibold text-white">Execute Intent (After 24h)</h3>
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <p className="mb-4 text-[16px] text-[#3A3A3A]">Two execution options:</p>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-[16px] font-semibold mb-3">Option A: Individual Execution</h4>
                          <pre className="p-4 bg-[#1F1F1F] text-[#E0E0E0] rounded-[2px] overflow-x-auto font-mono text-[13px]">
                            <code>executeWithdrawIntent(intentHash, tokenId, destination, amount, ...)</code>
                          </pre>
                          <div className="mt-3 space-y-2">
                            <p className="text-[14px]"><strong>Privacy:</strong> Low</p>
                            <p className="text-[14px]"><strong>Visibility:</strong> Everyone sees the direct link: YOU → AMOUNT → DESTINATION</p>
                          </div>
                        </div>

                        <div className="p-4 bg-[#E8F5E9] border border-[#4CAF50]/30 rounded-[2px]">
                          <h4 className="text-[16px] font-semibold mb-3 text-[#2E7D32]">Option B: Batch Execution (Recommended)</h4>
                          <pre className="p-4 bg-[#1F1F1F] text-[#E0E0E0] rounded-[2px] overflow-x-auto font-mono text-[13px]">
                            <code>executeBatchWithdrawIntents([50 intents])</code>
                          </pre>
                          <div className="mt-3 space-y-2">
                            <p className="text-[14px]"><strong>Privacy:</strong> High</p>
                            <p className="text-[14px]"><strong>Visibility:</strong> Everyone sees 50 withdrawals but cannot link specific users to specific destinations</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-[18px] font-semibold text-[#1F1F1F] mt-12 mb-6">How Privacy is Achieved</h3>
                
                <div className="space-y-6">
                  <div className="p-6 bg-white border border-black/10 rounded-[2px]">
                    <h4 className="text-[16px] font-semibold text-[#1F1F1F] mb-4">Phase 1: Submission (Today)</h4>
                    <div className="space-y-2 font-mono text-[13px] text-[#3A3A3A]">
                      <div>User1 → intentHash: <code>0x****...****</code> ❓</div>
                      <div>User2 → intentHash: <code>0x****...****</code> ❓</div>
                      <div>User3 → intentHash: <code>0x****...****</code> ❓</div>
                    </div>
                    <div className="mt-4 space-y-2 text-[14px] text-[#3A3A3A]">
                      <p><strong>Observer knows:</strong> Three users submitted intents</p>
                      <p><strong>Observer doesn't know:</strong> The amounts or destinations</p>
                    </div>
                  </div>

                  <div className="p-6 bg-white border border-black/10 rounded-[2px]">
                    <h4 className="text-[16px] font-semibold text-[#1F1F1F] mb-4">Phase 2: Batch Execution (After 24h)</h4>
                    <div className="space-y-2 font-mono text-[13px] text-[#3A3A3A]">
                      <div>1000 tokens → 0xAlice****</div>
                      <div>500 tokens → 0xBob****</div>
                      <div>2000 tokens → 0xCarol****</div>
                    </div>
                    <div className="mt-4 space-y-2 text-[14px] text-[#3A3A3A]">
                      <p><strong>Observer knows:</strong> The amounts and destinations</p>
                      <p><strong>Observer doesn't know:</strong> Which user submitted which withdrawal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Development Roadmap */}
              <div id="progress" className="mb-16 scroll-mt-24">
                <h2 className="text-[24px] font-bold text-[#1F1F1F] mb-6 pb-4 border-b border-black/10">Development Roadmap</h2>
                <h3 className="text-[18px] font-semibold text-[#1F1F1F] mb-6">Our Vision</h3>
                <p className="text-[16px] text-[#3A3A3A] leading-relaxed mb-6">
                  We're building a comprehensive privacy solution from the ground up. Our roadmap includes:
                </p>

                <h3 className="text-[18px] font-semibold text-[#1F1F1F] mt-12 mb-6">Planned Core Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-[#FFB74D] text-white">
                      ○
                    </span>
                    <span className="text-[15px] text-[#3A3A3A]">Two-phase withdrawal system with intent submission and batch execution</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-[#FFB74D] text-white">
                      ○
                    </span>
                    <span className="text-[15px] text-[#3A3A3A]">Unified entry point for obfuscated user operations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-[#FFB74D] text-white">
                      ○
                    </span>
                    <span className="text-[15px] text-[#3A3A3A]">Full EERC integration with encrypted on-chain balances</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-[#FFB74D] text-white">
                      ○
                    </span>
                    <span className="text-[15px] text-[#3A3A3A]">Zero-knowledge proof system for balance verification</span>
                  </li>
                </ul>

                <h3 className="text-[18px] font-semibold text-[#1F1F1F] mt-12 mb-6">Advanced Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-[#FFB74D] text-white">
                      ○
                    </span>
                    <span className="text-[15px] text-[#3A3A3A]">Nullifier-based privacy system with commitment-nullifier separation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-[#FFB74D] text-white">
                      ○
                    </span>
                    <span className="text-[15px] text-[#3A3A3A]">7-of-9 threshold encryption for the auditor system</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-[#FFB74D] text-white">
                      ○
                    </span>
                    <span className="text-[15px] text-[#3A3A3A]">Zero-Knowledge circuits for proving commitment membership without revealing specifics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-[#FFB74D] text-white">
                      ○
                    </span>
                    <span className="text-[15px] text-[#3A3A3A]">Merkle tree integration for enhanced commitment storage security</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-[#FFB74D] text-white">
                      ○
                    </span>
                    <span className="text-[15px] text-[#3A3A3A]">SDK and developer tools for easy integration</span>
                  </li>
                </ul>

                <div className="p-5 bg-[#FFF5E1] border border-[#FF6B6B]/20 rounded-[2px] mt-8">
                  <h4 className="text-[14px] font-semibold mb-4 text-[#1F1F1F] text-center">Join Us</h4>
                  <p className="text-[14px] text-center mb-4 text-[#3A3A3A]">
                    We're actively building and would love your support. Be among the first to know when we launch.
                  </p>
                  <div className="text-center">
                    <a
                      href="/"
                      className="inline-flex h-10 items-center justify-center rounded-[2px] border px-6 text-sm font-semibold transition-colors bg-[#FF6B6B] border-[#FF6B6B] text-white hover:bg-transparent hover:text-[#FF6B6B]"
                    >
                      Join Waitlist →
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-16 p-6 bg-white border border-black/10 rounded-[2px]">
                <p className="text-[14px] text-[#666] text-center mb-3">
                  This documentation presents our conceptual design and vision for Avocado. 
                  Implementation is planned for future development, and all specifications are subject to change.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
