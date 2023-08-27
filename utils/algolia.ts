import algoliasearch from 'algoliasearch'

const client = algoliasearch(
  `${process.env.ALGOLIA_APPLICATION_ID}`,
  `${process.env.ALGOLIA_ADMIN_API_KEY}`,
)
const index = client.initIndex('notion-blog')

export const saveToAlgolia = async (post: any) => {
  try {
    const records: any = {
      objectID: post.id,
      title: post.
    }
  }
}
