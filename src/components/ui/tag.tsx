import React from 'react'

export const Tag = ({ title }) => {
  return (
    <span className="bg-primary text-primary-foreground text-xs uppercase font-bold py-1 px-4 rounded-full">
      {title}
    </span>
  )
}
