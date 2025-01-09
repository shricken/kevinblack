'use client'

import { cn } from '@/utilities/cn'
import React, { useState } from 'react'

import { Preview, JobPostData } from '../Preview'
import { ProjectCard } from '../Project'
import { AnimatePresence, cubicBezier, motion } from 'motion/react'
import freezeScroll from '@/utilities/freezeScroll'

export type Props = {
  jobs: JobPostData[]
}

export const CollectionPreviews: React.FC<Props> = (props) => {
  const [activeJob, setActiveJob] = useState<JobPostData | null>(null)
  const { jobs } = props
  const orderedJobs = jobs.sort(function (a, b) {
    return +new Date(b.startDate) - +new Date(a.startDate)
  })

  function handleJobClick(slug) {
    const activeJob = slug ? orderedJobs.find((job) => job.slug === slug) : null
    freezeScroll(activeJob ?? null)
    setActiveJob(activeJob ?? null)
  }

  return (
    <div className={cn('container')}>
      <ul className="list-none">
        {orderedJobs?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <li key={index}>
                <Preview doc={result} showCategories handleJobClick={handleJobClick} />
              </li>
            )
          }

          return null
        })}
      </ul>

      <AnimatePresence>
        {activeJob && (
          <motion.section
            className="fixed left-0 right-0 top-0 bottom-0 p-10 z-30 overflow-auto"
            initial={{
              y: -30,
              x: -20,
              rotate: '1.2deg',
              opacity: 0,
            }}
            animate={{
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              transition: { delay: 0.75, duration: 0.3, ease: 'easeOut' },
            }}
            exit={{
              y: 30,
              x: 20,
              rotate: '-1.2deg',
              opacity: 0,
            }}
          >
            <div className="container p-0 lg:max-w-[1100px]">
              <div className="md:flex justify-between flex-row-reverse">
                <button
                  className="underline-offset-4 mb-4 md:mb-0 hover:underline hover:text-primary"
                  onClick={() => handleJobClick(null)}
                >
                  close ×
                </button>
                <h2 className="font-serif text-6xl mb-6">{activeJob.company} projects</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 md:gap-12">
                {activeJob?.projects?.map((project, index) => {
                  if (typeof project === 'object')
                    return <ProjectCard key={`project-${index}`} doc={project} />
                })}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div
        className={cn(
          'bg-white/80 backdrop-blur-sm fixed left-0 right-0 top-0 bottom-0 w-[140vw] h-[140vh] z-20 transition-all duration-500 dark:bg-black/80',
          activeJob
            ? 'delay-300 left-[-20vw] top-0 opacity-100'
            : 'left-[20vw] top-[-20vh] opacity-0 pointer-events-none',
        )}
      />
    </div>
  )
}
