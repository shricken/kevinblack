'use client'

import { cn } from 'src/utilities/cn'
import React, { useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getClientSideURL } from '@/utilities/getURL'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName, preload = 'auto', autoplay = false } = props

  console.log(resource)

  const videoRef = useRef<HTMLVideoElement>(null)
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })

      if (autoplay) {
        video.play()
      } else {
        video.pause()
      }
    }
  }, [autoplay])

  if (resource && typeof resource === 'object') {
    const { url, placeholder } = resource
    const args: any = {
      className: cn(videoClassName),
      controls: false,
      loop: true,
      muted: true,
      onClick: onClick,
      playsInline: true,
      ref: videoRef,
      preload: preload,
    }

    if (autoplay) {
      args.autoPlay = true
    }

    if (placeholder && typeof placeholder !== 'string' && Object.hasOwn(placeholder, 'url')) {
      args.poster = `${getClientSideURL()}${placeholder.url}`
    }

    return (
      <video {...args}>
        <source src={`${getClientSideURL()}${url}`} />
      </video>
    )
  }

  return null
}
