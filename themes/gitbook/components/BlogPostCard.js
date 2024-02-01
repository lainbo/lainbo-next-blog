import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useRouter } from 'next/router'

const BlogPostCard = ({ post, className }) => {
  const router = useRouter()
  const currentSelected = router.asPath.split('?')[0] === '/' + post.slug
  return (
    <Link href={`${siteConfig('SUB_PATH', '')}/${post.slug}`} passHref>
      <div key={post.id} className={`${className} py-1.5 cursor-pointer px-1.5 transition-all border border-transparent hover:bg-[#0000000f] dark:hover:bg-[#ffffff1f] rounded-md ${currentSelected ? '!bg-[#e6f4ff] text-[#0958d9] !border-[#91caff] dark:!bg-[#111a2c] dark:text-[#3c89e8] dark:!border-[#15417e]' : ''}`}>
        <div className="flex flex-col w-full select-none">
          {post.title}
        </div>
    </div>
    </Link>
  )
}

export default BlogPostCard
