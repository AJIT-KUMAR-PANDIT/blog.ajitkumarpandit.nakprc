import React from "react";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";
import { BottomTabBar } from "@/components/layout/nav/bottom-tab-bar";
import { SidebarNav } from "@/components/layout/nav/sidebar-nav";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AJIT KUMAR PANDIT",
  description: "Personal blog — thoughts on design, technology, and building.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(fontSans.variable)}>
      <body className="min-h-screen bg-[var(--ios-bg)] font-sans antialiased">
        <VideoDialogProvider>
          <div className="flex">
            {/* Desktop sidebar — hidden on mobile */}
            <SidebarNav />

            {/* Main content area */}
            <div className="flex-1 lg:ml-[248px] xl:ml-[272px]">
              {children}
            </div>
          </div>
          <VideoDialog />
        </VideoDialogProvider>
        {/* Bottom tab bar always visible */}
        <BottomTabBar />
        <TailwindIndicator />
      </body>
    </html>
  );
}
