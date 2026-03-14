import TypedBio from './TypedBio'
import Image from '@/components/Image'
import SocialIcon from '@/components/social-icons'
import { type Authors } from 'contentlayer/generated'
import React from 'react'
import { useTranslation } from '../../utils/locale'
interface Props {
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}
export default function Profile({ content }: Props) {
  const { t } = useTranslation('about-me')
  const { name, avatar, occupation, company, email, twitter, linkedin, github, slug, douyin } =
    content
  return (
    <div className="z-[100] items-start space-y-2 xl:grid xl:grid-cols-1 xl:gap-x-8 xl:space-y-0">
      <div className="top-12 flex flex-col items-center space-x-2 pt-8 xl:sticky">
        {avatar && (
          <Image
            src={avatar}
            alt="avatar"
            width={192}
            height={192}
            className="h-48 w-48 rounded-full border-[3px] border-white dark:border-white"
            priority
          />
        )}
        <h3 className="pb-2 pt-6 text-3xl font-bold leading-8 tracking-tight">{name}</h3>
        {/*<div className="text-gray-500 dark:text-gray-400">{occupation}</div>*/}
        {/*<div className="text-gray-700 dark:text-gray-300">{company}</div>*/}
        <div className="flex space-x-3 pt-6">
          <SocialIcon kind="mail" href={`mailto:${email}`} />
          <SocialIcon kind="github" href={github} />
          <SocialIcon kind="douyin" href={douyin} />
        </div>
        <hr className="my-5 w-48" />
        <div className="mb-[10px] flex flex-col items-center gap-[20px]">
          <div>{t('overview.desc.1')}</div>
          <div>{t('overview.desc.2')}</div>
          <div>{t('overview.desc.3')}</div>
          <div>{t('overview.desc.4')}</div>
          <TypedBio />
        </div>
      </div>
    </div>
  )
}
