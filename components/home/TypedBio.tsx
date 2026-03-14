'use client'

import React from 'react'
import Typed from 'typed.js'
import { useTranslation, LanguageContext } from 'utils/locale'

const TypedBios = () => {
  const el = React.useRef(null)
  const typed = React.useRef<Typed | null>(null)
  const { currentLang } = React.useContext(LanguageContext)
  const { t } = useTranslation('about-me')

  React.useEffect(() => {
    typed.current = new Typed(el.current, {
      stringsElement: '#bios',
      typeSpeed: 40,
      backSpeed: 10,
      loop: true,
      backDelay: 1000,
    })
    return () => typed.current?.destroy()
  }, [currentLang])

  return (
    <div>
      <span>👋 </span>
      <ul id="bios" className="hidden">
        <li key="1">
          {t('typed.Iam')}
          <b className="text-[#f17a7e]"> {t('typed.alias.1')}</b> .
        </li>
        <li key="2">
          {t('typed.Iam-a')} <b className="text-[#f17a7e]">{t('typed.text1')}</b>.
        </li>
        <li key="3">
          {t('typed.Iam-a')} <b className="text-[#f17a7e]">{t('typed.text2')}</b>.
        </li>
        <li key="4">
          {t('typed.Iam-a')} <b className="text-[#f17a7e]">{t('typed.text3')}</b>.
        </li>
        <li key="5">
          {t('typed.Iam-a')} <b className="text-[#f17a7e]">{t('typed.text4')}</b>.
        </li>
        <li key="6">
          {t('typed.Iam-a')} <b className="text-[#f17a7e]">{t('typed.text5')}</b>.
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  )
}

export default TypedBios
