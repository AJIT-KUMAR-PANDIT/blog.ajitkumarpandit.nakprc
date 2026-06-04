import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import PostsClientPage from './client-page';

export const revalidate = 300;

export default async function PostsPage() {
  let allPosts: any;
  try {
    let posts = await client.queries.postConnection({
      sort: 'date',
      last: 1
    });
    allPosts = posts;

    if (allPosts.data?.postConnection.edges) {
      while (posts.data?.postConnection.pageInfo.hasPreviousPage) {
        posts = await client.queries.postConnection({
          sort: 'date',
          before: posts.data.postConnection.pageInfo.endCursor,
        });

        if (!posts.data?.postConnection.edges) {
          break;
        }

        allPosts.data.postConnection.edges.push(...posts.data.postConnection.edges.reverse());
      }
    }
  } catch {
    // Local dev without Tina credentials — render empty list
    allPosts = { data: { postConnection: { edges: [] } } };
  }

  return (
    <Layout rawPageData={allPosts.data}>
      <PostsClientPage {...allPosts} />
    </Layout>
  );
}
