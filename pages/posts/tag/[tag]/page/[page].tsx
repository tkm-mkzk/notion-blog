import Pagination from '@/components/Pagination/Pagination'
import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
import { ScrollTopButton } from '@/components/layout/ScrollTopButton'
import {
  getAllPosts,
  getPostsByPage,
  getPostsForTopPage,
  getNumberOfPages,
  getPostsByTagAndPage,
  getNumberOfPagesByTag,
  getAllTags,
} from '@/lib/notionAPI'
import { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = await getAllTags()
  let params: any = []

  await Promise.all(
    allTags.map((tag: string) => {
      return getNumberOfPagesByTag(tag).then((numberOfPageByTag: number) => {
        for (let i = 1; i <= numberOfPageByTag; i++) {
          params.push({ params: { tag: tag, page: i.toString() } })
        }
      })
    })
  )

  return {
    paths: [{ params: { tag: 'blog', page: '1' } }],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage: string = context.params?.page?.toString() || 'defaultPage'
  const currentTag: string = context.params?.tag?.toString() || 'defaultTag'

  const upperCaseCurrentTag = currentTag.charAt(0).toUpperCase() + currentTag.slice(1)

  const posts = await getPostsByTagAndPage(upperCaseCurrentTag, parseInt(currentPage, 10))

  const numberOfPagesByTag = await getNumberOfPagesByTag(upperCaseCurrentTag)

  const allTags = await getAllTags()

  return {
    props: {
      posts,
      numberOfPagesByTag,
      currentTag,
      allTags,
      currentPage,
    },
    revalidate: 10,
  }
}

const BlogTagPageList = ({ numberOfPagesByTag, posts, currentTag, allTags, currentPage }: any) => {
  return (
    <div className="container h-full w-full mx-auto mb-48">
      <main className="container w-full mt-16">
        <h1 className="text-regal-blue text-5xl font-medium text-center mb-16">Notion Blog List</h1>
        <section className="sm:grid sm:gap-x-4 grid-cols-2 mx-auto sp:text-2xl sp:mx-2">
          {posts.map((post: any) => (
            <div key={post.id}>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={true}
              />
            </div>
          ))}
        </section>
        <Pagination numberOfPage={numberOfPagesByTag} tag={currentTag} currentPage={currentPage} />
      </main>
      <Tag tags={allTags} />
      <div className="mx-4 sticky bottom-0 p-4 text-right sp:p-2">
        <ScrollTopButton />
      </div>
    </div>
  )
}

export default BlogTagPageList
