import React from 'react'

import type { Icon as IconType } from '@/payload-types'

import { Media } from '../Media'
import { cn } from '@/utilities/cn'

export type IconData = Pick<IconType, 'iconName' | 'media'>

export const Icon: React.FC<{
  className?: string
  doc?: IconData
}> = (props) => {
  const { className, doc } = props

  if (!doc) return false

  const { iconName, media } = doc || {}

  return (
    <div>
      {media && typeof media !== 'string' && (
        <Media
          imgClassName={cn('w-16 h-16 mx-1', media?.classes)}
          resource={media}
          htmlElement={null}
          alt={iconName}
        />
      )}
    </div>
  )
}
