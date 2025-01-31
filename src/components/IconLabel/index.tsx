import React, { useRef, useEffect } from 'react'

import type { Icon as IconType } from '@/payload-types'

import { Media } from '../Media'
import { cn } from '@/utilities/cn'

export type IconData = Pick<IconType, 'iconName'>

export const IconLabel: React.FC<{
  className?: string
  active: number
  icons: IconData[]
}> = (props) => {
  const { className, active, icons } = props
  const labelRef = useRef(null)

  const realActive = active >= icons.length ? active - icons.length : active

  return (
    <div className="relative z-[-1] font-mono">
      <span ref={labelRef} className="inline-block min-w-[80px] text-center">
        {icons[realActive].iconName}
      </span>
      <span className="absolute bottom-0 left-[-4px] h-24 w-[88px] opacity-10 bg-primary z-[-1] dark:opacity-20" />
    </div>
  )
}
