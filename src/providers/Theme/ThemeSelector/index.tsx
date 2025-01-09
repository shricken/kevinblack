'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/cn'
import DarkIcon from '../../../assets/icons/moon-solid.svg'
import LightIcon from '../../../assets/icons/sun-solid.svg'
import AutoIcon from '../../../assets/icons/wand-magic-sparkles-solid.svg'
import CheckIcon from '../../../assets/icons/circle-check-solid.svg'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'
import freezeScroll from '@/utilities/freezeScroll'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')
  const [isAuto, setIsAuto] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const browserDarkTheme =
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null
  const browserTheme = browserDarkTheme && browserDarkTheme.matches ? 'dark' : 'light'

  const handleToggle = () => {
    freezeScroll(!isOpen)
    setIsOpen(!isOpen)
  }

  const onThemeChange = (themeToSet: Theme | null) => {
    if (themeToSet === value || !themeToSet) {
      setTheme(null)
      setValue(browserTheme)
      setIsAuto(!isAuto)
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
      setIsAuto(false)
    }
    setIsOpen(false)
    freezeScroll(false)
  }

  const iconProps = {
    className:
      'w-8 h-8 p-2 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] dark:fill-white dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]',
  }

  const autoIconProps = {
    className: 'w-3 h-3 ml-2 fill-primary',
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    onThemeChange(preference === 'light' || preference === 'dark' ? preference : null)
  }, [])

  return (
    <div className="relative">
      <button
        className="cursor-pointer"
        onClick={handleToggle}
        aria-label={`Currently using ${value} theme. Click here to change.`}
      >
        {value === 'dark' ? <DarkIcon {...iconProps} /> : <LightIcon {...iconProps} />}
      </button>
      <ul className={cn('list-none', 'absolute', 'right-0', isOpen ? 'block' : 'hidden')}>
        <li>
          <button
            className="flex items-center cursor-pointer"
            onClick={() => onThemeChange('light')}
            aria-label={`Click here to ${value === 'light' && !isAuto ? 'revert to default theme' : 'use light theme'}.`}
          >
            <LightIcon {...iconProps} />
            Light
            {value === 'light' &&
              (isAuto ? <AutoIcon {...autoIconProps} /> : <CheckIcon {...autoIconProps} />)}
          </button>
        </li>
        <li>
          <button
            className="flex items-center"
            onClick={() => onThemeChange('dark')}
            aria-label={`Click here to ${value === 'dark' && !isAuto ? 'revert to default theme' : 'use dark theme'}.`}
          >
            <DarkIcon {...iconProps} /> Dark
            {value === 'dark' &&
              (isAuto ? <AutoIcon {...autoIconProps} /> : <CheckIcon {...autoIconProps} />)}
          </button>
        </li>
      </ul>
      <div
        className={cn(
          'backdrop-blur-sm fixed w-[140vw] h-[140vh] z-[-1] transition-all duration-500',
          isOpen
            ? 'left-[-20vw] top-0 opacity-1'
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
