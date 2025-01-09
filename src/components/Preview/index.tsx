import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Job, Skill } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '../RichText'
import { Tag } from '../ui/tag'

export type JobPostData = Pick<
  Job,
  | 'company'
  | 'description'
  | 'jobTitle'
  | 'current'
  | 'startDate'
  | 'endDate'
  | 'skills'
  | 'projects'
  | 'slug'
>

export const Preview: React.FC<{
  className?: string
  doc?: JobPostData
  showCategories?: boolean
  title?: string
  handleJobClick: (slug: string | null) => void
}> = (props) => {
  const { className, doc, showCategories, title: titleFromProps, handleJobClick } = props

  const { company, description, jobTitle, current, startDate, endDate, skills, projects, slug } =
    doc || {}

  const hasSkills = skills && Array.isArray(skills) && skills.length > 0

  const startDateFormatted = startDate
    ? new Date(startDate).toLocaleString('default', { month: 'short', year: 'numeric' })
    : ''

  const endDateFormatted = endDate
    ? new Date(endDate).toLocaleString('default', { month: 'short', year: 'numeric' })
    : current
      ? 'present'
      : ''

  return (
    <article className="mb-32">
      <h2 className="font-serif text-5xl text-primary">{company}</h2>
      <h3 className="font-light text-lg">{jobTitle}</h3>
      {startDate && endDate && (
        <p className="font-bold mt-2">
          {startDateFormatted} to {endDateFormatted}
        </p>
      )}
      {description && <RichText className="mt-4" enableGutter={false} data={description} />}
      <div className="md:flex justify-between mt-3 gap-3">
        {skills && (
          <ul className="list-none flex flex-wrap gap-3">
            {skills.map((skill: Skill, index) => (
              <li key={index}>
                <Tag title={skill?.title} />
              </li>
            ))}
          </ul>
        )}
        {projects?.length && slug && (
          <div className="mt-4 md:mt-0">
            <button
              className="text-primary font-bold text-sm whitespace-nowrap underline-offset-4 hover:underline"
              onClick={() => handleJobClick(slug)}
            >
              Learn more →
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
