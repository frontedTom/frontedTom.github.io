'use client'

import { genPageMetadata } from 'app/seo'
import { Tabs, Tab } from '@heroui/react'

// export const metadata = genPageMetadata({ title: 'Music' })

export default function MusicPage() {
  return (
    <div>
      <div>CodeTom的音乐收藏库</div>
      <div className="flex flex-wrap gap-4">
        <Tabs key="111" aria-label="Tabs colors" radius="full" className="w-full">
          <Tab key="photos" title="Photos">
            <div>111</div>
          </Tab>
          <Tab key="music" title="Music">
            <div>222</div>
          </Tab>
          <Tab key="videos" title="Videos">
            <div>333</div>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
