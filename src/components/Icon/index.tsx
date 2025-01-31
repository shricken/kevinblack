import React from 'react'

import type { Icon as IconType } from '@/payload-types'
import { motion, useAnimate } from 'motion/react'

import { Media } from '../Media'
import { cn } from '@/utilities/cn'

export type IconData = Pick<IconType, 'iconName' | 'media'>

export const Icon: React.FC<{
  className?: string
  isActive?: boolean
  doc?: IconData
}> = (props) => {
  const { className, isActive, doc } = props

  if (!doc) return false

  const { iconName, media } = doc || {}

  return (
    <div>
      {media && typeof media !== 'string' && (
        <motion.div animate={{ y: isActive ? -15 : 0 }}>
          <Media
            imgClassName={cn('w-16 h-16 mx-2', media?.classes)}
            resource={media}
            htmlElement={null}
            alt={iconName}
            loading="eager"
          />
        </motion.div>
      )}
    </div>
  )
}
