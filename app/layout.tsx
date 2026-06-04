import React from "react";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";
import { BottomTabBar } from "@/components/layout/nav/bottom-tab-bar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ajit Kumar Pandit",
  description: "Personal blog — thoughts on design, technology, and building.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(fontSans.variable)}>
      <body className="min-h-screen bg-[var(--ios-bg)] font-sans antialiased pb-[70px]">
        <VideoDialogProvider>
          <div className="max-w-[1024px] mx-auto">
            {children}
          </div>
          <VideoDialog />
        </VideoDialogProvider>
        <BottomTabBar />
        <TailwindIndicator />
      </body>
    </html>
  );
}
