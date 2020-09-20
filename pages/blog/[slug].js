import Link from 'next/link';
import { getPostBySlug, getAllPosts, markdownToHtml } from '../../lib';

const Post = ({ post }) => (
  <div>
    <h1>{post.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    <Link href="/">Home</Link>
  </div>
);

// Code adapted from Next.js blog starter
export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    // 'date',
    'slug',
    // 'author',
    'content',
    // 'ogImage',
    // 'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export default Post;