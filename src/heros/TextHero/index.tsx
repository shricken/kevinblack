'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export const TextHero: React.FC<Page['hero']> = ({ heroTitle, links, richText }) => {
  const { scrollYProgress } = useScroll()
  const headlineBackgroundWidth = useTransform(scrollYProgress, (x) => x * 4000)

  return (
    <div className="relative -mt-[10.4rem] h-[75vh] flex items-center justify-start">
      <div className="container mt-14 z-10 relative">
        <div className="max-w-[36.5rem]">
          <h1 className="relative text-transparent text-8xl font-serif bg-gradient-to-br from-30% from-primary to-white dark:to-black bg-clip-text">
            {heroTitle}
            <motion.span
              className="absolute left-[-5px] bottom-1 h-12 max-w-full skew-y-[-1deg] skew-x-[-1deg] origin-bottom-left opacity-10 bg-primary z-[-1] dark:opacity-20"
              style={{
                width: headlineBackgroundWidth,
              }}
            />
          </h1>
          {richText && <RichText className="mb-6 text-xl" data={richText} enableGutter={false} />}
          {links && Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
                link.appearance = 'link'
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
