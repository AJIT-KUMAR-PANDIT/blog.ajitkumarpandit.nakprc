"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface LargeTitleHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onScroll?: (y: number) => void;
}

const IOS_COMPACT_THRESHOLD = 80;

export const LargeTitleHeader = ({
  title = "Ajit Kumar Pandit",
  subtitle,
  showBackButton = false,
  onScroll,
}: LargeTitleHeaderProps) => {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [showCompact, setShowCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setShowCompact(y > IOS_COMPACT_THRESHOLD);
      onScroll?.(y);
    };
    handleScroll(); // init
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScroll]);

  const progress = Math.min(scrollY / IOS_COMPACT_THRESHOLD, 1);

  // Computed animated values
  const heroHeight = 140 + 80 * (1 - progress);
  const opacity = 1 - progress;
  const scale = 0.9 + 0.1 * opacity;
  const translateY = 80 * (1 - opacity);

  return (
    <>
      {/* Large title hero area */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: `${heroHeight}px` }}
      >
        <div
          className={cn(
            "absolute inset-x-0 top-0 ios-blur border-b transition-[height] duration-[400ms]",
            showCompact ? "border-transparent" : "border-[var(--ios-separator)]",
          )}
        />

        {/* Hero background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--ios-blue)]/10 via-transparent to-[var(--ios-purple)]/5 dark:from-[var(--ios-blue)]/15 dark:via-transparent dark:to-[var(--ios-purple)]/10" />

        <div
          className="relative flex h-full w-full flex-col justify-end px-5 pb-5 sm:px-6 lg:px-8"
        >
          {/* Top row (compact) */}
          <div
            className={cn(
              "absolute inset-x-0 top-3 flex items-center justify-between px-4 sm:px-6 transition-all duration-[400ms]",
              showCompact ? "opacity-100 scale-100" : "opacity-0 scale-95",
            )}
          >
            {showBackButton && (
              <Link
                href="/"
                className="flex items-center gap-1 text-[var(--ios-blue)] text-sm font-medium"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Link>
            )}
            {!showBackButton && <div className="size-[46px]" />} {/* Spacer */}

            {/* Theme toggle + share */}
            <div className="flex items-center gap-3">
              <button className="text-[var(--ios-text-secondary)]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Large title */}
          <div
            className="large-title-text px-1"
            style={{
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
              willChange: "transform, opacity",
            }}
          >
            <h1
              className="font-[700] tracking-tighter leading-none text-4xl"
              style={{
                fontSize: "clamp(32px, 8vw, 56px)",
                letterSpacing: "-0.03em",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className="mt-2 text-base font-normal tracking-wide"
                style={{
                  color: "var(--ios-text-tertiary)",
                  fontSize: "clamp(14px, 2.5vw, 18px)",
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Search bar (shows in compact state) */}
          <div
            className={cn(
              "absolute bottom-2 inset-x-3 transition-all duration-[400ms]",
              showCompact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            <Link href="/search">
              <div className="flex items-center gap-2 rounded-xl bg-[var(--ios-bg)] px-3.5 py-2.5 border border-[var(--ios-separator)]">
                <svg className="size-[17px] shrink-0 text-[var(--ios-text-quaternary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                <span className="text-[var(--ios-text-quaternary)] text-[15px] font-light">Search</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Compact nav bar (shown after scroll) */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-40 ios-blur border-b transition-all duration-[400ms]",
          showCompact ? "border-transparent" : "border-transparent opacity-0 -translate-y-full",
        )}
      >
        <div className="mx-auto flex h-[44px] max-w-[1024px] items-center justify-between px-5">
          {showBackButton && (
            <Link href="/" className="text-[var(--ios-blue)] text-[17px] font-normal">
              Back
            </Link>
          )}
          {!showBackButton && <div />}

          <h2
            className="absolute left-1/2 -translate-x-1/2 font-[600] text-[17px]"
            style={{ letterSpacing: "-0.01em" }}
          >
            {title}
          </h2>
          <div className="size-[44px]" />
        </div>
      </div>
    </>
  );
};
