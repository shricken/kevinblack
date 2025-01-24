import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const IconCarousel: Block = {
  slug: 'iconCarousel',
  interfaceName: 'IconCarouselBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'selectedIcons',
      type: 'relationship',
      hasMany: true,
      label: 'Selection',
      relationTo: ['icons'],
    },
  ],
  labels: {
    plural: 'Icon Carousels',
    singular: 'Icon Carousel',
  },
}
