"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "posts",
    label: "Blog",
    href: "/posts",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2v-4H9a1 1 0 01-1-1V5a2 2 0 00-2-2zm6 0a2 2 0 012 2v14a2 2 0 01-2 2h8a2 2 0 01-2-2V5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm1-8H9V7h6v2z" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "search",
    label: "Search",
    href: "/search",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth={1.8} />
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    href: "/profile",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const navSections = [
  { label: "Navigation", items: ["home", "posts"] as string[] },
  { label: "", items: ["about", "search", "profile"] as string[] },
];

export const SidebarNav = () => {
  const pathname = usePathname();
  const activeId =
    pathname === "/" ? "home" : pathname.startsWith("/posts") ? "posts" : pathname.startsWith("/about") ? "about" : pathname.startsWith("/search") ? "search" : "profile";

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-30 hidden lg:flex lg:w-[248px] xl:w-[272px] flex-col ios-blur border-r border-[var(--ios-separator)]">
      {/* Sidebar header */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <div className="size-8 rounded-xl bg-gradient-to-br from-violet-600 to-violet-400 dark:from-violet-400 dark:to-violet-500 flex items-center justify-center">
          <span className="text-white text-sm font-bold leading-none">A</span>
        </div>
        <span className="font-semibold text-[17px] tracking-tight text-[var(--ios-text-primary)]" style={{ letterSpacing: "-0.02em" }}>
          AJIT KUMAR PANDIT
        </span>
      </div>

      {/* Search bar */}
      <div className="px-4 pb-3">
        <Link href="/search">
          <div className="flex items-center gap-2 rounded-lg bg-[var(--ios-bg)] px-3 py-2 border border-[var(--ios-separator)] group cursor-pointer hover:border-[var(--ios-separator)] transition-colors duration-200">
            <svg className="size-4 text-[var(--ios-text-quaternary)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
            <span className="text-[var(--ios-text-quaternary)] text-[13px] font-normal">Search...</span>
            <kbd className="ml-auto text-[10px] text-[var(--ios-text-tertiary)] border border-[var(--ios-separator)] rounded px-1 py-0.5 bg-[var(--ios-surface)]">⌘K</kbd>
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-[2px]">
        {navSections.map((section) => {
          if (!section.label && section.items.length > 0) {
            return (
              <React.Fragment key="group2">
                {/* Divider + label */}
                <div className="pt-4 pb-1.5 px-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ios-text-tertiary)]">{section.label}</span>
                </div>
                {navItems.filter((n) => !["home", "posts"].includes(n.id)).map((item) => (
                  <SidebarNavItem key={item.id} {...item} isActive={activeId === item.id} />
                ))}
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key="group1">
              {/* Label */}
              <div className="pt-3 pb-1.5 px-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ios-text-tertiary)]">{section.label}</span>
              </div>
              {navItems.filter((n) => ["home", "posts"].includes(n.id)).map((item) => (
                <SidebarNavItem key={item.id} {...item} isActive={activeId === item.id} />
              ))}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Sidebar footer */}
      <div className="px-4 py-3 border-t border-[var(--ios-separator)]">
        <div className="flex items-center gap-2.5 px-1.5 py-1.5 rounded-xl hover:bg-[var(--ios-bg)] transition-colors duration-200 cursor-pointer">
          <div className="size-7 rounded-full bg-gradient-to-br from-[var(--ios-purple)]/30 to-[var(--ios-pink)]/30 border border-[var(--ios-separator)] flex items-center justify-center">
            <span className="text-xs font-semibold text-[var(--ios-text-primary)]">AKP</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-[var(--ios-text-primary)] truncate">AJIT KUMAR PANDIT</p>
            <p className="text-[11px] text-[var(--ios-text-tertiary)] truncate">ajit@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

function SidebarNavItem({ id, label, icon, href, isActive }: NavItem & { isActive: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 rounded-xl px-3 py-2 text-[14px] font-medium transition-all duration-200",
        isActive
          ? "bg-violet-600/12 text-violet-600 dark:bg-violet-400/12 dark:text-violet-400"
          : "text-[var(--ios-text-secondary)] hover:bg-[var(--ios-bg)] hover:text-[var(--ios-text-primary)]",
      )}
    >
      <span className={cn("shrink-0 transition-colors duration-200", isActive ? "text-violet-600 dark:text-violet-400" : "")}>{icon}</span>
      {label}
    </Link>
  );
}
