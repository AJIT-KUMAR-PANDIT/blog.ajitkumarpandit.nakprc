import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";

export const revalidate = 300;

export default async function Home() {
  let data: any;
  try {
    data = await client.queries.page({
      relativePath: `home.mdx`,
    });
  } catch {
    // Local dev without Tina credentials — render empty content
    data = {
      data: { page: null },
      variables: { relativePath: "home.mdx" },
      query: "",
    };
  }

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}
