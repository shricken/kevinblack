import { motion, useTime, useTransform } from 'motion/react'
import React, { useState } from 'react'

import type { Icon as IconType } from '@/payload-types'

import RichText from '../RichText'
import { Media } from '../Media'

export type IconData = Pick<IconType, 'iconName' | 'media'>

export const Icon: React.FC<{
  className?: string
  isActive?: boolean
  doc?: IconData
  index: number
  total: number
}> = (props) => {
  const { className, isActive, doc, index, total } = props
  const width = 72 // make this more automatic

  const [initialComplete, setInitialComplete] = useState(false)

  if (!doc) return false

  const { iconName, media } = doc || {}

  return (
    <motion.div
      key={initialComplete ? 1 : 0}
      initial={{ x: (initialComplete ? total - 1 : index) * width }}
      animate={{
        x: -width,
        transition: initialComplete
          ? { duration: total * 10, ease: 'linear', repeat: Infinity }
          : { duration: (index + 1) * 10, ease: 'linear' },
      }}
      onAnimationComplete={() => setInitialComplete(true)}
    >
      <button>
        {media && typeof media !== 'string' && (
          <Media className="w-16 h-16 mx-1" resource={media} />
        )}
      </button>
      {isActive && (
        <div>
          <h3>{iconName}</h3>
        </div>
      )}
    </motion.div>
  )
}
