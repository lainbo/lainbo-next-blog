import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useRouter } from 'next/router'

const BlogPostCard = ({ post, className }) => {
  const router = useRouter()
  const currentSelected = router.asPath.split('?')[0] === '/' + post.slug
  return (
        <div key={post.id} className={`${className} cursor-pointer border border-transparent hover:bg-[#0000000f] rounded-md dark:hover:bg-[#ffffff1f]  ${currentSelected ? '!bg-[#e8ffea] text-[#00b42a] !border-[#aff0b5] dark:!bg-[#27c34633] dark:text-[#27c346] dark:!border-[#484849]' : ''}`}>
            <div className="flex flex-col w-full select-none">
                <Link className="py-1 px-2" href={`${siteConfig('SUB_PATH', '')}/${post.slug}`} passHref>
                    {post.title}
                </Link>
            </div>
        </div>
  )
}

export default BlogPostCard
