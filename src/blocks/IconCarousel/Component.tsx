import type { Icon, IconCarouselBlock as IconCarouselBlockProps } from '@/payload-types'

import React from 'react'
import RichText from '@/components/RichText'
import { IconCarousel } from '@/components/IconCarousel'

export const IconCarouselBlock: React.FC<
  IconCarouselBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, introContent, selectedIcons } = props

  let icons: Icon[] = []

  if (selectedIcons?.length) {
    const filteredSelectedPosts = selectedIcons.map((post) => {
      if (typeof post.value === 'object') return post.value
    }) as Icon[]

    icons = filteredSelectedPosts
  }

  return (
    <div className="mt-16 mb-32" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-10">
          <RichText
            className="ml-0 max-w-[48rem] text-lg"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}
      <IconCarousel icons={icons} />
    </div>
  )
}
