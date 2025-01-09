'use client'
import { cn } from '@/utilities/cn'
import payload from 'payload'
import React, { Fragment } from 'react'

import type { Project, Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '../RichText'

export type ProjectCardData = Pick<Project, 'projectName' | 'description' | 'media'>

export const ProjectCard: React.FC<{
  className?: string
  doc?: ProjectCardData
}> = (props) => {
  const { className, doc } = props

  const { projectName, description, media } = doc || {}

  return (
    <article className={cn(className)}>
      <div className="relative w-full ">
        {media && typeof media !== 'string' && <Media preload="metadata" resource={media} />}
      </div>
      <div className="py-4">
        {projectName && <h2 className="font-serif text-5xl">{projectName}</h2>}
        {description && <RichText data={description} enableGutter={false} className="mt-2" />}
      </div>
    </article>
  )
}
