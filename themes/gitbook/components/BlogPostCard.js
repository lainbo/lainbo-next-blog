import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useRouter } from 'next/router'

const BlogPostCard = ({ post, className }) => {
  const router = useRouter()
  const currentSelected = router.asPath.split('?')[0] === '/' + post.slug
  return (
        <div key={post.id} className={`${className} cursor-pointer transition-all border border-transparent hover:bg-[#0000000f] rounded-md dark:hover:bg-[#ffffff1f]  ${currentSelected ? '!bg-[#e6f4ff] text-[#0958d9] !border-[#91caff] dark:!bg-[#111a2c] dark:text-[#3c89e8] dark:!border-[#15417e]' : ''}`}>
            <div className="flex flex-col w-full select-none">
                <Link className="py-1 px-2" href={`${siteConfig('SUB_PATH', '')}/${post.slug}`} passHref>
                    {post.title}
                </Link>
            </div>
        </div>
  )
}

export default BlogPostCard
