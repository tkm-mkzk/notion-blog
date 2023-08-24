import Pagination from '@/components/Pagination/Pagination'
import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
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
    },
    revalidate: 10,
  }
}

const BlogTagPageList = ({ numberOfPagesByTag, posts, currentTag, allTags }: any) => {
  return (
    <div className="container h-full w-full mx-auto">
      <main className="container w-full mt-16">
        <section className="sm:grid grid-cols-2 w-5/6 mx-auto">
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
        <Pagination numberOfPage={numberOfPagesByTag} tag={currentTag} />
      </main>
      <Tag tags={allTags} />
    </div>
  )
}

export default BlogTagPageList
