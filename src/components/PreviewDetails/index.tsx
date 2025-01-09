'use client'

import { cn } from '@/utilities/cn'
import React, { useState } from 'react'

import { ProjectCard } from '../Project'
import { Job } from '@/payload-types'
import { cubicBezier, motion } from 'motion/react'

export type PreviewDescriptionData = Pick<Job, 'company' | 'projects' | 'slug'>

export const PreviewDetails: React.FC<{ job: PreviewDescriptionData; handleJobClick }> = ({
  job,
  handleJobClick,
}) => {
  const { company, projects } = job

  return (
    <div className="container p-0 lg:max-w-[1100px]">
      <div className="md:flex justify-between flex-row-reverse">
        <button
          className="underline-offset-4 mb-4 md:mb-0 hover:underline hover:text-primary"
          onClick={() => handleJobClick(null)}
        >
          close ×
        </button>
        <h2 className="font-serif text-6xl mb-6">{company} projects</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6 md:gap-12">
        {projects?.map((project, index) => {
          if (typeof project === 'object')
            return <ProjectCard key={`project-${index}`} doc={project} />
        })}
      </div>
    </div>
  )
}
