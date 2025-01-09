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
                <Preview doc={result} showCategories />
              </li>
            )
          }

          return null
        })}
      </ul>
    </div>
  )
}
