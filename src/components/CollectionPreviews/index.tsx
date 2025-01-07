import { cn } from '@/utilities/cn'
import React from 'react'

import type { Job } from '@/payload-types'

import { Preview, JobPostData } from '../Preview'

export type Props = {
  jobs: JobPostData[]
}

export const CollectionPreviews: React.FC<Props> = (props) => {
  const { jobs } = props
  const orderedJobs = jobs.sort(function (a, b) {
    return +new Date(b.startDate) - +new Date(a.startDate)
  })

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
