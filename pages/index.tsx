import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
import { GithubIcon } from '@/components/commons/icons'
import { getAllPosts, getAllTags, getPostsForTopPage } from '@/lib/notionAPI'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(4)
  const allTags = await getAllTags()

  return {
    props: {
      fourPosts,
      allTags,
    },
    revalidate: 10,
  }
}

export default function Home({ fourPosts, allTags }: any) {
  return (
    <div className="container h-full w-full mx-auto">
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Notion Blog 🚀</h1>
        {fourPosts.map((post: any) => (
          <div key={post.id} className="mx-4">
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPagenationPage={false}
            />
          </div>
        ))}
        <Link
          href="/posts/page/1"
          className="mb-6 lg:w-1/2 mx-auto px-5 block text-right"
        >
          ...もっと見る
        </Link>
        <Tag tags={allTags} />

        <div className="mx-4">
          <h2 className="flex items-center gap-1 text-lg font-bold">
            <GithubIcon size={20} />
            GitHub Contributions
          </h2>
          <Link
            href="https://github.com/tkm-mkzk"
            target="_blank"
            rel="noopener"
            className="relative mx-auto block h-32 w-full mt-2 mb-8 bg-blue-100 rounded-md cursor-pointer shadow-2xl hover:shadow-none hover:translate-y-1 duration-300 transition-all sp:h-20"
          >
            <Image
              className="h-full w-full object-contain"
              src="https://github-contributions-api.deno.dev/tkm-mkzk.svg?no-legend=true&no-total=true&scheme=blue"
              alt="GitHub Contributions"
              fill
              sizes="800px"
              priority
              unoptimized
            />
          </Link>
        </div>
      </main>
    </div>
  )
}
