import SinglePost from '@/components/Post/SinglePost'
import { getAllPosts, getPostsByPage, getPostsForTopPage, getNumberOfPages } from '@/lib/notionAPI'
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

  return {
    props: {
      postsByPage,
    },
    revalidate: 60 * 60 * 6,
  }
}

const BlogPageList = ({ postsByPage }: any) => {
  return (
    <div className="container h-full w-full mx-auto">
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Notion Blog 🚀</h1>
        <section className="sm:grid grid-cols-2 w-5/6 mx-auto">
          {postsByPage.map((post: any) => (
            <div key={post.id}>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPagenationPage={true}
              />
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default BlogPageList
