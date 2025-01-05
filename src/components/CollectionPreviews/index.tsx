import { cn } from '@/utilities/cn'
import React from 'react'

import type { Job } from '@/payload-types'

import { Preview, JobPostData } from '../Preview'

export type Props = {
  jobs: JobPostData[]
}

export const CollectionPreviews: React.FC<Props> = (props) => {
  const { jobs } = props

  return (
    <div className={cn('container')}>
      <ul className="list-none">
        {jobs?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <li key={index}>
                <Preview className="h-full" doc={result} showCategories />
              </li>
            )
          }

          return null
        })}
      </ul>
    </div>
  )
}
