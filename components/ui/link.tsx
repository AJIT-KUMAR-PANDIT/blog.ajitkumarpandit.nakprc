"use client";

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface iOSLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
}

export const IOSLink = ({ className, children, ...props }: iOSLinkProps) => (
  <Link
    {...props}
    className={cn(
      "font-medium text-[var(--ios-blue)] no-underline hover:text-[var(--ios-blue)]/80 active:opacity-70",
      className,
    )}
  >
    {children}
  </Link>
);

// iOS-style "Read Article" link component used in post lists
interface ReadArticleLinkProps {
  href: string;
  className?: string;
}

export const ReadArticleLink = ({ href, className }: ReadArticleLinkProps) => (
  <Link
    href={href}
    className={cn(
      "inline-flex items-center text-[17px] font-semibold text-[var(--ios-blue)] no-underline",
      "transition-colors duration-200 hover:text-[var(--ios-blue)]/80 active:opacity-70",
      className,
    )}
  >
    <span>Read Article</span>
    <svg className="ml-1.5 size-[17px] text-[var(--ios-blue)] transition-transform duration-300 hover:translate-x-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </Link>
);
