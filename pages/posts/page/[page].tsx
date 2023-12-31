import Pagination from '@/components/Pagination/Pagination'
import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
import { ScrollTopButton } from '@/components/layout/ScrollTopButton'
import {
  getAllPosts,
  getPostsByPage,
  getPostsForTopPage,
  getNumberOfPages,
  getAllTags,
} from '@/lib/notionAPI'
import { GetStaticProps } from 'next'

export const getStaticPaths = async () => {
  const numberOfPage = await getNumberOfPages()

  let params = []
  for (let i = 1; i <= numberOfPage; i++) {
    params.push({ params: { page: i.toString() } })
  }

  return {
    paths: params,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page

  if (!currentPage) {
    throw new Error('currentPage is undefined')
  }

  const postsByPage = await getPostsByPage(parseInt(currentPage.toString(), 10))

  const numberOfPage = await getNumberOfPages()

  const allTags = await getAllTags()

  return {
    props: {
      postsByPage,
      numberOfPage,
      allTags,
      currentPage,
    },
    revalidate: 10,
  }
}

const BlogPageList = ({ postsByPage, numberOfPage, allTags, currentPage }: any) => {
  return (
    <div className="h-full w-full mx-auto mb-48">
      <main className="container w-full mt-16 mx-auto">
        <h1 className="text-regal-blue text-5xl font-medium text-center mb-16">
          Notion Blog List
        </h1>
        <section className="sm:grid sm:gap-x-4 grid-cols-2 mx-auto sp:text-2xl sp:mx-2">
          {postsByPage.map((post: any) => (
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
        <Pagination numberOfPage={numberOfPage} tag={''} currentPage={currentPage} />
        <Tag tags={allTags}></Tag>
      </main>
      <div className="mx-4 sticky bottom-0 p-4 text-right sp:p-2">
        <ScrollTopButton />
      </div>
    </div>
  )
}

export default BlogPageList
