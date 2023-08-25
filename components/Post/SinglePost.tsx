import React from 'react'
import Link from 'next/link'

type Props = {
  title: string
  description: string
  date: string
  tags: string[]
  slug: string
  isPaginationPage: boolean
}

const SinglePost = (props: Props) => {
  const { title, date, tags, slug, isPaginationPage } = props

  return (
    <>
      {isPaginationPage ? (
        <section className="h-48 bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300 sp:text-base">
          <div className="text-gray-400 mb-1">{date}</div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-medium my-auto mb-4">
              <Link className="text-white no-underline" href={`/posts/${slug}`}>
                {title}
              </Link>
            </h2>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-4">
            {tags.map((tag: string, index: number) => (
              <Link
                href={`/posts/tag/${tag}/page/1`}
                key={index}
                className="no-underline"
              >
                <span className="text-white bg-gray-500 rounded-xl px-2 py-1 font-medium hover:text-regal-blue">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300 sp:text-base">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-medium my-auto">
              <Link className="text-white no-underline" href={`/posts/${slug}`}>
                {title}
              </Link>
            </h2>
          </div>
          <div className="text-gray-400 mb-1">{date}</div>
          {tags.map((tag: string, index: number) => (
            <Link
              href={`/posts/tag/${tag}/page/1`}
              key={index}
              className="mr-2 no-underline"
            >
              <span className="text-white bg-gray-500 rounded-xl px-2 py-1 font-medium hover:text-regal-blue">
                {tag}
              </span>
            </Link>
          ))}
        </section>
      )}
    </>
  )
}

export default SinglePost
