'use client'
import { Headline } from './Headline'
import IconBox from './IconBox'
import SearchBox from './SearchBox'
import ScrollTagsBox from './ScrollTagsBox'
import ResponsiveBox from './ResponsiveBox'
import Profile from './Profile'
import { useContext, useEffect, useRef } from 'react'
import { LanguageContext } from '../../utils/locale'
import { allAuthors, Authors } from 'contentlayer/generated'
import { coreContent, CoreContent } from 'pliny/utils/contentlayer'

export default function DashBoard() {
  const { currentLang } = useContext(LanguageContext)
  const authorRef = useRef<Authors | null>(null)
  const mainContentRef = useRef<CoreContent<Authors> | null>(null)

  authorRef.current = allAuthors.find((p) => p.slug === `${currentLang}/default`) as Authors
  mainContentRef.current = coreContent(authorRef.current)

  useEffect(() => {
    return () => {
      authorRef.current = allAuthors.find((p) => p.slug === `${currentLang}/default`) as Authors
      mainContentRef.current = coreContent(authorRef.current)
    }
  }, [currentLang])
  return (
    <div className="divid-y space-y-3">
      {/*简介*/}
      <Profile content={mainContentRef.current} />
      <div className="mt-6 flex justify-between space-x-3">
        <Headline />
        <div className="flex-col space-y-3">
          <IconBox />
          <SearchBox />
        </div>
      </div>
      <ResponsiveBox />
      <ScrollTagsBox />
    </div>
  )
}
