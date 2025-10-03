"use client"

export function SectionHeader() {
  return (
    <header className="mb-6 md:mb-8 lg:mb-10 flex items-start justify-between gap-6">
      <div>
        <div
          className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] mb-2"
          style={{ color: "var(--color-chart-2)" }}
        >
          {"SHIP FASTER"}
        </div>
        <h2 className="text-[34px] md:text-[40px] lg:text-[44px] leading-[1.05] font-semibold">
          Your second pair of eyes.
        </h2>
        <p className="mt-2 font-mono text-[11px] md:text-[12px] text-muted-foreground max-w-[72ch]">
          Greptile automatically reviews PRs in GitHub and GitLab with full context of your codebase.
        </p>
      </div>

      <a
        href="#"
        className="shrink-0 inline-flex items-center gap-2 rounded-[2px] px-3 py-2 text-[12px] font-medium"
        style={{
          backgroundColor: "var(--color-chart-2)",
          color: "var(--color-primary-foreground)",
          boxShadow: "0 0 0 1px var(--color-chart-2)",
        }}
      >
        See a sample PR review →
      </a>
    </header>
  )
}
