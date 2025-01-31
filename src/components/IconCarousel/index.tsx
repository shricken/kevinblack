'use client'

import { cn } from '@/utilities/cn'
import React, { useState, useRef, useEffect } from 'react'

import { Icon, IconData } from '../Icon'
import { IconLabel } from '../IconLabel'
import { motion, useScroll, useTransform, useAnimate } from 'motion/react'

export type Props = {
  icons: IconData[]
}

export const IconCarousel: React.FC<Props> = (props) => {
  const [iconScope, iconsAnimate] = useAnimate()
  const ref = useRef(null)
  const [activeIcon, setActiveIcon] = useState<number>(0)
  const { icons } = props
  const { scrollYProgress } = useScroll()

  const renderIcon = (result: IconData, index: number, isDuplicate = false) => {
    if (typeof result === 'object' && result !== null) {
      return (
        <li className="float-left" key={`icon--${index}`}>
          <Icon doc={result} isActive={(!isDuplicate || index === 0) && activeIcon === index} />
        </li>
      )
    }

    return null
  }

  const allIcons = icons?.map((result, index) => renderIcon(result, index))
  const allIconsDuplicate = icons?.map((result, index) => renderIcon(result, index, true))

  useEffect(() => {
    const iconChangeInterval = setInterval(() => {
      iconsAnimate(
        iconScope.current,
        {
          x: -80 * activeIcon,
        },
        { duration: 0.2, ease: [0.215, 0.61, 0.355, 1] },
      ).then(() => {
        if (activeIcon === icons.length - 1) {
          iconsAnimate(
            iconScope.current,
            {
              x: 80,
            },
            { duration: 0 },
          )
        }
      })
      setActiveIcon((prev) => (prev < icons.length - 1 ? prev + 1 : 0))
    }, 2500)

    return () => clearInterval(iconChangeInterval)
  })

  return (
    <motion.div
      ref={ref}
      className="relative container mx-auto"
      style={{ skewY: useTransform(scrollYProgress, [0, 1], [-3, 10]) }}
    >
      <motion.ul
        ref={iconScope}
        className={`relative box-content list-none w-[9999px] h-16 py-4`}
        style={{ left: `-${(icons.length + 1) * 80}px` }}
      >
        {/* duplicate the list of icons so we can infinitely scroll them */}
        {allIconsDuplicate}
        {allIcons}
        {allIconsDuplicate}
      </motion.ul>
      <IconLabel icons={icons} active={activeIcon} />
    </motion.div>
  )
}
