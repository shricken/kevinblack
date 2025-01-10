import { cn } from '@/utilities/cn'
import freezeScroll from '@/utilities/freezeScroll'
import { motion } from 'motion/react'
import React, { useState } from 'react'

import type { Job, Skill } from '@/payload-types'

import RichText from '../RichText'
import { Tag } from '../ui/tag'
import { PreviewDetails } from '../PreviewDetails'

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
}> = (props) => {
  const { className, doc, showCategories, title: titleFromProps } = props
  const [isActive, setIsActive] = useState(false)
  if (!doc) return false

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

  function handleJobClick(active) {
    freezeScroll(active ?? null)
    setIsActive(active)
  }

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
          <>
            <div className="mt-4 md:mt-0">
              <button
                className="text-primary font-bold text-sm whitespace-nowrap underline-offset-4 hover:underline"
                onClick={() => handleJobClick(true)}
              >
                Learn more →
              </button>
            </div>
            <motion.section
              className={cn(
                'fixed left-0 right-0 top-0 bottom-0 p-10 z-30 overflow-auto ',
                !isActive && 'pointer-events-none',
              )}
              initial={{
                y: -30,
                x: -20,
                rotate: '1.2deg',
                opacity: 0,
              }}
              animate={{
                x: isActive ? 0 : -30,
                y: isActive ? 0 : -20,
                rotate: isActive ? 0 : '1.2deg',
                opacity: isActive ? 1 : 0,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
            >
              <PreviewDetails
                job={{ company, projects }}
                handleJobClick={handleJobClick}
                isActive={isActive}
              />
            </motion.section>

            <div
              className={cn(
                'bg-white/80 backdrop-blur-sm fixed left-0 right-0 top-0 bottom-0 w-[140vw] h-[140vh] z-20 transition-all duration-500 dark:bg-black/80',
                isActive
                  ? 'left-[-20vw] top-0 opacity-100'
                  : 'left-[20vw] top-[-20vh] opacity-0 pointer-events-none',
              )}
            />
          </>
        )}
      </div>
    </article>
  )
}
