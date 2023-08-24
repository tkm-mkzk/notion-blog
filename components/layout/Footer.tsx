import Link from 'next/link'
import { NotionIcon } from '../commons/icons'

export const Footer = () => {
  return (
    <footer className="-z-10 fixed bottom-0 left-0 flex h-40 w-full flex-col justify-between bg-regal-blue px-8 text-white">
      <div className="mt-6">
        <div className="flex gap-2">
          <NotionIcon size={36} />
          <Link href="/" className="text-3xl font-bold no-underline text-white">
            notion-blog
          </Link>
        </div>
        <div className="mt-2 text-xs">
          Notion API と Next.js / Tailwind CSS でブログを作ってみました。
        </div>
      </div>
      <div className="py-2 text-center text-xs font-bold text-slate-200">
        Made with Notion by tkm-mkzk @2023
      </div>
    </footer>
  )
}
