import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { checkContainHttp, sliceUrlFromHttp } from '@/lib/utils'
import NotionIcon from '@/components/NotionIcon'
import Badge from '@/components/Badge'
import CONFIG from '../config'

const BlogPostCard = ({ post, className }) => {
  const router = useRouter()
  const currentSelected = router.asPath.split('?')[0] === '/' + post.slug
  const url = checkContainHttp(post.slug) ? sliceUrlFromHttp(post.slug) : `${siteConfig('SUB_PATH', '')}/${post.slug}`
  return (
    <Link href={url} passHref> <div key={post.id} className={`${className} relative py-1.5 cursor-pointer px-1.5 transition-all border border-transparent hover:bg-[#0000000f] dark:hover:bg-[#ffffff1f] rounded-md ${currentSelected ? '!bg-[#e6f4ff] text-[#0958d9] !border-[#91caff] dark:!bg-[#111a2c] dark:text-[#3c89e8] dark:!border-[#15417e]' : ''}`}>
      <div className="w-full select-none">
        <NotionIcon icon={post?.pageIcon} /> {post.title}
      </div>
      {/* 最新文章加个红点 */}
      {post?.isLatest && siteConfig('GITBOOK_LATEST_POST_RED_BADGE', false, CONFIG) && <Badge />}
    </div>
    </Link>
  )
}

export default BlogPostCard
