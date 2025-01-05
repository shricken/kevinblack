import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Job } from '@/payload-types'

import { Media } from '@/components/Media'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Tag } from '../ui/tag'

export type JobPostData = Pick<
  Job,
  'company' | 'description' | 'jobTitle' | 'current' | 'startDate' | 'endDate' | 'skills'
>

export const Preview: React.FC<{
  className?: string
  doc?: JobPostData
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { className, doc, showCategories, title: titleFromProps } = props

  console.log(props)

  const { company, description, jobTitle, current, startDate, endDate, skills } = doc || {}

  const hasSkills = skills && Array.isArray(skills) && skills.length > 0
  //   const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  //   const href = `/${relationTo}/${slug}`

  const startDateFormatted = startDate
    ? new Date(startDate).toLocaleString('default', { month: 'short', year: 'numeric' })
    : ''

  const endDateFormatted = endDate
    ? new Date(endDate).toLocaleString('default', { month: 'short', year: 'numeric' })
    : current
      ? 'present'
      : ''

  console.log(skills)

  return (
    <article className="mb-32">
      <h2 className="font-serif text-5xl">{company}</h2>
      <h3 className="font-light text-lg">{jobTitle}</h3>
      {startDate && endDate && (
        <p className="font-bold mt-2">
          {startDateFormatted} to {endDateFormatted}
        </p>
      )}
      {description && <RichText className="font-light" data={description} />}
      {skills && (
        <ul className="list-none flex flex-wrap gap-3 mt-3">
          {skills.map((skill, index) => (
            <Tag key={index} title={skill.title} />
          ))}
        </ul>
      )}
    </article>
  )
}
