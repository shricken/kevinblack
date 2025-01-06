'use client'

import React, { useState } from 'react'
import DarkIcon from '../../../assets/icons/moon-solid.svg'
import LightIcon from '../../../assets/icons/sun-solid.svg'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')

  const browserDarkTheme = window.matchMedia('(prefers-color-scheme: dark)')

  const onThemeChange = (themeToSet: Theme & 'light') => {
    console.log(themeToSet)
    setTheme(themeToSet)
    setValue(themeToSet)
  }

  const iconProps = {
    className: 'w-8 h-8 p-2 cursor-pointer dark:fill-white',
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'light')
  }, [])

  return <div>{value ? <DarkIcon {...iconProps} /> : <LightIcon {...iconProps} />}</div>
}

// <Select onValueChange={onThemeChange} value={value}>
//   <SelectTrigger
//     aria-label="Select a theme"
//     className="w-auto bg-transparent gap-2 pl-0 md:pl-3 border-none"
//   >
//     <SelectValue placeholder="Theme" />
//   </SelectTrigger>
//   <SelectContent>
//     <SelectItem value="auto">Auto</SelectItem>
//     <SelectItem value="light">Light</SelectItem>
//     <SelectItem value="dark">Dark</SelectItem>
//   </SelectContent>
// </Select>
