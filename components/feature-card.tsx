"use client"

import { cn } from "@/lib/utils"

type Accent = "green" | "orange" | "yellow"

const accentToColor: Record<Accent, string> = {
  green: "var(--color-chart-2)",
  orange: "var(--color-chart-5)",
  yellow: "var(--color-chart-4)",
}

export function FeatureCard({
  accent = "green",
  tag,
  title,
  description,
  imageSrc,
  imageAlt,
  className,
}: {
  accent?: Accent
  tag: string
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  className?: string
}) {
  const color = accentToColor[accent]

  return (
    <article
      className={cn(
        "relative rounded-[2px] bg-card text-foreground",
        "border border-[color:var(--color-border)]",
        "shadow-[inset_0_0_0_1px_var(--color-border)]",
        "p-6 md:p-7 lg:p-8",
        "h-full min-h-[200px] flex flex-col",
        className,
      )}
      style={{
        // subtle 1px grid-like outline inside
        boxShadow: "inset 0 0 0 1px var(--color-border), 0 0 0 1px var(--color-border)",
      }}
    >
      {/* Tag */}
      <div className="mb-4 md:mb-5 flex items-center justify-between">
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em]" style={{ color }}>
          [ {tag} ]
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[22px] leading-[1.15] md:text-[24px] lg:text-[26px] font-semibold text-balance">{title}</h3>

      {/* Description */}
      <p className="mt-3 text-[12px] md:text-[13px] leading-[1.45] text-muted-foreground max-w-[58ch] flex-1">{description}</p>

      {/* Image (optional) */}
      {imageSrc && (
        <div className="mt-6 md:mt-8 lg:mt-9">
          <div className="mx-auto max-w-[420px]">
            <img
              src={imageSrc}
              alt={imageAlt || ""}
              className="w-full rounded-[2px] border border-[color:var(--color-border)]"
            />
          </div>
        </div>
      )}
    </article>
  )
}
