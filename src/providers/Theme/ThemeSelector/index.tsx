'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/cn'
import DarkIcon from '../../../assets/icons/moon-solid.svg'
import LightIcon from '../../../assets/icons/sun-solid.svg'
import AutoIcon from '../../../assets/icons/wand-magic-sparkles-solid.svg'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')
  const [isAuto, setIsAuto] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const browserDarkTheme = window.matchMedia('(prefers-color-scheme: dark)')

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const onThemeChange = (themeToSet: Theme | null) => {
    if (themeToSet === value || !themeToSet) {
      setTheme(null)
      setValue(browserDarkTheme.matches ? 'dark' : 'light')
      setIsAuto(true)
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
      setIsAuto(false)
    }
    setIsOpen(false)
  }

  const iconProps = {
    className: 'w-8 h-8 p-2 dark:fill-white',
  }

  const autoIconProps = {
    className: 'w-3 h-3 ml-2 dark:fill-white',
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    onThemeChange(preference === 'light' || preference === 'dark' ? preference : null)
  }, [])

  return (
    <div className="relative">
      <button className="cursor-pointer" onClick={handleToggle}>
        {value === 'dark' ? <DarkIcon {...iconProps} /> : <LightIcon {...iconProps} />}
      </button>
      <ul className={cn('list-none', 'absolute', 'right-0', isOpen ? 'block' : 'hidden')}>
        <li>
          <button
            className="flex items-center cursor-pointer"
            onClick={() => onThemeChange('light')}
          >
            <LightIcon {...iconProps} />
            Light
            {isAuto && value === 'light' && <AutoIcon {...autoIconProps} />}
          </button>
        </li>
        <li>
          <button className="flex items-center" onClick={() => onThemeChange('dark')}>
            <DarkIcon {...iconProps} /> Dark
            {isAuto && value === 'dark' && <AutoIcon {...autoIconProps} />}
          </button>
        </li>
      </ul>
      <div
        className={cn(
          'backdrop-blur-sm',
          'fixed',
          'w-[140vw]',
          'h-[140vh]',
          'z-[-1]',
          'transition-all duration-300',
          isOpen
            ? 'left-[-20vw] top-[20vh] opacity-1'
            : 'left-[20vw] top-[-20vh] opacity-0 pointer-events-none',
        )}
        onClick={handleToggle}
        style={{
          maskImage: 'linear-gradient(to left bottom, rgba(0,0,0,1), 90%, rgba(0,0,0,0))',
        }}
      />
    </div>
  )
}
