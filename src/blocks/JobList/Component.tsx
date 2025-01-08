import type { Job, JobListBlock as JobListBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { CollectionPreviews } from '@/components/CollectionPreviews'

export const JobListBlock: React.FC<
  JobListBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, introContent, populateBy, selectedJobs } = props

  let jobs: Job[] = []

  if (populateBy === 'allJobs') {
    const payload = await getPayload({ config: configPromise })

    const fetchedJobs = await payload.find({
      collection: 'jobs',
      depth: 2,
    })

    jobs = fetchedJobs.docs
  } else {
    if (selectedJobs?.length) {
      const filteredSelectedPosts = selectedJobs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Job[]

      jobs = filteredSelectedPosts
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText
            className="ml-0 max-w-[48rem] text-lg"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}
      <CollectionPreviews jobs={jobs} />
    </div>
  )
}
