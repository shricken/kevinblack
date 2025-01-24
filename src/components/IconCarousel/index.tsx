'use client'

import { cn } from '@/utilities/cn'
import React, { useState, useRef, useEffect } from 'react'

import { Icon, IconData } from '../Icon'
import { motion, useScroll, useTransform, useAnimate } from 'motion/react'
import freezeScroll from '@/utilities/freezeScroll'

export type Props = {
  icons: IconData[]
}

export const IconCarousel: React.FC<Props> = (props) => {
  const [scope, animate] = useAnimate()
  const ref = useRef(null)
  const [activeIcon, setActiveIcon] = useState<number>(-1)
  const { icons } = props
  const { scrollYProgress } = useScroll()

  const allIcons = icons?.map((result, index) => {
    if (typeof result === 'object' && result !== null) {
      return (
        <li className="float-left" key={index}>
          <Icon doc={result} />
        </li>
      )
    }

    return null
  })

  useEffect(() => {
    animate(
      scope.current,
      {
        x: -(72 * icons.length),
      },
      { duration: icons.length * 10, ease: 'linear', repeat: Infinity },
    )
  })

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      style={{ skewY: useTransform(scrollYProgress, [0, 1], [-3, 10]) }}
    >
      <motion.ul ref={scope} className="box-content list-none w-[9999px] h-16 py-4">
        {/* duplicate the list of icons so we can infinitely scroll them */}
        {allIcons}
        {allIcons}
        {allIcons}
        <li
          className={cn(
            'absolute z-10 top-0 right-0 bottom-0 left-0 backdrop-blur-md transition-opacity pointer-events-none',
            activeIcon > -1 ? 'opacity-1' : 'opacity-0',
          )}
        />
      </motion.ul>
    </motion.div>
  )
}
