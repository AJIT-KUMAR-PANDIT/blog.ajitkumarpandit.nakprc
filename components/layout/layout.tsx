import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../tina/__generated__/client";
import { LargeTitleHeader } from "./nav/large-title-header";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
  showBackButton?: boolean;
};

export default async function Layout({ children, rawPageData, showBackButton }: LayoutProps) {
  let globalData: any = null;
  try {
    const res = await client.queries.global({
      relativePath: "index.json",
    },
      {
        fetchOptions: {
          next: {
            revalidate: 60,
          },
        }
      }
    );
    globalData = res;
  } catch {
    // Local dev without Tina credentials — render with minimal defaults
    globalData = null;
  }

  const header = globalData?.data?.global?.header || {};
  const title = (header as any)?.name || "Ajit Kumar Pandit";
  const subtitle = undefined; // Global settings doesn't have a description field

  // Minimal valid global object so LayoutProvider never gets null
  const safeGlobal: any = globalData?.data?.global || {
    theme: { color: "blue", darkMode: "default" },
    header: { name: title, icon: { name: "Tina", color: "white", style: "float" } },
  };

  return (
    <LayoutProvider globalSettings={safeGlobal} pageData={rawPageData}>
      <LargeTitleHeader title={title} subtitle={subtitle} showBackButton={showBackButton} />
      <main className="overflow-x-hidden">
        {children}
      </main>
    </LayoutProvider>
  );
}
