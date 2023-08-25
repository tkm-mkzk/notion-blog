import { getPageLink } from '@/lib/blog-helper'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  numberOfPage: number
  tag: string
  currentPage: number
}

function Pagination(props: Props) {
  const { numberOfPage, tag, currentPage } = props
  const router = useRouter()

  let pages: number[] = []
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i)
  }

  const handlePageNavigation = (page: number) => {
    router.push(getPageLink(tag, page))
  }

  return (
    <section className="mb-8 mx-2 rounded-md p-5">
      <ul className="flex items-center justify-center gap-4 p-0">
        {pages.map((page) => (
          <li
            key={page}
            onClick={() => handlePageNavigation(page)}
            className={`cursor-pointer rounded-lg w-6 h-8 relative list-none ${
              page == currentPage ? 'bg-indigo-600' : 'bg-sky-900'
            } flex items-center justify-center`}
          >
            <span className="text-gray-100 no-underline">{page}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Pagination
