import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
import { BlogsIcon, GithubIcon, NewIcon } from '@/components/commons/icons'
import { getAllPosts, getAllTags, getPostsForTopPage } from '@/lib/notionAPI'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollTopButton } from '@/components/layout/ScrollTopButton'

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
    <main className="relative z-10 mb-40 min-h-[calc(100vh-102px)] w-full bg-default">
      <div className=" mx-auto max-w-[1280px]">
        <div className="mt-2 w-full bg-regal-blue py-8 text-default">
          <div className="mx-auto w-fit text-right">
            <div className="font-sans text-3xl font-bold sp:text-2xl">
              ★ブログサイト by NotionApi★
            </div>
          </div>
        </div>

        <div className="w-main mx-auto mt-4 space-y-4 pb-6">
          <h2 className="flex items-center gap-1 text-lg font-bold ml-4 mb-0 mt-10">
            <NewIcon size={50} />
          </h2>
          {fourPosts.map((post: any) => (
            <div key={post.id} className="mx-4">
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={false}
              />
            </div>
          ))}
          <Link
            href="/posts/page/1"
            className="mb-6 pb-6 mx-auto px-5 block text-right no-underline"
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
          <div className="mx-4 sticky bottom-0 p-4 text-right sp:p-2">
            <ScrollTopButton />
          </div>
        </div>
      </div>
    </main>
  )
}
