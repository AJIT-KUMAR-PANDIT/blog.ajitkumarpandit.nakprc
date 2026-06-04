import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import PostClientPage from './client-page';

export const revalidate = 300;

export default async function PostPage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');
  let data: any;
  try {
    data = await client.queries.post({
      relativePath: `${filepath}.mdx`,
    });
  } catch {
    // Local dev without Tina credentials — render empty post
    data = { data: { post: null } };
  }

  return (
    <Layout rawPageData={data} showBackButton>
      <PostClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  try {
    let posts = await client.queries.postConnection();
    const allPosts = posts;

    if (!allPosts.data?.postConnection.edges) {
      return [];
    }

    while (posts.data?.postConnection.pageInfo.hasNextPage) {
      posts = await client.queries.postConnection({
        after: posts.data.postConnection.pageInfo.endCursor,
      });

      if (!posts.data?.postConnection.edges) {
        break;
      }

      allPosts.data.postConnection.edges.push(...posts.data.postConnection.edges);
    }

    return allPosts.data?.postConnection.edges.map((edge: any) => ({
      urlSegments: edge?.node?._sys.breadcrumbs || [],
    })) || [];
  } catch {
    return [];
  }
}
