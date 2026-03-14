import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
  className?: string
}

const Tag = ({ text, className }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={`${className ? className : 'text-primary mr-3 rounded px-[5px] font-extrabold uppercase hover:bg-[#FFDDDE] hover:text-[#f17a7e]'}`}
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
