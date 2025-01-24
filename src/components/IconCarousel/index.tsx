'use client'

import { cn } from '@/utilities/cn'
import React, { useState, useRef } from 'react'

import { Icon, IconData } from '../Icon'
import { motion, useScroll, useTransform } from 'motion/react'
import freezeScroll from '@/utilities/freezeScroll'

export type Props = {
  icons: IconData[]
}

export const IconCarousel: React.FC<Props> = (props) => {
  const ref = useRef(null)
  const [activeIcon, setActiveIcon] = useState<number>(-1)
  const { icons } = props
  const { scrollYProgress } = useScroll()

  // function handleJobClick(slug) {
  //   const activeJob = slug ? icons.find((job) => job.slug === slug) : null
  //   freezeScroll(activeJob ?? null)
  //   setActiveJob(activeJob ?? null)
  // }

  const allIcons = icons?.map((result, index) => {
    if (typeof result === 'object' && result !== null) {
      return (
        <li className="float-left" key={index}>
          <Icon doc={result} index={index} total={icons.length} />
        </li>
      )
    }

    return null
  })

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden py-4"
      style={{ skewY: useTransform(scrollYProgress, [0, 1], [-3, 10]) }}
    >
      <motion.ul className="list-none overflow-hidden h-16 py-1">
        {/* duplicate the list of icons so we can infinitely scroll them */}
        {allIcons}
        {allIcons}
      </motion.ul>
    </motion.div>
  )
}
