import React from 'react'

import type { Icon as IconType } from '@/payload-types'
import { motion, useAnimate } from 'motion/react'

import { Media } from '../Media'
import { cn } from '@/utilities/cn'
import styles from './icon.module.css'

import AdobeIllustrator from '../../assets/icons/component-options/adobe-illustrator.svg'
import AdobePhotoshop from '../../assets/icons/component-options/adobe-photoshop.svg'
import Algolia from '../../assets/icons/component-options/algolia.svg'
import Bitbucket from '../../assets/icons/component-options/bitbucket.svg'
import Browserstack from '../../assets/icons/component-options/browserstack.svg'
import Chatgpt from '../../assets/icons/component-options/chatgpt.svg'
import Confluence from '../../assets/icons/component-options/confluence.svg'
import Css3 from '../../assets/icons/component-options/css3.svg'
import Drupal from '../../assets/icons/component-options/drupal.svg'
import Figma from '../../assets/icons/component-options/figma.svg'
import Gatsby from '../../assets/icons/component-options/gatsby.svg'
import Git from '../../assets/icons/component-options/git.svg'
import Github from '../../assets/icons/component-options/github.svg'
import Html5 from '../../assets/icons/component-options/html5.svg'
import Javascript from '../../assets/icons/component-options/javascript.svg'
import Jetbrains from '../../assets/icons/component-options/jetbrains.svg'
import Jira from '../../assets/icons/component-options/jira.svg'
import Nextjs from '../../assets/icons/component-options/nextjs.svg'
import Payload from '../../assets/icons/component-options/payload.svg'
import IconReact from '../../assets/icons/component-options/react.svg'
import Salesforce from '../../assets/icons/component-options/salesforce.svg'
import Sass from '../../assets/icons/component-options/sass.svg'
import Tailwindcss from '../../assets/icons/component-options/tailwindcss.svg'
import Typescript from '../../assets/icons/component-options/typescript.svg'
import Vercel from '../../assets/icons/component-options/vercel.svg'
import Vscode from '../../assets/icons/component-options/vs-code.svg'
import Webpack from '../../assets/icons/component-options/webpack.svg'
import Wordpress from '../../assets/icons/component-options/wordpress.svg'

export type IconData = Pick<IconType, 'iconName' | 'media' | 'icon'>

const icons = {
  'adobe-illustrator': AdobeIllustrator,
  'adobe-photoshop': AdobePhotoshop,
  algolia: Algolia,
  bitbucket: Bitbucket,
  browserstack: Browserstack,
  chatgpt: Chatgpt,
  confluence: Confluence,
  css3: Css3,
  drupal: Drupal,
  figma: Figma,
  gatsby: Gatsby,
  git: Git,
  github: Github,
  html5: Html5,
  javascript: Javascript,
  jetbrains: Jetbrains,
  jira: Jira,
  nextjs: Nextjs,
  react: IconReact,
  salesforce: Salesforce,
  sass: Sass,
  tailwindcss: Tailwindcss,
  typescript: Typescript,
  vercel: Vercel,
  vscode: Vscode,
  webpack: Webpack,
  wordpress: Wordpress,
}

const blackIcons: string[] = ['chatgpt', 'github', 'nextjs', 'vercel', 'wordpress']

export const Icon: React.FC<{
  className?: string
  isActive?: boolean
  doc?: IconData
}> = (props) => {
  const { className, isActive, doc } = props

  if (!doc) return false

  const { iconName, media, icon } = doc || {}
  const IconComponent = icon ? icons[icon as keyof typeof icons] : null

  return (
    <div>
      {((media && typeof media !== 'string') || IconComponent) && (
        <motion.div
          animate={{ y: isActive ? -15 : 0 }}
          transition={{
            type: 'spring',
            bounce: 0.5,
            duration: 0.5,
            delay: isActive ? 0.05 : 0,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          {!!IconComponent ? (
            <div
              className={cn('w-16 h-16 mx-2 flex justify-center', styles['icon--svg'], {
                [styles.black]: blackIcons.includes(icon || ''),
              })}
            >
              <IconComponent style={{ maxHeight: '100%' }} />
            </div>
          ) : (
            <>
              {media ? (
                <Media
                  imgClassName={cn(
                    'w-16 h-16 mx-2',
                    typeof media === 'object' ? media.classes : '',
                  )}
                  resource={media}
                  htmlElement={null}
                  alt={iconName}
                  loading="eager"
                />
              ) : (
                <div className="w-16 h-16 mx-2">
                  <Payload />
                </div>
              )}
            </>
          )}
        </motion.div>
      )}
    </div>
  )
}
