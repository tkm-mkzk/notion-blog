import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 flex h-40 w-full flex-col justify-between bg-regal-blue px-8 text-white">
      <div className="mt-6">
        <div className="flex gap-2">
          <Link href="/" className="text-3x font-bold">
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
