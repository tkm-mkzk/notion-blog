import { ScrollTopButton } from '@/components/layout/ScrollTopButton'
import { getAllPosts, getSinglePost } from '@/lib/notionAPI'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Button } from '@mantine/core'

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts()
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }: any) => {
  const post = await getSinglePost(params.slug)
  return {
    props: {
      post,
    },
    revalidate: 10,
  }
}

const Post = ({ post }: any) => {
  const router = useRouter()

  return (
    <section className="container mx-auto mt-20 mb-48 h-full w-full bg-default px-2">
      <div className="mt-2 w-full bg-regal-blue py-8 text-default">
        <div className="mx-auto w-fit text-right">
          <div className="font-sans text-3xl font-bold sp:text-2xl">
            {post.metadata.title}
          </div>
        </div>
      </div>
      <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
      <span className="text-gray-500">Posted date at {post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag: string, index: number) => (
        <Link href={`/posts/tag/${tag}/page/1`} key={index}>
          <span className="mr-1 cursor-pointer px-2 font-medium py-1 rounded-xl bg-gray-400 inline-block text-white hover:text-regal-blue">
            {tag}
          </span>
        </Link>
      ))}
      <div className="mt-10 font-medium">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code>{children}</code>
              )
            },
          }}
        >
          {post.markdown.parent}
        </ReactMarkdown>

        <Button onClick={() => router.back()}>戻る</Button>
      </div>
      <div className="mx-4 sticky bottom-0 p-4 text-right sp:p-2">
        <ScrollTopButton />
      </div>
    </section>
  )
}

export default Post
