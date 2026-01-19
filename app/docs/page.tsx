"use client";

import { useState, useEffect } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { ScrollProgressLine } from "@/components/scroll-animations";
import { ChevronRight, Shield, Lock, Eye, Users, Clock, Layers } from "lucide-react";

export default function DocsPage() {
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
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
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
        {/* Header */}
        <section className="border-b border-black/10 pt-24 pb-16 lg:pt-32 lg:pb-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
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
                className="text-[48px] lg:text-[72px] font-bold tracking-[-0.04em] text-[#1F1F1F] leading-[1.1] mb-6"
                style={{
                  fontFamily: "'Scto Grotesk A', Inter, -apple-system, sans-serif",
                }}
              >
                Avocado Protocol
              </h1>
              <p className="text-[18px] lg:text-[20px] text-[#3A3A3A] max-w-[680px] leading-relaxed">
                Our vision for a privacy-preserving token system that will balance user confidentiality with regulatory compliance through zero-knowledge proofs and auditor oversight.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-[2px] bg-[#FFF5E1] border border-[#FF6B6B]/20">
                <span className="text-[12px] font-mono text-[#FF6B6B]">⚠</span>
                <span className="text-[13px] text-[#3A3A3A]">
                  Conceptual Design — Not yet implemented. This document outlines our vision and proposed architecture.
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
              {/* Sidebar Navigation - Desktop */}
              <aside className="hidden lg:block lg:sticky lg:top-32 lg:h-fit">
                <nav className="space-y-1">
                  {[
                    { id: "overview", label: "Overview", icon: Eye },
                    { id: "goal", label: "Our Goal", icon: Shield },
                    { id: "eerc", label: "EERC System", icon: Lock },
                    { id: "features", label: "Key Features", icon: Layers },
                    { id: "batching", label: "Batching", icon: Users },
                    { id: "nullifiers", label: "Nullifiers", icon: Shield },
                    { id: "auditor", label: "Auditor System", icon: Eye },
                    { id: "withdrawal", label: "Two-Phase Withdrawal", icon: Clock },
                    { id: "progress", label: "Development Roadmap", icon: ChevronRight },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`flex items-center gap-3 px-4 py-2.5 text-[14px] rounded-[2px] transition-all ${
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
              </aside>

              {/* Mobile Navigation Button */}
              <div className="lg:hidden fixed bottom-6 right-6 z-50">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-14 h-14 bg-[#FF6B6B] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#FF5555] transition-colors"
                >
                  <Layers className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Navigation Menu */}
              {mobileMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  
                  {/* Menu */}
                  <div className="lg:hidden fixed inset-y-0 right-0 w-80 bg-white z-50 shadow-2xl overflow-y-auto">
                    <div className="p-6">
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
                        {[
                          { id: "overview", label: "Overview", icon: Eye },
                          { id: "goal", label: "Our Goal", icon: Shield },
                          { id: "eerc", label: "EERC System", icon: Lock },
                          { id: "features", label: "Key Features", icon: Layers },
                          { id: "batching", label: "Batching", icon: Users },
                          { id: "nullifiers", label: "Nullifiers", icon: Shield },
                          { id: "auditor", label: "Auditor System", icon: Eye },
                          { id: "withdrawal", label: "Two-Phase Withdrawal", icon: Clock },
                          { id: "progress", label: "Development Roadmap", icon: ChevronRight },
                        ].map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 text-[14px] rounded-[2px] transition-all ${
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

              {/* Content */}
              <div className="prose prose-neutral max-w-none">
                {/* Overview */}
                <Section id="overview" title="Overview">
                  <p>
                    Avocado is a proposed privacy-preserving token system to be built on encrypted ERC (EERC) technology. 
                    The system will enable private transactions while maintaining regulatory compliance through an innovative auditor system.
                  </p>
                  <InfoBox title="Project Status" variant="highlight">
                    <p className="text-[14px] mb-2"><strong>Current Stage:</strong> Conceptual Design & Planning</p>
                    <p className="text-[14px]">
                      This documentation presents our vision and technical approach. Implementation is planned for future development.
                    </p>
                  </InfoBox>
                </Section>

                {/* Goal */}
                <Section id="goal" title="Our Goal">
                  <p>
                    We operate on the principle that <strong>privacy does not equate to secrecy</strong>. 
                    Our objective is to empower users with control over their financial data while facilitating legitimate oversight.
                  </p>
                </Section>

                {/* EERC System */}
                <Section id="eerc" title="The Encrypted ERC (EERC) System">
                  <p>
                    Our proposed EERC system will preserve privacy in token transactions by encrypting balances on-chain using elliptic curve encryption. 
                    Users will be able to demonstrate sufficient balance through zero-knowledge proofs without disclosing exact amounts.
                  </p>
                  
                  <h3 className="text-[20px] font-semibold text-[#1F1F1F] mt-8 mb-4">Existing System Limitations</h3>
                  <p>
                    While existing EERC implementations support private transfers between registered users, deposit and withdrawal 
                    amounts remain visible on-chain.
                  </p>

                  <h3 className="text-[20px] font-semibold text-[#1F1F1F] mt-8 mb-4">Our Proposed Enhancement</h3>
                  <p>
                    Our comprehensive implementation will achieve end-to-end transaction privacy, ensuring that no amounts 
                    are visible at any stage, including during transfers and withdrawals.
                  </p>

                  <p>
                    For compliance purposes, authorized auditors will be able to decrypt balances using their private key, ensuring 
                    regulatory requirements are met without compromising user privacy.
                  </p>
                </Section>

                {/* Key Features */}
                <Section id="features" title="Proposed Key Features">
                  <FeatureBlock
                    icon={<Lock className="w-5 h-5" />}
                    title="Private Withdrawals"
                  >
                    Our system will enable private withdrawals to any external address outside the EERC ecosystem, 
                    effectively decoupling encrypted balances from their final destinations. Unlike traditional 
                    privacy systems confined to their own ecosystems, our solution will facilitate private off-ramping.
                  </FeatureBlock>

                  <FeatureBlock
                    icon={<Shield className="w-5 h-5" />}
                    title="Unified Entry Point"
                  >
                    A unified entry point will obfuscate user intent on-chain. All operations will be channeled through a 
                    single function that intelligently routes to the appropriate handler based on encrypted intent data, 
                    preventing observers from discerning the specific operation performed by a user.
                  </FeatureBlock>

                  <FeatureBlock
                    icon={<Clock className="w-5 h-5" />}
                    title="Two-Phase System"
                  >
                    Withdrawals will be processed via a two-phase system: intent submission (Phase 1) followed by execution 
                    after a delay (Phase 2). This 24-hour delay will mitigate front-running and allow for batch execution, 
                    where multiple users' withdrawals are processed collectively, enhancing privacy through anonymity sets.
                  </FeatureBlock>
                </Section>

                {/* Batching */}
                <Section id="batching" title="Batching for Enhanced Privacy">
                  <p>
                    Our system will aggregate and execute multiple withdrawal intents in a single batch transaction. 
                    Batching will enhance privacy by creating anonymity sets.
                  </p>

                  <InfoBox title="Example" variant="highlight">
                    <p className="text-[14px]">
                      With 50 intents in a single batch, the linkability between any individual withdrawal and its origin 
                      is significantly minimized. Observers can see the withdrawals but cannot determine which user initiated which transaction.
                    </p>
                  </InfoBox>

                  <h3 className="text-[20px] font-semibold text-[#1F1F1F] mt-8 mb-4">Expected Benefits</h3>
                  <ul className="space-y-2">
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
                </Section>

                {/* Nullifiers */}
                <Section id="nullifiers" title="Proposed Advanced Nullifier System">
                  <p>
                    We plan to implement an advanced nullifier system that will prove commitment ownership without 
                    exposing critical details, all while maintaining auditor oversight.
                  </p>

                  <div className="mt-8 space-y-6">
                    <ProcessStep
                      step="1"
                      title="Phase 1: Commitment"
                    >
                      <p>
                        A user generates a random secret and creates a commitment, which is a hash of the amount, 
                        destination, tokenId, nonce, and secret. This commitment, along with encrypted audit data, is submitted.
                      </p>
                      <CodeBlock>
                        commitment = hash(amount, destination, tokenId, nonce, secret)
                      </CodeBlock>
                      <p className="text-[14px] mt-4">
                        The encrypted audit data allows auditors to decrypt the user's secret and associated amount.
                      </p>
                    </ProcessStep>

                    <ProcessStep
                      step="2"
                      title="Phase 2: Nullifier Reveal"
                    >
                      <p>
                        After 24 hours, the user reveals the nullifier (a hash of the commitment and secret), 
                        along with the amount and destination, supported by a zero-knowledge proof.
                      </p>
                      <CodeBlock>
                        nullifier = hash(commitment, secret)
                      </CodeBlock>
                      <p className="text-[14px] mt-4">
                        The public cannot link the nullifier back to the original commitment without the secret.
                      </p>
                    </ProcessStep>
                  </div>

                  <h3 className="text-[20px] font-semibold text-[#1F1F1F] mt-12 mb-4">Privacy Guarantees</h3>
                  
                  <div className="grid gap-4 mt-6">
                    <GuaranteeCard
                      title="Privacy"
                      description="The public observes unlinked commitments and nullifiers (e.g., 50 within a batch). Auditors can decrypt both phases to link all relevant information (user → commitment → nullifier → amount)."
                    />
                    <GuaranteeCard
                      title="Security"
                      description="Zero-knowledge proofs prevent fraudulent claims. A nullifier registry prevents double-spending, and the secret serves as a salt, privacy key, and proof of ownership."
                    />
                    <GuaranteeCard
                      title="Result"
                      description="This system delivers privacy for the public and compliance capabilities for auditors, offering an optimal balance."
                    />
                  </div>
                </Section>

                {/* Auditor System */}
                <Section id="auditor" title="Proposed Auditor System">
                  <p>
                    In our design, auditors will possess the capability to decrypt all encrypted balance data and audit trails using their 
                    private key. This will ensure full compliance with regulatory requirements while preserving privacy from 
                    public observation.
                  </p>

                  <h3 className="text-[20px] font-semibold text-[#1F1F1F] mt-8 mb-4">Planned Enhancement</h3>
                  <InfoBox title="7-of-9 Threshold Encryption" variant="highlight">
                    <p className="text-[14px]">
                      Our design includes a 7-of-9 threshold encryption scheme, which will require the cooperation 
                      of seven out of nine auditors for decryption. This will prevent any single entity from having 
                      unilateral access to user data.
                    </p>
                  </InfoBox>

                  <h3 className="text-[20px] font-semibold text-[#1F1F1F] mt-8 mb-4">DEX Compliance Vision</h3>
                  <p>
                    This system will assist users in avoiding DEX blocking, where decentralized exchanges may freeze funds 
                    from privacy protocols based on transaction history. Our auditor system will be able to verify the legitimacy 
                    of funds and ensure regulatory compliance.
                  </p>
                </Section>

                {/* Two-Phase Withdrawal */}
                <Section id="withdrawal" title="Proposed Two-Phase Private Withdrawal System">
                  <p>
                    The two-phase withdrawal system will be the cornerstone of Avocado's privacy guarantees. 
                    It will separate intent from execution, creating anonymity sets through batching.
                  </p>

                  <div className="mt-8 space-y-6">
                    <PhaseCard
                      phase="1"
                      title="Submit Intent (Private)"
                      color="#FF6B6B"
                    >
                      <p className="mb-4">Function call:</p>
                      <CodeBlock>
                        submitWithdrawIntent(tokenId, proof, balancePCT, metadata)
                      </CodeBlock>
                      
                      <div className="mt-6 space-y-3">
                        <div>
                          <strong className="text-[14px]">Creates:</strong>
                          <CodeBlock className="mt-2">
                            intentHash = poseidon(amount, destination, tokenId, nonce)
                          </CodeBlock>
                        </div>
                        <div>
                          <strong className="text-[14px]">Stores:</strong>
                          <p className="text-[14px] mt-1">Only the hash (not the actual values)</p>
                        </div>
                        <div>
                          <strong className="text-[14px]">Privacy:</strong>
                          <p className="text-[14px] mt-1">Amount and destination are concealed within the hash</p>
                        </div>
                      </div>

                      <InfoBox title="On-Chain Public Data" variant="neutral" className="mt-6">
                        <ul className="text-[13px] space-y-1">
                          <li>• Your address</li>
                          <li>• Intent hash (cryptographic commitment)</li>
                          <li>• Encrypted balance</li>
                          <li>• ZK proof (~764 bytes)</li>
                        </ul>
                      </InfoBox>

                      <InfoBox title="Private Data" variant="highlight" className="mt-4">
                        <ul className="text-[13px] space-y-1">
                          <li>• Withdrawal amount</li>
                          <li>• Destination address</li>
                          <li>• Nonce</li>
                        </ul>
                      </InfoBox>
                    </PhaseCard>

                    <PhaseCard
                      phase="2"
                      title="Execute Intent (After 24h)"
                      color="#4CAF50"
                    >
                      <p className="mb-4">Two execution options:</p>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-[16px] font-semibold mb-3">Option A: Individual Execution</h4>
                          <CodeBlock>
                            executeWithdrawIntent(intentHash, tokenId, destination, amount, ...)
                          </CodeBlock>
                          <div className="mt-3 space-y-2">
                            <p className="text-[14px]"><strong>Privacy:</strong> Low</p>
                            <p className="text-[14px]"><strong>Visibility:</strong> Everyone sees the direct link: YOU → AMOUNT → DESTINATION</p>
                          </div>
                        </div>

                        <div className="p-4 bg-[#E8F5E9] border border-[#4CAF50]/30 rounded-[2px]">
                          <h4 className="text-[16px] font-semibold mb-3 text-[#2E7D32]">Option B: Batch Execution (Recommended)</h4>
                          <CodeBlock>
                            executeBatchWithdrawIntents([50 intents])
                          </CodeBlock>
                          <div className="mt-3 space-y-2">
                            <p className="text-[14px]"><strong>Privacy:</strong> High</p>
                            <p className="text-[14px]"><strong>Visibility:</strong> Everyone sees 50 withdrawals but cannot link specific users to specific destinations</p>
                          </div>
                        </div>
                      </div>
                    </PhaseCard>
                  </div>

                  <h3 className="text-[20px] font-semibold text-[#1F1F1F] mt-12 mb-6">How Privacy is Achieved</h3>
                  
                  <div className="space-y-6">
                    <TimelineCard title="Phase 1: Submission (Today)">
                      <div className="space-y-2 font-mono text-[13px]">
                        <div>User1 → intentHash: <code>0x****...****</code> ❓</div>
                        <div>User2 → intentHash: <code>0x****...****</code> ❓</div>
                        <div>User3 → intentHash: <code>0x****...****</code> ❓</div>
                      </div>
                      <div className="mt-4 space-y-2 text-[14px]">
                        <p><strong>Observer knows:</strong> Three users submitted intents</p>
                        <p><strong>Observer doesn't know:</strong> The amounts or destinations</p>
                      </div>
                    </TimelineCard>

                    <TimelineCard title="Phase 2: Batch Execution (After 24h)">
                      <div className="space-y-2 font-mono text-[13px]">
                        <div>1000 tokens → 0xAlice****</div>
                        <div>500 tokens → 0xBob****</div>
                        <div>2000 tokens → 0xCarol****</div>
                      </div>
                      <div className="mt-4 space-y-2 text-[14px]">
                        <p><strong>Observer knows:</strong> The amounts and destinations</p>
                        <p><strong>Observer doesn't know:</strong> Which user submitted which withdrawal</p>
                      </div>
                    </TimelineCard>
                  </div>

                  <h3 className="text-[20px] font-semibold text-[#1F1F1F] mt-12 mb-6">Security Guarantees</h3>
                  
                  <div className="space-y-4">
                    <SecurityCard
                      number="1"
                      title="Immutable Commitment"
                    >
                      The contract verifies:
                      <CodeBlock className="my-3">
                        poseidon(amount, destination, salt, tokenId, nonce) == intentHash
                      </CodeBlock>
                      This ensures no one can execute the withdrawal with altered parameters; your withdrawal 
                      is cryptographically locked to your specified values.
                    </SecurityCard>

                    <SecurityCard
                      number="2"
                      title="Balance Protection"
                    >
                      Your balance is locked after intent submission. You cannot submit another intent until 
                      the current one is executed, preventing double-spending.
                    </SecurityCard>

                    <SecurityCard
                      number="3"
                      title="Time-Based Access"
                    >
                      <ul className="space-y-2 text-[14px] mt-2">
                        <li><strong>0-24h:</strong> Only you can execute the withdrawal</li>
                        <li><strong>24h+:</strong> A relayer can batch the withdrawal (recommended for privacy)</li>
                        <li><strong>7d+:</strong> The intent expires and requires resubmission</li>
                      </ul>
                    </SecurityCard>
                  </div>

                  <h3 className="text-[20px] font-semibold text-[#1F1F1F] mt-12 mb-6">Comparison with Traditional Systems</h3>
                  
                  <div className="grid lg:grid-cols-2 gap-6">
                    <ComparisonCard
                      title="Traditional Withdrawal"
                      variant="bad"
                    >
                      <CodeBlock>
                        withdraw(amount, destination);
                      </CodeBlock>
                      <p className="mt-4 text-[14px]">
                        <strong>Privacy:</strong> None. All transaction details are publicly visible.
                      </p>
                      <p className="mt-2 text-[14px]">
                        <strong>On-chain:</strong> User → Amount → Destination <strong>ALL PUBLIC</strong>
                      </p>
                    </ComparisonCard>

                    <ComparisonCard
                      title="Avocado Two-Phase System"
                      variant="good"
                    >
                      <div className="space-y-3">
                        <div>
                          <p className="text-[13px] font-semibold mb-1">Phase 1: Hide the details</p>
                          <CodeBlock>
                            submitWithdrawIntent(proof)
                          </CodeBlock>
                          <p className="text-[12px] mt-1">Only hash visible</p>
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold mb-1">Phase 2: Reveal in batch</p>
                          <CodeBlock>
                            executeBatch([many intents])
                          </CodeBlock>
                          <p className="text-[12px] mt-1">Cannot link user to withdrawal</p>
                        </div>
                      </div>
                    </ComparisonCard>
                  </div>
                </Section>

                {/* Development Roadmap */}
                <Section id="progress" title="Development Roadmap">
                  <h3 className="text-[20px] font-semibold text-[#1F1F1F] mb-6">Our Vision</h3>
                  <p className="mb-6">
                    We're building a comprehensive privacy solution from the ground up. Our roadmap includes:
                  </p>

                  <h3 className="text-[20px] font-semibold text-[#1F1F1F] mt-12 mb-6">Planned Core Features</h3>
                  <ul className="space-y-3">
                    <ProgressItem>
                      Two-phase withdrawal system with intent submission and batch execution
                    </ProgressItem>
                    <ProgressItem>
                      Unified entry point for obfuscated user operations
                    </ProgressItem>
                    <ProgressItem>
                      Full EERC integration with encrypted on-chain balances
                    </ProgressItem>
                    <ProgressItem>
                      Zero-knowledge proof system for balance verification
                    </ProgressItem>
                  </ul>

                  <h3 className="text-[20px] font-semibold text-[#1F1F1F] mt-12 mb-6">Advanced Features</h3>
                  <ul className="space-y-3">
                    <ProgressItem>
                      Nullifier-based privacy system with commitment-nullifier separation
                    </ProgressItem>
                    <ProgressItem>
                      7-of-9 threshold encryption for the auditor system
                    </ProgressItem>
                    <ProgressItem>
                      Zero-Knowledge circuits for proving commitment membership without revealing specifics
                    </ProgressItem>
                    <ProgressItem>
                      Merkle tree integration for enhanced commitment storage security
                    </ProgressItem>
                    <ProgressItem>
                      SDK and developer tools for easy integration
                    </ProgressItem>
                  </ul>

                  <InfoBox title="Join Us" variant="highlight" className="mt-8">
                    <p className="text-[14px] text-center mb-4">
                      We're actively building and would love your support. Be among the first to know when we launch.
                    </p>
                    <div className="text-center">
                      <a
                        href="/"
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
                  </InfoBox>
                </Section>

                {/* Footer Note */}
                <div className="mt-16 p-6 bg-white border border-black/10 rounded-[2px]">
                  <p className="text-[14px] text-[#666] text-center mb-3">
                    This documentation presents our conceptual design and vision for Avocado. 
                    Implementation is planned for future development, and all specifications are subject to change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Helper Components
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <h2
        className="text-[32px] lg:text-[40px] font-bold tracking-[-0.03em] text-[#1F1F1F] mb-6 pb-4 border-b border-black/10"
        style={{
          fontFamily: "'Scto Grotesk A', Inter, -apple-system, sans-serif",
        }}
      >
        {title}
      </h2>
      <div className="space-y-6 text-[15px] lg:text-[16px] text-[#3A3A3A] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function InfoBox({ title, children, variant = "neutral", className = "" }: { 
  title: string; 
  children: React.ReactNode; 
  variant?: "neutral" | "highlight";
  className?: string;
}) {
  const styles = variant === "highlight" 
    ? "bg-[#FFF5E1] border-[#FF6B6B]/20" 
    : "bg-white border-black/10";
  
  return (
    <div className={`p-5 border rounded-[2px] ${styles} ${className}`}>
      <h4 className="text-[14px] font-semibold mb-3 text-[#1F1F1F]">{title}</h4>
      <div className="text-[#3A3A3A]">{children}</div>
    </div>
  );
}

function FeatureBlock({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 p-6 bg-white border border-black/10 rounded-[2px]">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-[#FF6B6B]/10 rounded-[2px] flex items-center justify-center text-[#FF6B6B]">
          {icon}
        </div>
        <div>
          <h3 className="text-[18px] font-semibold text-[#1F1F1F] mb-2">{title}</h3>
          <p className="text-[15px] text-[#3A3A3A]">{children}</p>
        </div>
      </div>
    </div>
  );
}

function ProcessStep({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <div className="relative pl-12">
      <div className="absolute left-0 top-0 w-8 h-8 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white font-mono text-[14px] font-semibold">
        {step}
      </div>
      <h4 className="text-[18px] font-semibold text-[#1F1F1F] mb-3">{title}</h4>
      <div className="space-y-4 text-[15px] text-[#3A3A3A]">{children}</div>
    </div>
  );
}

function CodeBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <pre className={`p-4 bg-[#1F1F1F] text-[#E0E0E0] rounded-[2px] overflow-x-auto font-mono text-[13px] ${className}`}>
      <code>{children}</code>
    </pre>
  );
}

function GuaranteeCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-5 bg-white border border-black/10 rounded-[2px]">
      <h4 className="text-[16px] font-semibold text-[#FF6B6B] mb-2">{title}</h4>
      <p className="text-[14px] text-[#3A3A3A]">{description}</p>
    </div>
  );
}

function PhaseCard({ phase, title, color, children }: { 
  phase: string; 
  title: string; 
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-2 rounded-[2px] overflow-hidden" style={{ borderColor: color }}>
      <div className="px-6 py-4" style={{ backgroundColor: color }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-mono text-[16px] font-bold" style={{ color }}>
            {phase}
          </div>
          <h3 className="text-[20px] font-semibold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-6 bg-white">
        {children}
      </div>
    </div>
  );
}

function TimelineCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 bg-white border border-black/10 rounded-[2px]">
      <h4 className="text-[16px] font-semibold text-[#1F1F1F] mb-4">{title}</h4>
      {children}
    </div>
  );
}

function SecurityCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 bg-white border border-black/10 rounded-[2px]">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-7 h-7 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white font-mono text-[13px] font-semibold">
          {number}
        </div>
        <div className="flex-1">
          <h4 className="text-[16px] font-semibold text-[#1F1F1F] mb-2">{title}</h4>
          <div className="text-[14px] text-[#3A3A3A]">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ComparisonCard({ title, variant, children }: { 
  title: string; 
  variant: "good" | "bad";
  children: React.ReactNode;
}) {
  const styles = variant === "good"
    ? "bg-[#E8F5E9] border-[#4CAF50]"
    : "bg-[#FFEBEE] border-[#F44336]";
  
  return (
    <div className={`p-5 border-2 rounded-[2px] ${styles}`}>
      <h4 className="text-[16px] font-semibold text-[#1F1F1F] mb-3">{title}</h4>
      {children}
    </div>
  );
}

function ProgressItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-[#FFB74D] text-white">
        ○
      </span>
      <span className="text-[15px] text-[#3A3A3A]">{children}</span>
    </li>
  );
}
