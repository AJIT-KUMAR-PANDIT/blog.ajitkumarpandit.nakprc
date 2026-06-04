"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
  href: string;
}

const tabs: TabItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className="size-6">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1V9.5z" />
      </svg>
    ),
  },
  {
    id: "posts",
    label: "Blog",
    href: "/posts",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className="size-6">
        <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2v-4H9a1 1 0 01-1-1V5a2 2 0 00-2-2zm6 0a2 2 0 012 2v14a2 2 0 01-2 2h8a2 2 0 01-2-2V5a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className="size-6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm1-8H9V7h6v2z" />
      </svg>
    ),
  },
  {
    id: "search",
    label: "Search",
    href: "/search",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className="size-6">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    href: "/profile",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className="size-6">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
];

export const BottomTabBar = React.forwardRef<HTMLElement, { className?: string }>(
  ({ className }, ref) => {
    const pathname = usePathname();
    const activeId =
      pathname === "/"
        ? "home"
        : pathname.startsWith("/posts")
          ? "posts"
          : pathname.startsWith("/about")
            ? "about"
            : pathname.startsWith("/search")
              ? "search"
              : "profile";

    const activeTab = tabs.find((t) => t.id === activeId)!;

    return (
      <nav
        ref={ref}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 tab-bar-blur border-t border-[var(--ios-separator)] pb-safe",
          "translate-y-0 transition-transform duration-300 ease-[var(--spring-damp)]",
          className,
        )}
      >
        <div className="flex h-[60px] max-w-lg mx-auto items-stretch justify-around">
          {tabs.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className="relative flex flex-1 flex-col items-center justify-center gap-0.5 py-0.5"
              >
                {/* Active indicator pill */}
                {isActive && (
                  <span
                    className="absolute top-[8px] h-4 w-[36px] rounded-full bg-[var(--ios-blue)] opacity-[0.12]"
                    style={{ transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                  />
                )}
                <span
                  className={cn(
                    "transition-colors duration-200",
                    isActive ? "text-[var(--ios-blue)]" : "text-[var(--ios-text-tertiary)]",
                  )}
                  style={{ transition: "color 0.3s ease" }}
                >
                  {tab.icon(isActive)}
                </span>
                <span
                  className={cn(
                    "overflow-hidden text-[10px] font-normal transition-all duration-200 truncate max-w-full",
                    isActive ? "text-[var(--ios-blue)]" : "text-[var(--ios-text-tertiary)]",
                  )}
                  style={{
                    fontSize: isActive ? "10px" : "10px",
                    fontWeight: isActive ? 600 : 400,
                    opacity: isActive ? 1 : 0.75,
                  }}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  },
);

BottomTabBar.displayName = "BottomTabBar";
