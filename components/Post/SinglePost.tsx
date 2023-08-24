import React from 'react'
import Link from 'next/link'

type Props = {
  title: string
  description: string
  date: string
  tags: string[]
  slug: string
  isPagenationPage: boolean
}

const SinglePost = (props: Props) => {
  const { title, description, date, tags, slug, isPagenationPage } = props

  return (
    <section className="bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-medium sp:text-base my-auto">
          <Link className="text-white no-underline" href={`/posts/${slug}`}>
            {title}
          </Link>
        </h2>
      </div>
      <div className="text-gray-400">{date}</div>
      {tags.map((tag: string, index: number) => (
        <Link href={`/posts/tag/${tag}/page/1`} key={index} className="mr-2 no-underline">
          <span className="text-white bg-gray-500 rounded-xl px-2 py-1 font-medium">{tag}</span>
        </Link>
      ))}
    </section>
  )
}

export default SinglePost
